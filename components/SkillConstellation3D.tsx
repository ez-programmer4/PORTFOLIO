'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Sphere, Line } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface SkillNode {
  id: string
  name: string
  position: [number, number, number]
  level: number
  category: string
  color: string
  connections: string[]
}

function SkillOrb({ skill, isHovered, onHover, mousePosition }: {
  skill: SkillNode
  isHovered: boolean
  onHover: (skill: SkillNode | null) => void
  mousePosition: { x: number, y: number }
}) {
  const orbRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (orbRef.current) {
      const time = state.clock.elapsedTime
      
      // Floating animation
      orbRef.current.position.y = skill.position[1] + Math.sin(time * 2 + skill.position[0]) * 0.2
      
      // Rotation
      orbRef.current.rotation.x = time * 0.5
      orbRef.current.rotation.y = time * 0.3
      
      // Scale based on hover and skill level
      const targetScale = (isHovered ? 1.5 : 1) * (0.3 + skill.level * 0.01)
      orbRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      
      // Mouse interaction
      const mouseInfluence = 1 - Math.min(1, Math.sqrt(
        Math.pow(mousePosition.x * 10 - skill.position[0], 2) +
        Math.pow(mousePosition.y * 10 - skill.position[1], 2)
      ) / 3)
      
      if (mouseInfluence > 0.5) {
        orbRef.current.scale.multiplyScalar(1 + mouseInfluence * 0.3)
      }
    }
    
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
      textRef.current.visible = isHovered
    }
  })
  
  return (
    <group position={skill.position}>
      <Sphere
        ref={orbRef}
        args={[1, 32, 32]}
        onPointerEnter={() => onHover(skill)}
        onPointerLeave={() => onHover(null)}
      >
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Skill level indicator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.4, 32]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={skill.level / 100}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Floating text */}
      <group ref={textRef} position={[0, 2, 0]}>
        <Text
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Bold.woff"
        >
          {skill.name}
        </Text>
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color={skill.color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.woff"
        >
          {skill.level}% • {skill.category}
        </Text>
      </group>
      
      {/* Particle effects around orb */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={20}
            array={new Float32Array(Array.from({ length: 60 }, () => (Math.random() - 0.5) * 4))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={skill.color}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function SkillConnections({ skills, hoveredSkill }: {
  skills: SkillNode[]
  hoveredSkill: SkillNode | null
}) {
  const connectionsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (connectionsRef.current) {
      const time = state.clock.elapsedTime
      connectionsRef.current.rotation.y = time * 0.05
    }
  })
  
  return (
    <group ref={connectionsRef}>
      {skills.map(skill => 
        skill.connections.map(connectionId => {
          const connectedSkill = skills.find(s => s.id === connectionId)
          if (!connectedSkill) return null
          
          const isHighlighted = hoveredSkill && (
            hoveredSkill.id === skill.id || 
            hoveredSkill.id === connectedSkill.id
          )
          
          return (
            <Line
              key={`${skill.id}-${connectionId}`}
              points={[skill.position, connectedSkill.position]}
              color={isHighlighted ? "#00ffff" : "#4f46e5"}
              lineWidth={isHighlighted ? 3 : 1}
              transparent
              opacity={isHighlighted ? 0.8 : 0.3}
            />
          )
        })
      )}
    </group>
  )
}

function ConstellationBackground() {
  const starsRef = useRef<THREE.Points>(null)
  
  const starData = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      const color = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.8)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors, count }
  }, [])
  
  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.elapsedTime
      starsRef.current.rotation.y = time * 0.01
      starsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05
    }
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starData.count}
          array={starData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starData.count}
          array={starData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function SkillConstellation3D({ className = "" }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null)
  
  const skills: SkillNode[] = useMemo(() => [
    // Frontend Constellation
    { id: 'react', name: 'React', position: [0, 0, 0], level: 95, category: 'Frontend', color: '#61dafb', connections: ['nextjs', 'typescript', 'tailwind'] },
    { id: 'nextjs', name: 'Next.js', position: [3, 1, -1], level: 90, category: 'Frontend', color: '#000000', connections: ['react', 'vercel'] },
    { id: 'typescript', name: 'TypeScript', position: [-2, 2, 1], level: 88, category: 'Language', color: '#3178c6', connections: ['react', 'nodejs'] },
    { id: 'tailwind', name: 'Tailwind', position: [2, -2, 0], level: 85, category: 'Styling', color: '#06b6d4', connections: ['react'] },
    
    // Backend Constellation
    { id: 'nodejs', name: 'Node.js', position: [-4, 0, -2], level: 92, category: 'Backend', color: '#339933', connections: ['express', 'mongodb', 'typescript'] },
    { id: 'express', name: 'Express', position: [-6, -1, -1], level: 88, category: 'Backend', color: '#000000', connections: ['nodejs', 'mongodb'] },
    { id: 'python', name: 'Python', position: [-3, -3, -3], level: 85, category: 'Language', color: '#3776ab', connections: ['django', 'fastapi'] },
    { id: 'django', name: 'Django', position: [-5, -4, -2], level: 80, category: 'Backend', color: '#092e20', connections: ['python', 'postgresql'] },
    
    // Database Constellation
    { id: 'mongodb', name: 'MongoDB', position: [-7, 1, 0], level: 87, category: 'Database', color: '#47a248', connections: ['nodejs', 'express'] },
    { id: 'postgresql', name: 'PostgreSQL', position: [-4, -5, -1], level: 83, category: 'Database', color: '#336791', connections: ['django', 'prisma'] },
    { id: 'redis', name: 'Redis', position: [-8, -2, 1], level: 75, category: 'Database', color: '#dc382d', connections: ['nodejs'] },
    
    // DevOps Constellation
    { id: 'docker', name: 'Docker', position: [4, 3, -3], level: 82, category: 'DevOps', color: '#2496ed', connections: ['kubernetes', 'aws'] },
    { id: 'kubernetes', name: 'Kubernetes', position: [6, 4, -2], level: 78, category: 'DevOps', color: '#326ce5', connections: ['docker', 'aws'] },
    { id: 'aws', name: 'AWS', position: [5, 2, -4], level: 80, category: 'Cloud', color: '#ff9900', connections: ['docker', 'kubernetes'] },
    { id: 'vercel', name: 'Vercel', position: [4, 0, -2], level: 85, category: 'Deployment', color: '#000000', connections: ['nextjs'] },
    
    // Tools Constellation
    { id: 'git', name: 'Git', position: [0, 4, 2], level: 95, category: 'Tools', color: '#f05032', connections: ['github'] },
    { id: 'github', name: 'GitHub', position: [2, 5, 1], level: 90, category: 'Tools', color: '#181717', connections: ['git'] },
    { id: 'vscode', name: 'VS Code', position: [-1, 3, 3], level: 95, category: 'Tools', color: '#007acc', connections: [] },
    
    // Additional Skills
    { id: 'graphql', name: 'GraphQL', position: [1, -4, -1], level: 75, category: 'API', color: '#e10098', connections: ['react', 'nodejs'] },
    { id: 'prisma', name: 'Prisma', position: [-2, -6, 0], level: 78, category: 'ORM', color: '#2d3748', connections: ['postgresql', 'nodejs'] },
    { id: 'fastapi', name: 'FastAPI', position: [-1, -5, -4], level: 82, category: 'Backend', color: '#009688', connections: ['python'] }
  ], [])
  
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
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <directionalLight position={[0, 0, 15]} intensity={0.4} color="#06b6d4" />
        
        <ConstellationBackground />
        <SkillConnections skills={skills} hoveredSkill={hoveredSkill} />
        
        {skills.map(skill => (
          <SkillOrb
            key={skill.id}
            skill={skill}
            isHovered={hoveredSkill?.id === skill.id}
            onHover={setHoveredSkill}
            mousePosition={mousePosition}
          />
        ))}
      </Canvas>
      
      {/* Skill Info Panel */}
      {hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30"
        >
          <h3 className="text-cyan-400 font-bold text-lg">{hoveredSkill.name}</h3>
          <p className="text-gray-300 text-sm">{hoveredSkill.category}</p>
          <div className="flex items-center mt-2">
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${hoveredSkill.level}%` }}
              />
            </div>
            <span className="ml-2 text-cyan-400 font-mono text-sm">{hoveredSkill.level}%</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
