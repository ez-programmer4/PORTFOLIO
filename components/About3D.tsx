'use client'

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useState, useRef, Suspense } from 'react'
import * as THREE from 'three'
import { Code2, Database, Globe, Smartphone, Server, Zap, Award, Users, Coffee, Heart } from 'lucide-react'

// 3D Floating Skills Component
function FloatingSkills({ skills }: { skills: any[] }) {
  const groupRef = useRef<THREE.Group>(null)
  
  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(Date.now() * 0.001 + index) * 0.5
        
        return (
          <group key={skill.name} position={[x, y, z]}>
            <mesh
              rotation={[0, angle, 0]}
              onPointerOver={(e) => {
                e.stopPropagation()
                if (groupRef.current) {
                  groupRef.current.rotation.y += 0.1
                }
              }}
            >
              <boxGeometry args={[1, 1, 0.2]} />
              <meshStandardMaterial 
                color={skill.color} 
                transparent 
                opacity={0.8}
                emissive={skill.color}
                emissiveIntensity={0.3}
              />
            </mesh>
            
            {/* Skill level indicator */}
            <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.1, 0.1, skill.level / 50]} />
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
            </mesh>
          </group>
        )
      })}
      
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
    </group>
  )
}

// 3D Experience Timeline
function ExperienceTimeline({ experience }: { experience: any[] }) {
  return (
    <group>
      {experience.map((exp, index) => {
        const y = index * 2 - 2
        return (
          <group key={exp.title} position={[0, y, 0]}>
            {/* Timeline node */}
            <mesh position={[-3, 0, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
            </mesh>
            
            {/* Timeline line */}
            {index < experience.length - 1 && (
              <mesh position={[-3, -1, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 2]} />
                <meshStandardMaterial color="#6b7280" />
              </mesh>
            )}
            
            {/* Experience card */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[4, 1, 0.2]} />
              <meshStandardMaterial 
                color="#1f2937" 
                transparent 
                opacity={0.8}
                emissive="#1f2937"
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        )
      })}
      
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#f59e0b" />
    </group>
  )
}

interface About3DProps {
  skills: any[]
  experience: any[]
}

export default function About3D({ skills, experience }: About3DProps) {
  const [activeView, setActiveView] = useState<'skills' | 'experience'>('skills')

  return (
    <div className="relative">
      {/* View Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <button
            onClick={() => setActiveView('skills')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeView === 'skills'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveView('experience')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeView === 'experience'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Experience
          </button>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="h-96 bg-black/20 rounded-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            {activeView === 'skills' ? (
              <FloatingSkills skills={skills} />
            ) : (
              <ExperienceTimeline experience={experience} />
            )}
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
