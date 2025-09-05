'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface Project3DProps {
  title: string
  description: string
  tags: string[]
  color: string
  isActive: boolean
}

function ProjectCube({ color, isActive }: { color: string, isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(isActive ? 1.2 : 1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

export default function Project3D({ title, description, tags, color, isActive }: Project3DProps) {
  return (
    <motion.div
      className="relative h-64 w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <pointLight position={[-2, -2, -5]} intensity={0.5} color={color} />
          
          <ProjectCube color={color} isActive={isActive} />
          
        </Canvas>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/20 backdrop-blur-sm text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
