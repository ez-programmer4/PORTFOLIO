'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// Advanced hologram shader with interference patterns
function HologramShader() {
  return {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#00ffff') },
      opacity: { value: 0.8 },
      interference: { value: 1.0 },
      distortion: { value: 0.1 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float time;
      uniform float distortion;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Advanced holographic distortion
        pos.y += sin(pos.x * 15.0 + time * 3.0) * distortion;
        pos.x += cos(pos.y * 12.0 + time * 2.5) * distortion * 0.7;
        pos.z += sin(pos.x * 8.0 + pos.y * 6.0 + time * 4.0) * distortion * 0.3;
        
        // Interference wave
        float interference = sin(length(pos.xy) * 20.0 - time * 8.0) * 0.02;
        pos += normal * interference;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float opacity;
      uniform float interference;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      // Advanced noise function
      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      // Fractal noise
      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Multiple scan line layers
        float scanlines1 = sin(uv.y * 150.0 + time * 6.0) * 0.5 + 0.5;
        float scanlines2 = sin(uv.y * 80.0 - time * 4.0) * 0.3 + 0.7;
        float scanlines = scanlines1 * scanlines2;
        
        // Advanced glitch with multiple frequencies
        float glitch1 = step(0.97, sin(time * 12.0 + uv.y * 60.0));
        float glitch2 = step(0.99, sin(time * 8.0 + uv.x * 40.0));
        float glitch = max(glitch1, glitch2);
        
        // Chromatic aberration during glitch
        vec2 offset = vec2(glitch * 0.02 * sin(time * 25.0), 0.0);
        
        // Interference patterns
        float interference1 = sin(length(uv - 0.5) * 30.0 - time * 10.0) * 0.5 + 0.5;
        float interference2 = cos(uv.x * 25.0 + uv.y * 20.0 + time * 7.0) * 0.3 + 0.7;
        
        // Edge detection and glow
        vec2 center = uv - 0.5;
        float dist = length(center);
        float edge = 1.0 - smoothstep(0.0, 0.15, min(abs(uv.x - 0.5), abs(uv.y - 0.5)));
        float rimGlow = pow(1.0 - dist * 2.0, 3.0);
        
        // Fractal noise overlay
        float noisePattern = fbm(uv * 8.0 + time * 0.5) * 0.15;
        
        // Data stream effect
        float dataStream = step(0.95, sin(uv.x * 200.0 + time * 15.0)) * 
                          step(0.9, sin(uv.y * 50.0 - time * 8.0));
        
        // Holographic color shifting
        vec3 baseColor = color;
        baseColor.r += sin(time * 3.0 + uv.x * 10.0) * 0.1;
        baseColor.g += cos(time * 2.5 + uv.y * 8.0) * 0.1;
        baseColor.b += sin(time * 4.0 + dist * 15.0) * 0.1;
        
        vec3 finalColor = baseColor;
        finalColor *= scanlines * 0.7 + 0.3;
        finalColor *= interference1 * interference2;
        finalColor += edge * 0.6;
        finalColor += rimGlow * 0.4;
        finalColor += noisePattern;
        finalColor += dataStream * vec3(0.0, 1.0, 0.8) * 0.5;
        
        // Dynamic alpha with breathing effect
        float breathing = sin(time * 1.5) * 0.1 + 0.9;
        float alpha = opacity * breathing * (scanlines * 0.8 + 0.2) * (1.0 - glitch * 0.3);
        alpha *= (1.0 - dist * 0.3); // Fade towards edges
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }
}

// Energy field shader for particle effects
function EnergyFieldShader() {
  return {
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#00ffff') },
      color2: { value: new THREE.Color('#ff00ff') },
      intensity: { value: 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        pos += sin(pos * 5.0 + time * 2.0) * 0.1;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float intensity;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 uv = vUv;
        
        // Energy field pattern
        float pattern = sin(uv.x * 20.0 + time * 3.0) * cos(uv.y * 15.0 - time * 2.0);
        pattern += sin(length(uv - 0.5) * 30.0 - time * 5.0) * 0.5;
        
        // Color mixing
        vec3 color = mix(color1, color2, sin(pattern + time) * 0.5 + 0.5);
        
        float alpha = (pattern * 0.5 + 0.5) * intensity * 0.3;
        
        gl_FragColor = vec4(color, alpha);
      }
    `
  }
}

// Typewriter effect for text
function TypewriterText({ text, position, delay = 0, color = "#00ff88" }: {
  text: string
  position: [number, number, number]
  delay?: number
  color?: string
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, 100 + delay)
    
    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])
  
  return (
    <Text
      position={position}
      fontSize={0.25}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {displayText}
      {currentIndex < text.length && <meshBasicMaterial color={color} transparent opacity={Math.sin(Date.now() * 0.01) * 0.5 + 0.5} />}
    </Text>
  )
}

// Enhanced floating code with glitch effects
function FloatingCodeSnippets() {
  const codeRef = useRef<THREE.Group>(null)
  
  const codeSnippets = [
    "const developer = 'Ezedin';",
    "function buildAmazing() {",
    "  return innovation;",
    "}",
    "class FullStackDev {",
    "  constructor() {",
    "    this.skills = ['React', 'Node.js'];",
    "  }",
    "}",
    "// Clean Architecture",
    "export default magic;",
    "async function deploy() {",
    "  await cloud.scale();",
    "}",
    "const AI = new Intelligence();"
  ]
  
  useFrame((state) => {
    if (codeRef.current) {
      const time = state.clock.elapsedTime
      codeRef.current.rotation.y = time * 0.08
      
      codeRef.current.children.forEach((child, index) => {
        // Enhanced floating motion
        child.position.y = Math.sin(time * 0.8 + index * 0.7) * 0.6
        child.rotation.z = Math.sin(time * 0.4 + index * 0.3) * 0.15
        
        // Glitch effect
        if (Math.random() < 0.002) {
          child.position.x += (Math.random() - 0.5) * 0.1
        }
      })
    }
  })
  
  return (
    <group ref={codeRef}>
      {codeSnippets.map((snippet, index) => {
        const angle = (index / codeSnippets.length) * Math.PI * 2
        const radius = 9 + Math.sin(index * 0.5) * 1.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (index - codeSnippets.length / 2) * 0.7
        
        return (
          <TypewriterText
            key={index}
            text={snippet}
            position={[x, y, z]}
            delay={index * 200}
            color={index % 3 === 0 ? "#00ff88" : index % 3 === 1 ? "#00ffff" : "#ff00ff"}
          />
        )
      })}
    </group>
  )
}

// Holographic particle field
function HolographicParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleData = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Holographic colors
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1 // Cyan
      } else if (colorChoice < 0.7) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1 // Magenta
      } else {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0.5 // Green
      }
      
      sizes[i] = Math.random() * 0.03 + 0.01
    }
    
    return { positions, colors, sizes, count }
  }, [])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleData.count; i++) {
        const i3 = i * 3
        
        // Orbital motion
        const radius = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2)
        const speed = 0.001 + (1 / radius) * 0.01
        
        // Rotate around Y axis
        const x = positions[i3]
        const z = positions[i3 + 2]
        positions[i3] = x * Math.cos(speed) - z * Math.sin(speed)
        positions[i3 + 2] = x * Math.sin(speed) + z * Math.cos(speed)
        
        // Vertical oscillation
        positions[i3 + 1] += Math.sin(time * 2 + i * 0.01) * 0.002
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.count}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleData.count}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HolographicPlane({ text, position, rotation = [0, 0, 0] }: {
  text: string
  position: [number, number, number]
  rotation?: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const shader = useMemo(() => HologramShader(), [])
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })
  
  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={[4, 2]} />
        <shaderMaterial
          ref={materialRef}
          {...shader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.4}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        {text}
      </Text>
    </group>
  )
}

function MatrixRain() {
  const matrixRef = useRef<THREE.Points>(null)
  
  const matrixData = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * 30 + 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      const intensity = Math.random()
      colors[i * 3] = 0
      colors[i * 3 + 1] = intensity
      colors[i * 3 + 2] = intensity * 0.5
      
      speeds[i] = Math.random() * 0.1 + 0.05
    }
    
    return { positions, colors, speeds, count }
  }, [])
  
  useFrame(() => {
    if (matrixRef.current) {
      const positions = matrixRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < matrixData.count; i++) {
        const i3 = i * 3
        positions[i3 + 1] -= matrixData.speeds[i]
        
        if (positions[i3 + 1] < -20) {
          positions[i3 + 1] = 30
          positions[i3] = (Math.random() - 0.5) * 50
          positions[i3 + 2] = (Math.random() - 0.5) * 20
        }
      }
      
      matrixRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={matrixRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={matrixData.count}
          array={matrixData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={matrixData.count}
          array={matrixData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HolographicText({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
        
        <group>
          <HolographicParticles />
          <MatrixRain />
          
          <HolographicPlane 
            text="FULL STACK DEVELOPER"
            position={[0, 2, 0]}
            rotation={[0, 0, 0]}
          />
          
          <HolographicPlane 
            text="REACT • NODE.JS • PYTHON"
            position={[0, 0, 0]}
            rotation={[0, Math.PI / 6, 0]}
          />
          
          <HolographicPlane 
            text="BUILDING THE FUTURE"
            position={[0, -2, 0]}
            rotation={[0, -Math.PI / 4, 0]}
          />
        </group>
      </Canvas>
    </div>
  )
}
