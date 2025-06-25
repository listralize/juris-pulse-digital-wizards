
import React, { useEffect, useRef } from 'react';

interface NeuralBackgroundProps {
  inverted?: boolean;
}

const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ inverted = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('🎨 Inicializando Neural Background...');
    
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

    const pointer = {
      x: 0,
      y: 0,
      tX: 0,
      tY: 0,
    };

    let uniforms: any;
    let gl: WebGLRenderingContext | null = null;
    let animationId: number;

    const initShader = () => {
      const vsSource = `
        precision mediump float;
        varying vec2 vUv;
        attribute vec2 a_position;
        void main() {
          vUv = .5 * (a_position + 1.);
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform float u_scroll_progress;
        uniform float u_inverted;

        vec2 rotate(vec2 uv, float th) {
          return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
        }

        float neuro_shape(vec2 uv, float t, float p) {
          vec2 sine_acc = vec2(0.);
          vec2 res = vec2(0.);
          float scale = 8.;

          for (int j = 0; j < 15; j++) {
            uv = rotate(uv, 1.);
            sine_acc = rotate(sine_acc, 1.);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer) + 2.4 * p;
            res += (.5 + .5 * cos(layer)) / scale;
            scale *= (1.2);
          }
          return res.x + res.y;
        }

        void main() {
          vec2 uv = .5 * vUv;
          uv.x *= u_ratio;

          vec2 pointer = vUv - u_pointer_position;
          pointer.x *= u_ratio;
          float p = clamp(length(pointer), 0., 1.);
          p = .5 * pow(1. - p, 2.);

          float t = .001 * u_time;
          vec3 color = vec3(0.);

          float noise = neuro_shape(uv, t, p);

          noise = 1.2 * pow(noise, 3.);
          noise += pow(noise, 10.);
          noise = max(.0, noise - .5);
          noise *= (1. - length(vUv - .5));

          if (u_inverted > 0.5) {
            color = vec3(0.0, 0.0, 0.0);
            color += vec3(0.05, 0.05, 0.05) * sin(3.0 * u_scroll_progress + 1.5);
          } else {
            color = vec3(1.0, 1.0, 1.0);
            color += vec3(0.1, 0.1, 0.1) * sin(3.0 * u_scroll_progress + 1.5);
          }

          color = color * noise;

          gl_FragColor = vec4(color, noise * 0.95);
        }
      `;

      try {
        const context = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false }) || 
                       canvas.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: false });
        
        if (!context) {
          console.warn("WebGL não é suportado pelo seu navegador.");
          return null;
        }

        if (!(context instanceof WebGLRenderingContext)) {
          console.warn("Contexto WebGL não está disponível.");
          return null;
        }

        gl = context;
        console.log('✅ WebGL context criado com sucesso');

        // Enable blending for transparency
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const createShader = (gl: WebGLRenderingContext, sourceCode: string, type: number) => {
          const shader = gl.createShader(type);
          if (!shader) return null;
          
          gl.shaderSource(shader, sourceCode);
          gl.compileShader(shader);

          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Erro ao compilar shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
          }

          return shader;
        };

        const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
        const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) return null;

        const createShaderProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
          const program = gl.createProgram();
          if (!program) return null;
          
          gl.attachShader(program, vertexShader);
          gl.attachShader(program, fragmentShader);
          gl.linkProgram(program);

          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Erro ao inicializar o programa shader: " + gl.getProgramInfoLog(program));
            return null;
          }

          return program;
        };

        const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
        if (!shaderProgram) return null;

        const getUniforms = (program: WebGLProgram) => {
          const uniforms: any = {};
          const uniformCount = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
          for (let i = 0; i < uniformCount; i++) {
            const uniformInfo = gl!.getActiveUniform(program, i);
            if (uniformInfo) {
              uniforms[uniformInfo.name] = gl!.getUniformLocation(program, uniformInfo.name);
            }
          }
          return uniforms;
        };

        uniforms = getUniforms(shaderProgram);

        const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.useProgram(shaderProgram);

        const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
        gl.enableVertexAttribArray(positionLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        console.log('✅ Shaders compilados e programa criado com sucesso');
        return gl;
        
      } catch (error) {
        console.error('❌ Erro ao inicializar WebGL:', error);
        return null;
      }
    };

    const render = () => {
      if (!gl || !uniforms) return;

      const currentTime = performance.now();

      pointer.x += (pointer.tX - pointer.x) * .2;
      pointer.y += (pointer.tY - pointer.y) * .2;

      // Clear with transparent background
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uniforms.u_time, currentTime);
      gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
      gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));
      gl.uniform1f(uniforms.u_inverted, inverted ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      if (!canvas || !gl || !uniforms) return;
      
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const updateMousePosition = (eX: number, eY: number) => {
      pointer.tX = eX;
      pointer.tY = eY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);  
    };

    // Initialize everything
    const initResult = initShader();
    if (initResult) {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("click", handleClick);
      render();
      console.log('✅ Neural Background inicializado com sucesso');
    } else {
      console.error('❌ Falha ao inicializar Neural Background');
    }

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      
      if (gl) {
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
    };
  }, [inverted]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0,
        opacity: 0.95,
        background: 'transparent'
      }}
    />
  );
};

export default NeuralBackground;
