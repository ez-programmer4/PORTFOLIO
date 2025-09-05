'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Calendar, Users, Star, GitBranch, Database, Server, Zap, Shield } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { useState, useRef, Suspense } from 'react'
import * as THREE from 'three'

interface ProjectDetailProps {
  project: {
    title: string
    description: string
    longDescription: string
    image: string
    tags: string[]
    category: string
    github: string
    demo: string
    color: string
    features: string[]
    techDetails: {
      frontend: string[]
      backend: string[]
      database: string[]
      deployment: string[]
    }
    metrics: {
      performance: number
      security: number
      scalability: number
      maintainability: number
    }
    timeline: string
    teamSize: string
    challenges: string[]
    solutions: string[]
  }
  isOpen: boolean
  onClose: () => void
}

// 3D Tech Stack Visualization Component
function TechStack3D({ techs, color }: { techs: string[], color: string }) {
  const meshRef = useRef<THREE.Group>(null)
  
  return (
    <group ref={meshRef}>
      {techs.map((tech, index) => {
        const angle = (index / techs.length) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <group key={tech} position={[x, 0, z]}>
            <mesh
              rotation={[0, angle, 0]}
              onPointerOver={(e) => {
                e.stopPropagation()
                if (meshRef.current) {
                  meshRef.current.rotation.y += 0.1
                }
              }}
            >
              <boxGeometry args={[0.8, 0.8, 0.2]} />
              <meshStandardMaterial 
                color={color} 
                transparent 
                opacity={0.8}
                emissive={color}
                emissiveIntensity={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
              <planeGeometry args={[0.6, 0.2]} />
              <meshBasicMaterial color="white" transparent opacity={0.9} />
            </mesh>
          </group>
        )
      })}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

// 3D Architecture Diagram
function Architecture3D({ color }: { color: string }) {
  return (
    <group>
      {/* Frontend Layer */}
      <mesh position={[-2, 1, 0]}>
        <boxGeometry args={[1.5, 0.3, 1]} />
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.2} />
      </mesh>
      
      {/* API Layer */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 8]} />
        <meshStandardMaterial color="#339933" emissive="#339933" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Database Layer */}
      <mesh position={[2, -1, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.4, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      
      {/* Connection Lines */}
      <mesh position={[-1, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[1, -0.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 5]} intensity={1} color={color} />
    </group>
  )
}

export default function ProjectDetail3D({ project, isOpen, onClose }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'tech', label: 'Tech Stack', icon: Server },
    { id: 'architecture', label: 'Architecture', icon: GitBranch },
    { id: 'metrics', label: 'Metrics', icon: Zap }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}20`, border: `2px solid ${project.color}40` }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Server size={24} style={{ color: project.color }} />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    <p className="text-gray-400">{project.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} className="text-white" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} className="text-white" />
                  </motion.a>
                  <motion.button
                    onClick={onClose}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} className="text-white" />
                  </motion.button>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex gap-2 mt-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-white/20 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </motion.button>
                  )
                })}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid lg:grid-cols-2 gap-8"
                  >
                    {/* Project Image & Description */}
                    <div>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-xl mb-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {project.longDescription}
                      </p>
                      
                      {/* Project Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Calendar size={20} style={{ color: project.color }} />
                          <div>
                            <p className="text-xs text-gray-400">Timeline</p>
                            <p className="text-white font-medium">{project.timeline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Users size={20} style={{ color: project.color }} />
                          <div>
                            <p className="text-xs text-gray-400">Team Size</p>
                            <p className="text-white font-medium">{project.teamSize}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Features & Challenges */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                      <div className="space-y-3 mb-6">
                        {project.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            <p className="text-gray-300">{feature}</p>
                          </motion.div>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4">Challenges & Solutions</h3>
                      <div className="space-y-4">
                        {project.challenges.map((challenge, index) => (
                          <motion.div
                            key={index}
                            className="p-4 bg-white/5 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <p className="text-red-400 font-medium mb-2">Challenge:</p>
                            <p className="text-gray-300 mb-3">{challenge}</p>
                            <p className="text-green-400 font-medium mb-2">Solution:</p>
                            <p className="text-gray-300">{project.solutions[index]}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'tech' && (
                  <motion.div
                    key="tech"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid lg:grid-cols-2 gap-8"
                  >
                    {/* 3D Tech Stack Visualization */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">3D Tech Stack</h3>
                      <div className="h-80 bg-black/20 rounded-xl overflow-hidden">
                        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                          <Suspense fallback={null}>
                            <TechStack3D techs={project.tags} color={project.color} />
                          </Suspense>
                        </Canvas>
                      </div>
                    </div>
                    
                    {/* Tech Details */}
                    <div className="space-y-6">
                      {Object.entries(project.techDetails).map(([category, techs]) => (
                        <motion.div
                          key={category}
                          className="p-4 bg-white/5 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h4 className="text-lg font-semibold text-white mb-3 capitalize flex items-center gap-2">
                            {category === 'frontend' && <Star size={16} style={{ color: project.color }} />}
                            {category === 'backend' && <Server size={16} style={{ color: project.color }} />}
                            {category === 'database' && <Database size={16} style={{ color: project.color }} />}
                            {category === 'deployment' && <Shield size={16} style={{ color: project.color }} />}
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, index) => (
                              <motion.span
                                key={tech}
                                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, backgroundColor: `${project.color}20` }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-96"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">3D Architecture Overview</h3>
                    <div className="h-full bg-black/20 rounded-xl overflow-hidden">
                      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                        <Suspense fallback={null}>
                          <Architecture3D color={project.color} />
                        </Suspense>
                      </Canvas>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'metrics' && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {Object.entries(project.metrics).map(([metric, value]) => (
                      <motion.div
                        key={metric}
                        className="p-6 bg-white/5 rounded-xl"
                        onMouseEnter={() => setHoveredMetric(metric)}
                        onMouseLeave={() => setHoveredMetric(null)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-white capitalize">{metric}</h4>
                          <span className="text-2xl font-bold" style={{ color: project.color }}>
                            {value}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <motion.div
                            className="h-3 rounded-full"
                            style={{ backgroundColor: project.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <motion.div
                          className="mt-2 text-sm text-gray-400"
                          animate={{
                            opacity: hoveredMetric === metric ? 1 : 0.7
                          }}
                        >
                          {metric === 'performance' && 'Optimized for speed and efficiency'}
                          {metric === 'security' && 'Secure authentication and data protection'}
                          {metric === 'scalability' && 'Built to handle growing user demands'}
                          {metric === 'maintainability' && 'Clean, documented, and testable code'}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
