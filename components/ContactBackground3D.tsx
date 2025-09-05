'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Communication Network Visualization
function CommunicationNetwork({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const networkRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => [
    { id: 'email', position: [-3, 2, 0] as [number, number, number], color: '#3b82f6', label: 'Email' },
    { id: 'phone', position: [3, 2, 0] as [number, number, number], color: '#10b981', label: 'Phone' },
    { id: 'location', position: [0, -2, 0] as [number, number, number], color: '#f59e0b', label: 'Location' },
    { id: 'social', position: [-2, -1, 2] as [number, number, number], color: '#8b5cf6', label: 'Social' },
    { id: 'portfolio', position: [2, -1, 2] as [number, number, number], color: '#ef4444', label: 'Portfolio' },
    { id: 'center', position: [0, 0, 0] as [number, number, number], color: '#06b6d4', label: 'Connect' }
  ], [])
  
  useFrame((state) => {
    if (networkRef.current) {
      const time = state.clock.elapsedTime
      networkRef.current.rotation.y = time * 0.1 + mousePosition.x * 0.2
      networkRef.current.rotation.x = Math.sin(time * 0.3) * 0.1 + mousePosition.y * 0.1
      
      networkRef.current.children.forEach((child, index) => {
        child.position.y = nodes[index]?.position[1] + Math.sin(time * 2 + index) * 0.2
        child.rotation.y = time * (0.5 + index * 0.1)
      })
    }
  })
  
  return (
    <group ref={networkRef}>
      {/* Network Nodes */}
      {nodes.map((node, index) => (
        <group key={node.id} position={node.position}>
          <mesh>
            <sphereGeometry args={[node.id === 'center' ? 0.4 : 0.3, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
          
          {/* Particle Ring */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={20}
                array={new Float32Array(Array.from({ length: 60 }, (_, i) => {
                  const angle = (i / 20) * Math.PI * 2
                  const radius = 0.6
                  return [
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius * 0.1,
                    Math.sin(angle) * radius
                  ]
                }).flat())}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.03}
              color={node.color}
              transparent
              opacity={0.8}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      ))}
      
      {/* Connection Lines */}
      {nodes.map((fromNode, i) => 
        nodes.slice(i + 1).map((toNode, j) => (
          <mesh key={`${fromNode.id}-${toNode.id}`} position={[
            (fromNode.position[0] + toNode.position[0]) / 2,
            (fromNode.position[1] + toNode.position[1]) / 2,
            (fromNode.position[2] + toNode.position[2]) / 2
          ]}>
            <cylinderGeometry args={[0.01, 0.01, Math.sqrt(
              Math.pow(toNode.position[0] - fromNode.position[0], 2) +
              Math.pow(toNode.position[1] - fromNode.position[1], 2) +
              Math.pow(toNode.position[2] - fromNode.position[2], 2)
            )]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
          </mesh>
        ))
      )}
    </group>
  )
}

// Message Particles
function MessageParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleData = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      const hue = Math.random() * 0.3 + 0.5
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      speeds[i] = Math.random() * 0.02 + 0.01
    }
    
    return { positions, colors, speeds, count }
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleData.count; i++) {
        const i3 = i * 3
        
        // Spiral movement
        positions[i3] += Math.sin(time + i * 0.1) * particleData.speeds[i]
        positions[i3 + 1] += Math.cos(time + i * 0.1) * particleData.speeds[i]
        positions[i3 + 2] += particleData.speeds[i] * 0.5
        
        // Reset particles
        if (positions[i3 + 2] > 5) {
          positions[i3 + 2] = -5
          positions[i3] = (Math.random() - 0.5) * 20
          positions[i3 + 1] = (Math.random() - 0.5) * 20
        }
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

export default function ContactBackground3D({ className = "" }: { className?: string }) {
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
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, 10, 0]} intensity={0.4} color="#3b82f6" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
        
        <CommunicationNetwork mousePosition={mousePosition} />
        <MessageParticles />
      </Canvas>
    </div>
  )
}
