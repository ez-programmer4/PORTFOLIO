'use client'

import { useRef, useMemo, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
// import { EffectComposer, Bloom, ChromaticAberration, Glitch } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Quantum Field Effect
function QuantumField() {
  const fieldRef = useRef<THREE.Points>(null)
  
  const quantumData = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      
      const hue = Math.random() * 0.3 + 0.5
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      phases[i] = Math.random() * Math.PI * 2
    }
    
    return { positions, colors, phases, count }
  }, [])
  
  useFrame((state) => {
    if (fieldRef.current) {
      const time = state.clock.elapsedTime
      const positions = fieldRef.current.geometry.attributes.position.array as Float32Array
      const colors = fieldRef.current.geometry.attributes.color.array as Float32Array
      
      for (let i = 0; i < quantumData.count; i++) {
        const i3 = i * 3
        const phase = quantumData.phases[i]
        
        // Quantum fluctuation
        const fluctuation = Math.sin(time * 3 + phase) * 0.5
        positions[i3 + 1] += fluctuation * 0.02
        
        // Color pulsing
        const pulse = Math.sin(time * 2 + phase) * 0.5 + 0.5
        const baseColor = new THREE.Color().setHSL(0.6, 0.8, 0.4 + pulse * 0.4)
        colors[i3] = baseColor.r
        colors[i3 + 1] = baseColor.g
        colors[i3 + 2] = baseColor.b
        
        // Quantum entanglement effect
        if (i > 0 && Math.random() < 0.001) {
          const entangled = Math.floor(Math.random() * quantumData.count)
          positions[i3] = positions[entangled * 3] + (Math.random() - 0.5) * 2
          positions[i3 + 1] = positions[entangled * 3 + 1] + (Math.random() - 0.5) * 2
        }
      }
      
      fieldRef.current.geometry.attributes.position.needsUpdate = true
      fieldRef.current.geometry.attributes.color.needsUpdate = true
    }
  })
  
  return (
    <points ref={fieldRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={quantumData.count}
          array={quantumData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={quantumData.count}
          array={quantumData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Energy Vortex
function EnergyVortex({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const vortexRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (vortexRef.current) {
      const time = state.clock.elapsedTime
      vortexRef.current.rotation.y = time * 0.5 + mousePosition.x * 0.3
      vortexRef.current.rotation.x = Math.sin(time * 0.3) * 0.2 + mousePosition.y * 0.2
      
      vortexRef.current.children.forEach((child, index) => {
        child.rotation.z = time * (1 + index * 0.1)
        child.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1)
      })
    }
  })
  
  return (
    <group ref={vortexRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 0.5]}>
          <torusGeometry args={[3 - i * 0.3, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={`hsl(${240 + i * 15}, 80%, ${60 - i * 5}%)`}
            emissive={`hsl(${240 + i * 15}, 80%, 30%)`}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  )
}

// Fractal Geometry
function FractalGeometry() {
  const fractalRef = useRef<THREE.Group>(null)
  
  const fractalData = useMemo(() => {
    const geometries: { position: [number, number, number], scale: number, rotation: [number, number, number] }[] = []
    
    function generateFractal(depth: number, position: [number, number, number], scale: number) {
      if (depth <= 0) return
      
      geometries.push({
        position,
        scale,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
      })
      
      if (depth > 1) {
        const newScale = scale * 0.6
        const offset = scale * 1.5
        
        generateFractal(depth - 1, [position[0] + offset, position[1], position[2]], newScale)
        generateFractal(depth - 1, [position[0] - offset, position[1], position[2]], newScale)
        generateFractal(depth - 1, [position[0], position[1] + offset, position[2]], newScale)
        generateFractal(depth - 1, [position[0], position[1] - offset, position[2]], newScale)
      }
    }
    
    generateFractal(4, [0, 0, -10], 1)
    return geometries
  }, [])
  
  useFrame((state) => {
    if (fractalRef.current) {
      const time = state.clock.elapsedTime
      fractalRef.current.rotation.y = time * 0.1
      fractalRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
      
      fractalRef.current.children.forEach((child, index) => {
        child.rotation.x = time * (0.5 + index * 0.01)
        child.rotation.y = time * (0.3 + index * 0.01)
        child.rotation.z = time * (0.7 + index * 0.01)
      })
    }
  })
  
  return (
    <group ref={fractalRef}>
      {fractalData.map((data, index) => (
        <mesh key={index} position={data.position} scale={data.scale} rotation={data.rotation}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={`hsl(${200 + index * 5}, 70%, 60%)`}
            emissive={`hsl(${200 + index * 5}, 70%, 30%)`}
            emissiveIntensity={0.3}
            wireframe={index % 2 === 0}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// DNA Helix
function DNAHelix() {
  const helixRef = useRef<THREE.Group>(null)
  
  const helixData = useMemo(() => {
    const points: { position: [number, number, number], pair: [number, number, number] }[] = []
    const segments = 100
    const radius = 2
    const height = 20
    
    for (let i = 0; i < segments; i++) {
      const t = i / segments
      const angle1 = t * Math.PI * 8
      const angle2 = angle1 + Math.PI
      const y = (t - 0.5) * height
      
      const x1 = Math.cos(angle1) * radius
      const z1 = Math.sin(angle1) * radius
      const x2 = Math.cos(angle2) * radius
      const z2 = Math.sin(angle2) * radius
      
      points.push({
        position: [x1, y, z1],
        pair: [x2, y, z2]
      })
    }
    
    return points
  }, [])
  
  useFrame((state) => {
    if (helixRef.current) {
      const time = state.clock.elapsedTime
      helixRef.current.rotation.y = time * 0.2
      helixRef.current.position.x = Math.sin(time * 0.5) * 2
    }
  })
  
  return (
    <group ref={helixRef} position={[8, 0, -5]}>
      {helixData.map((point, index) => (
        <group key={index}>
          {/* DNA base pairs */}
          <mesh position={point.position}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh position={point.pair}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#ff0088"
              emissive="#ff0088"
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Connection between pairs */}
          <mesh position={[
            (point.position[0] + point.pair[0]) / 2,
            point.position[1],
            (point.position[2] + point.pair[2]) / 2
          ]}>
            <cylinderGeometry args={[0.02, 0.02, Math.sqrt(
              Math.pow(point.pair[0] - point.position[0], 2) +
              Math.pow(point.pair[2] - point.position[2], 2)
            )]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function AdvancedScene3D({ className = "" }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePosition({ x, y })
  }, [])
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#06b6d4" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        
        <QuantumField />
        <EnergyVortex mousePosition={mousePosition} />
        <FractalGeometry />
        <DNAHelix />
        
        {/* Post-processing effects - requires @react-three/postprocessing */}
        {/* 
        <Suspense fallback={null}>
          <EffectComposer>
            <Bloom 
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
            <ChromaticAberration 
              offset={[0.002, 0.002]}
            />
          </EffectComposer>
        </Suspense>
        */}
      </Canvas>
    </div>
  )
}
