'use client'

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function MouseInteractiveParticles() {
  const points = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()
  
  const particleCount = 1500
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
      
      // Color gradient based on position
      const hue = (pos[i * 3] + 15) / 30
      const color = new THREE.Color().setHSL(hue * 0.3 + 0.5, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions: pos, colors }
  }, [])

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.elapsedTime
      const positions = points.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Wave motion
        positions[i3 + 1] += Math.sin(time + positions[i3] * 0.01) * 0.01
        
        // Mouse interaction
        const mouseInfluence = 2
        const dx = mouse.current.x * viewport.width / 2 - positions[i3]
        const dy = mouse.current.y * viewport.height / 2 - positions[i3 + 1]
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence
          positions[i3] -= dx * force * 0.01
          positions[i3 + 1] -= dy * force * 0.01
        }
        
        // Boundary wrapping
        if (positions[i3 + 1] > 15) positions[i3 + 1] = -15
        if (positions[i3 + 1] < -15) positions[i3 + 1] = 15
      }
      
      points.current.geometry.attributes.position.needsUpdate = true
      points.current.rotation.y = time * 0.05
    }
  })

  const handlePointerMove = useCallback((event: any) => {
    mouse.current.x = (event.point.x / viewport.width) * 2
    mouse.current.y = (event.point.y / viewport.height) * 2
  }, [viewport])

  return (
    <points ref={points} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={positions.colors}
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

export default function InteractiveParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <MouseInteractiveParticles />
      </Canvas>
    </div>
  )
}
