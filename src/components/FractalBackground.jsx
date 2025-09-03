// src/components/FractalBackground.jsx
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ShaderPlane({ mouse }) {
  const mesh = useRef()
  const uniforms = useRef({
    u_time:       { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse:      { value: new THREE.Vector2(mouse.x, mouse.y) },
  }).current

  useFrame(({ clock }) => {
    uniforms.u_time.value = clock.getElapsedTime()
    uniforms.u_mouse.value.set(mouse.x, mouse.y)
  })

  useEffect(() => {
    const onResize = () => {
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [uniforms])

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          uniform float u_time;
          uniform vec2  u_resolution;
          uniform vec2  u_mouse;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) +
                   (c - a) * u.y * (1.0 - u.x) +
                   (d - b) * u.x * u.y;
          }
          float fbm(vec2 p) {
            float v = 0.0;
            float amp = 0.5;
            for (int i = 0; i < 5; i++) {
              v += amp * noise(p);
              p *= 2.0;
              amp *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution;
            float t = u_time * 0.1;
            float n = fbm(uv * 3.0 + vec2(t));
            float detail = fbm((uv + n * 0.5) * 5.0 - t);
            vec3 col = vec3(detail);
            vec2 m = u_mouse;
            float d = distance(uv, m);
            float glow = smoothstep(0.3, 0.0, d);
            col += glow * 0.5;
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  )
}

export default function FractalBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const trailCanvas = useRef(null)
  const trailCtx    = useRef(null)

  // draw red/white dots on 2D canvas
  const onMouseMove = (e) => {
    console.log('mouse moved', e.clientX, e.clientY)
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = 1 - (e.clientY - top) / height
    setMouse({ x, y })
    if (trailCtx.current) {
      const ctx = trailCtx.current
      const px = x * ctx.canvas.width
      const py = (1 - y) * ctx.canvas.height
      const r  = 8 + Math.random() * 4
      ctx.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.8)' : 'rgba(255,0,0,0.8)'
      ctx.beginPath()
      ctx.arc(px, py, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // setup trail canvas & fade loop
  useEffect(() => {
    const canvas = trailCanvas.current
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    trailCtx.current = ctx

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    let anim
    const fade = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      anim = requestAnimationFrame(fade)
    }
    fade()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(anim)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={onMouseMove}
    >
      {/* ThreeJS fractal (disable its pointer events) */}
      <Canvas
        onCreated={({ gl }) => { gl.domElement.style.pointerEvents = 'none' }}
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ShaderPlane mouse={mouse} />
      </Canvas>

      {/* 2D trails overlay */}
      <canvas
        ref={trailCanvas}
        className="absolute inset-0 z-10 pointer-events-none"
      />
    </div>
  )
}
