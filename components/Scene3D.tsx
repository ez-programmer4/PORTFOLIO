'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingGeometry({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#64748b" transparent opacity={0.6} />
    </points>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        
        <ParticleField />
        
        <FloatingGeometry position={[-4, 2, -2]} color="#3b82f6" scale={0.8} />
        <FloatingGeometry position={[4, -2, -1]} color="#8b5cf6" scale={0.6} />
        <FloatingGeometry position={[2, 3, -3]} color="#06b6d4" scale={0.4} />
        <FloatingGeometry position={[-3, -1, -2]} color="#10b981" scale={0.5} />
        
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0}
            metalness={1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Canvas>
    </div>
  )
}
