
import React, { useEffect, useRef } from 'react';

interface NeuralBackgroundProps {
  inverted?: boolean;
}

const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ inverted = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('🎨 Inicializando Neural Background - inverted:', inverted);
    
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = {
      x: 0,
      y: 0,
      tX: 0,
      tY: 0,
    };

    let uniforms: any;
    let gl: WebGLRenderingContext | null = null;
    let animationId: number;
    let program: WebGLProgram | null = null;

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
            // Tema escuro - fundo preto com efeitos brancos sutis
            color = vec3(1.0, 1.0, 1.0);
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - noise * 0.25);
          } else {
            // Tema claro - fundo branco com efeitos escuros sutis
            color = vec3(0.0, 0.0, 0.0);
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 - noise * 0.4);
          }
        }
      `;

      try {
        gl = canvas.getContext("webgl", { 
          alpha: true, 
          premultipliedAlpha: false,
          antialias: true,
          preserveDrawingBuffer: false
        }) || canvas.getContext("experimental-webgl") as WebGLRenderingContext;
        
        if (!gl) {
          console.warn("WebGL não suportado");
          return false;
        }

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const createShader = (sourceCode: string, type: number) => {
          const shader = gl!.createShader(type);
          if (!shader) return null;
          
          gl!.shaderSource(shader, sourceCode);
          gl!.compileShader(shader);

          if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
            console.error("Erro shader:", gl!.getShaderInfoLog(shader));
            gl!.deleteShader(shader);
            return null;
          }
          return shader;
        };

        const vertexShader = createShader(vsSource, gl.VERTEX_SHADER);
        const fragmentShader = createShader(fsSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) return false;

        program = gl.createProgram();
        if (!program) return false;
        
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error("Erro programa:", gl.getProgramInfoLog(program));
          return false;
        }

        gl.useProgram(program);

        uniforms = {
          u_time: gl.getUniformLocation(program, "u_time"),
          u_ratio: gl.getUniformLocation(program, "u_ratio"),
          u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
          u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
          u_inverted: gl.getUniformLocation(program, "u_inverted")
        };

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        console.log('✅ Neural Background shader configurado');
        return true;
        
      } catch (error) {
        console.error('❌ Erro WebGL:', error);
        return false;
      }
    };

    const render = () => {
      if (!gl || !uniforms || !program) return;

      const currentTime = performance.now();

      pointer.x += (pointer.tX - pointer.x) * 0.2;
      pointer.y += (pointer.tY - pointer.y) * 0.2;

      // Sempre limpar com transparente e deixar o CSS controlar o fundo
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uniforms.u_time, currentTime);
      gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
      gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));
      gl.uniform1f(uniforms.u_inverted, inverted ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      if (!canvas || !gl || !uniforms) return;
      
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      
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

    // Initialize
    const initResult = initShader();
    if (initResult) {
      setTimeout(() => {
        resizeCanvas();
        render();
      }, 100);
      
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("click", handleClick);
      
      console.log('✅ Neural Background inicializado');
    } else {
      console.error('❌ Falha ao inicializar Neural Background');
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      
      if (gl && program) {
        gl.deleteProgram(program);
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
        zIndex: -10,
        opacity: 1,
        backgroundColor: inverted ? '#000000' : '#ffffff'
      }}
    />
  );
};

export default NeuralBackground;
