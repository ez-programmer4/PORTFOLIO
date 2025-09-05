'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, Box } from '@react-three/drei'
import * as THREE from 'three'

interface Blog3DProps {
  title: string
  description: string
  tags: string[]
  color: string
  isActive: boolean
}

function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box position={[-3, 1, 0]} scale={0.5} args={[1, 1, 1]}>
          <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
        </Box>
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere position={[3, -1, 1]} scale={0.3} args={[1, 16, 16]}>
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <Box position={[0, 2, -2]} scale={0.4} args={[1.5, 0.1, 1.5]}>
          <meshStandardMaterial color="#10b981" transparent opacity={0.5} />
        </Box>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.4}>
        <Sphere position={[-2, -2, 0]} scale={0.25} args={[1, 12, 12]}>
          <meshStandardMaterial color="#f59e0b" transparent opacity={0.8} />
        </Sphere>
      </Float>
    </group>
  )
}

function BlogScene({ title, description, color }: Blog3DProps) {
  const textRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={color} />
      
      <group ref={textRef}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.8}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {title}
        </Text>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          font="/fonts/Inter-Regular.woff"
        >
          {description}
        </Text>
      </group>
      
      <FloatingElements />
    </>
  )
}

export default function Blog3D(props: Blog3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <BlogScene {...props} />
      </Canvas>
    </div>
  )
}
