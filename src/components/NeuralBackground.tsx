
import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detectar se é mobile para aplicar otimizações
    const isMobile = window.innerWidth < 768;
    const devicePixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);

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

      // Shader simplificado para mobile
      const fsSource = isMobile ? `
        precision lowp float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform float u_scroll_progress;

        vec2 rotate(vec2 uv, float th) {
          return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
        }

        float neuro_shape(vec2 uv, float t, float p) {
          vec2 sine_acc = vec2(0.);
          vec2 res = vec2(0.);
          float scale = 6.;

          // Reduzir iterações no mobile
          for (int j = 0; j < 8; j++) {
            uv = rotate(uv, 1.);
            sine_acc = rotate(sine_acc, 1.);
            vec2 layer = uv * scale + float(j) + sine_acc - t;
            sine_acc += sin(layer) + 2.0 * p;
            res += (.5 + .5 * cos(layer)) / scale;
            scale *= (1.1);
          }
          return res.x + res.y;
        }

        void main() {
          vec2 uv = .5 * vUv;
          uv.x *= u_ratio;

          vec2 pointer = vUv - u_pointer_position;
          pointer.x *= u_ratio;
          float p = clamp(length(pointer), 0., 1.);
          p = .3 * pow(1. - p, 2.);

          float t = .0005 * u_time;
          vec3 color = vec3(0.);

          float noise = neuro_shape(uv, t, p);

          noise = 1.0 * pow(noise, 2.);
          noise += pow(noise, 8.);
          noise = max(.0, noise - .4);
          noise *= (1. - length(vUv - .5));

          color = vec3(0.7, 0.7, 0.7);
          color += vec3(0.1, 0.1, 0.1) * sin(2.0 * u_scroll_progress + 1.0);

          color = color * noise;

          gl_FragColor = vec4(color, noise * 0.2);
        }
      ` : `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_ratio;
        uniform vec2 u_pointer_position;
        uniform float u_scroll_progress;

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

          color = vec3(0.8, 0.8, 0.8);
          color += vec3(0.2, 0.2, 0.2) * sin(3.0 * u_scroll_progress + 1.5);

          color = color * noise;

          gl_FragColor = vec4(color, noise * 0.3);
        }
      `;

      const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      
      if (!context) {
        console.warn("WebGL is not supported by your browser.");
        return null;
      }
      
      gl = context as WebGLRenderingContext;

      const createShader = (gl: WebGLRenderingContext, sourceCode: string, type: number) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
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
          console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
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

      return gl;
    };

    // Throttle para mobile
    let lastRenderTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      if (!gl || !uniforms) return;

      // Throttle no mobile
      if (isMobile && currentTime - lastRenderTime < frameInterval) {
        animationId = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = currentTime;

      // Suavizar movimento do pointer no mobile
      const smoothFactor = isMobile ? 0.1 : 0.2;
      pointer.x += (pointer.tX - pointer.x) * smoothFactor;
      pointer.y += (pointer.tY - pointer.y) * smoothFactor;

      gl.uniform1f(uniforms.u_time, currentTime);
      gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
      gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      if (!canvas || !gl || !uniforms) return;
      
      // Reduzir resolução no mobile
      const scaleFactor = isMobile ? 0.75 : 1;
      canvas.width = window.innerWidth * devicePixelRatio * scaleFactor;
      canvas.height = window.innerHeight * devicePixelRatio * scaleFactor;
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const updateMousePosition = (eX: number, eY: number) => {
      pointer.tX = eX;
      pointer.tY = eY;
    };

    const setupEvents = () => {
      // Throttle eventos no mobile
      let eventThrottle: number;
      const handlePointerMove = (e: PointerEvent) => {
        if (isMobile) {
          clearTimeout(eventThrottle);
          eventThrottle = setTimeout(() => {
            updateMousePosition(e.clientX, e.clientY);
          }, 16); // ~60fps
        } else {
          updateMousePosition(e.clientX, e.clientY);
        }
      };

      window.addEventListener("pointermove", handlePointerMove);
      
      if (isMobile) {
        window.addEventListener("touchmove", (e) => {
          clearTimeout(eventThrottle);
          eventThrottle = setTimeout(() => {
            updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
          }, 16);
        });
      }
      
      window.addEventListener("click", (e) => {
        updateMousePosition(e.clientX, e.clientY);
      });
    };

    // Initialize everything
    if (initShader()) {
      setupEvents();
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      animationId = requestAnimationFrame(render);
    }

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", () => {});
      window.removeEventListener("touchmove", () => {});
      window.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ 
        opacity: window.innerWidth < 768 ? 0.2 : 0.4, // Reduzir opacidade no mobile
        width: '100vw',
        height: '100vh',
        maxWidth: 'none',
        willChange: 'auto' // Remover will-change no mobile para melhor performance
      }}
    />
  );
};

export default NeuralBackground;
