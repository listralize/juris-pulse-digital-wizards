
import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detectar dispositivo móvel e capacidades
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Ajustar qualidade baseado no dispositivo
    let devicePixelRatio = window.devicePixelRatio || 1;
    if (isMobile) {
      // Limitar DPR em dispositivos móveis para melhor performance
      devicePixelRatio = Math.min(devicePixelRatio, 1.5);
    } else {
      devicePixelRatio = Math.min(devicePixelRatio, 2);
    }

    const pointer = {
      x: 0,
      y: 0,
      tX: 0,
      tY: 0,
    };

    let uniforms: any;
    let gl: WebGLRenderingContext | null = null;

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

      // Shader otimizado para mobile com menos iterações
      const fsSource = `
        precision ${isMobile ? 'lowp' : 'mediump'} float;
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
          
          // Menos iterações em mobile para melhor performance
          int iterations = ${isMobile ? '8' : '12'};

          for (int j = 0; j < ${isMobile ? '8' : '12'}; j++) {
            if (j >= iterations) break;
            
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

          float t = .001 * u_time * ${isMobile ? '0.7' : '1.0'}; // Velocidade reduzida no mobile
          vec3 color = vec3(0.);

          float noise = neuro_shape(uv, t, p);

          noise = 1.2 * pow(noise, 3.);
          noise += pow(noise, 10.);
          noise = max(.0, noise - .5);
          noise *= (1. - length(vUv - .5));

          // Cores otimizadas
          color = vec3(0.6, 0.6, 0.6);
          color += vec3(0.4, 0.4, 0.4) * sin(3.0 * u_scroll_progress + 1.5);

          color = color * noise;

          gl_FragColor = vec4(color, noise * ${isMobile ? '0.5' : '0.4'});
        }
      `;

      const context = canvas.getContext("webgl", {
        alpha: true,
        antialias: false, // Desabilitar antialiasing em mobile para performance
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: isMobile ? "default" : "high-performance"
      }) || canvas.getContext("experimental-webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: isMobile ? "default" : "high-performance"
      });
      
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

    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60; // FPS reduzido em mobile
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number = 0) => {
      if (!gl || !uniforms) return;

      // Throttle de FPS para dispositivos móveis
      if (currentTime - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime;

      pointer.x += (pointer.tX - pointer.x) * (isMobile ? 0.1 : 0.2);
      pointer.y += (pointer.tY - pointer.y) * (isMobile ? 0.1 : 0.2);

      gl.uniform1f(uniforms.u_time, currentTime);
      gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
      gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      if (!canvas || !gl || !uniforms) return;
      
      // Reduzir resolução em dispositivos móveis
      const scale = isMobile ? 0.75 : 1;
      canvas.width = window.innerWidth * devicePixelRatio * scale;
      canvas.height = window.innerHeight * devicePixelRatio * scale;
      
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const updateMousePosition = (eX: number, eY: number) => {
      pointer.tX = eX;
      pointer.tY = eY;
    };

    const setupEvents = () => {
      // Otimizar eventos para mobile
      const eventOptions = isMobile ? { passive: true } : false;
      
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

      window.addEventListener("pointermove", handlePointerMove, eventOptions);
      window.addEventListener("touchmove", handleTouchMove, eventOptions);
      window.addEventListener("click", handleClick, eventOptions);

      return { handlePointerMove, handleTouchMove, handleClick };
    };

    // Initialize everything
    let eventHandlers: ReturnType<typeof setupEvents> | null = null;
    if (initShader()) {
      eventHandlers = setupEvents();
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
      if (eventHandlers) {
        window.removeEventListener("pointermove", eventHandlers.handlePointerMove);
        window.removeEventListener("touchmove", eventHandlers.handleTouchMove);
        window.removeEventListener("click", eventHandlers.handleClick);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ 
        opacity: 0.6,
        width: '100vw',
        height: '100vh',
        maxWidth: 'none'
      }}
    />
  );
};

export default NeuralBackground;
