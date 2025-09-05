'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface Skill3DProps {
  skill: {
    icon: any
    name: string
    description: string
    level: number
  }
  index: number
}

function SkillGeometry({ level, isHovered, color }: { level: number, isHovered: boolean, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + level) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.scale.setScalar(isHovered ? 1.2 : 1)
      
      // Morphing effect based on skill level
      const geometry = meshRef.current.geometry as THREE.SphereGeometry
      if (geometry.attributes.position) {
        const positions = geometry.attributes.position.array as Float32Array
        const time = state.clock.elapsedTime
        
        for (let i = 0; i < positions.length; i += 3) {
          const vertex = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
          const distance = vertex.length()
          const wave = Math.sin(distance * 5 + time * 2) * 0.1 * (level / 100)
          
          vertex.normalize().multiplyScalar(1 + wave)
          positions[i] = vertex.x
          positions[i + 1] = vertex.y
          positions[i + 2] = vertex.z
        }
        
        geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={isHovered ? 0.3 : 0.1}
      />
    </mesh>
  )
}

export default function Skill3D({ skill, index }: Skill3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
  const color = colors[index % colors.length]

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 h-48 rounded-xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <pointLight position={[-2, -2, -5]} intensity={0.5} color={color} />
          
          <SkillGeometry level={skill.level} isHovered={isHovered} color={color} />
        </Canvas>
      </div>
      
      {/* Glassmorphism Card */}
      <motion.div
        className="relative z-10 p-6 h-48 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated Icon */}
        <motion.div
          className="mb-4"
          animate={{
            rotateY: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.8 }}
        >
          <skill.icon 
            className="w-12 h-12 text-white drop-shadow-lg"
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </motion.div>
        
        {/* Content */}
        <h4 className="font-bold text-white mb-2 text-lg">{skill.name}</h4>
        <p className="text-gray-200 text-sm mb-3 line-clamp-2">{skill.description}</p>
        
        {/* Animated Progress Bar */}
        <div className="relative">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color} 0%, ${color}88 100%)`
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
              viewport={{ once: true }}
            />
          </div>
          <motion.span
            className="absolute -top-6 right-0 text-xs text-white font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 1 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        
        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${color}22 0%, transparent 70%)`,
            filter: 'blur(10px)'
          }}
        />
      </motion.div>
    </motion.div>
  )
}
