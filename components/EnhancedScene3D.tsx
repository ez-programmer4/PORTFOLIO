'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function MorphingGeometry({ position, color, scale = 1, mousePosition }: { 
  position: [number, number, number], 
  color: string, 
  scale?: number,
  mousePosition: { x: number, y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const originalPositions = useRef<Float32Array>()
  
  const geometry = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 2)
    originalPositions.current = geom.attributes.position.array.slice() as Float32Array
    return geom
  }, [])
  
  useFrame((state) => {
    if (meshRef.current && originalPositions.current) {
      const time = state.clock.elapsedTime
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      
      // Mouse influence
      const mouseInfluence = 0.5
      const distanceToMouse = Math.sqrt(
        Math.pow(mousePosition.x - position[0], 2) + 
        Math.pow(mousePosition.y - position[1], 2)
      )
      const mouseEffect = Math.max(0, 1 - distanceToMouse / 5) * mouseInfluence
      
      for (let i = 0; i < positions.length; i += 3) {
        const originalX = originalPositions.current[i]
        const originalY = originalPositions.current[i + 1]
        const originalZ = originalPositions.current[i + 2]
        
        // Wave distortion
        const wave1 = Math.sin(time * 2 + originalX * 3) * 0.1
        const wave2 = Math.cos(time * 1.5 + originalY * 2) * 0.1
        const wave3 = Math.sin(time * 3 + originalZ * 4) * 0.05
        
        // Mouse interaction
        const mouseWave = Math.sin(time * 4 + distanceToMouse * 2) * mouseEffect * 0.3
        
        positions[i] = originalX + wave1 + mouseWave
        positions[i + 1] = originalY + wave2 + mouseWave
        positions[i + 2] = originalZ + wave3 + mouseWave
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true
      
      // Rotation
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + mousePosition.y * 0.1
      meshRef.current.rotation.y = time * 0.3 + mousePosition.x * 0.1
      meshRef.current.rotation.z = Math.cos(time * 0.7) * 0.1
      
      // Scale based on mouse proximity
      const targetScale = scale * (1 + mouseEffect * 0.5)
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function AdvancedParticleField({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const points = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  const particleData = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      const hue = Math.random() * 0.3 + 0.5
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      sizes[i] = Math.random() * 0.05 + 0.01
    }
    
    return { positions, colors, sizes, count }
  }, [])

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.elapsedTime
      const positions = points.current.geometry.attributes.position.array as Float32Array
      const sizes = points.current.geometry.attributes.size.array as Float32Array
      
      for (let i = 0; i < particleData.count; i++) {
        const i3 = i * 3
        
        // Wave motion
        positions[i3 + 1] += Math.sin(time + positions[i3] * 0.01) * 0.02
        
        // Mouse attraction/repulsion
        const mouseX = mousePosition.x * viewport.width / 2
        const mouseY = mousePosition.y * viewport.height / 2
        const dx = mouseX - positions[i3]
        const dy = mouseY - positions[i3 + 1]
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 3) {
          const force = (3 - distance) / 3
          positions[i3] -= dx * force * 0.02
          positions[i3 + 1] -= dy * force * 0.02
          sizes[i] = particleData.sizes[i] * (1 + force * 2)
        } else {
          sizes[i] = particleData.sizes[i]
        }
        
        // Boundary wrapping
        if (positions[i3 + 1] > 20) positions[i3 + 1] = -20
        if (positions[i3 + 1] < -20) positions[i3 + 1] = 20
      }
      
      points.current.geometry.attributes.position.needsUpdate = true
      points.current.geometry.attributes.size.needsUpdate = true
      points.current.rotation.y = time * 0.02
    }
  })

  return (
    <points ref={points}>
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
        <bufferAttribute
          attach="attributes-size"
          count={particleData.count}
          array={particleData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingRings({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const rings = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (rings.current) {
      const time = state.clock.elapsedTime
      rings.current.rotation.x = time * 0.1 + mousePosition.y * 0.2
      rings.current.rotation.y = time * 0.2 + mousePosition.x * 0.3
      rings.current.rotation.z = time * 0.05
      
      rings.current.children.forEach((ring, index) => {
        ring.rotation.x = time * (0.5 + index * 0.1)
        ring.rotation.y = time * (0.3 + index * 0.15)
        ring.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1)
      })
    }
  })

  return (
    <group ref={rings}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 2]}>
          <torusGeometry args={[2 + i * 0.5, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={`hsl(${200 + i * 30}, 70%, 60%)`}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6 - i * 0.1}
            emissive={`hsl(${200 + i * 30}, 70%, 30%)`}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function EnhancedScene3D({ className = "" }: { className?: string }) {
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
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Advanced Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={0.8} 
          color="#3b82f6"
          distance={20}
        />
        <pointLight 
          position={[10, -10, 5]} 
          intensity={0.6} 
          color="#8b5cf6"
          distance={15}
        />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#06b6d4"
          castShadow
        />
        
        {/* Particle Field */}
        <AdvancedParticleField mousePosition={mousePosition} />
        
        {/* Morphing Geometries */}
        <MorphingGeometry 
          position={[-6, 3, -2]} 
          color="#3b82f6" 
          scale={0.8}
          mousePosition={mousePosition}
        />
        <MorphingGeometry 
          position={[6, -2, -1]} 
          color="#8b5cf6" 
          scale={0.6}
          mousePosition={mousePosition}
        />
        <MorphingGeometry 
          position={[3, 4, -3]} 
          color="#06b6d4" 
          scale={0.4}
          mousePosition={mousePosition}
        />
        <MorphingGeometry 
          position={[-4, -3, -2]} 
          color="#10b981" 
          scale={0.5}
          mousePosition={mousePosition}
        />
        
        {/* Floating Rings */}
        <FloatingRings mousePosition={mousePosition} />
        
        {/* Central Sphere */}
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0}
            metalness={1}
            transparent
            opacity={0.9}
            emissive="#f59e0b"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Canvas>
    </div>
  )
}
