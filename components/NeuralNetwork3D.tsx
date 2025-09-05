'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Circuit board with glowing traces
function CircuitBoard({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const circuitRef = useRef<THREE.Group>(null)
  const tracesRef = useRef<THREE.LineSegments>(null)
  
  const circuitData = useMemo(() => {
    const traces: [number, number, number, number, number, number][] = []
    const nodes: [number, number, number][] = []
    
    // Create grid-based circuit pattern
    for (let x = -15; x <= 15; x += 3) {
      for (let y = -10; y <= 10; y += 2.5) {
        const z = (Math.random() - 0.5) * 0.5
        nodes.push([x, y, z])
        
        // Horizontal traces
        if (x < 15 && Math.random() > 0.3) {
          traces.push([x, y, z, x + 3, y, z])
        }
        
        // Vertical traces  
        if (y < 10 && Math.random() > 0.4) {
          traces.push([x, y, z, x, y + 2.5, z])
        }
      }
    }
    
    return { traces, nodes }
  }, [])
  
  const traceGeometry = useMemo(() => {
    const positions = new Float32Array(circuitData.traces.length * 6)
    const colors = new Float32Array(circuitData.traces.length * 6)
    
    circuitData.traces.forEach((trace, index) => {
      const [x1, y1, z1, x2, y2, z2] = trace
      
      positions[index * 6] = x1
      positions[index * 6 + 1] = y1
      positions[index * 6 + 2] = z1
      positions[index * 6 + 3] = x2
      positions[index * 6 + 4] = y2
      positions[index * 6 + 5] = z2
      
      const color = new THREE.Color('#22d3ee')
      colors[index * 6] = color.r
      colors[index * 6 + 1] = color.g
      colors[index * 6 + 2] = color.b
      colors[index * 6 + 3] = color.r
      colors[index * 6 + 4] = color.g
      colors[index * 6 + 5] = color.b
    })
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    return geometry
  }, [circuitData])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (circuitRef.current) {
      circuitRef.current.rotation.z = time * 0.02 + mousePosition.x * 0.05
      circuitRef.current.position.y = Math.sin(time * 0.3) * 0.5
    }
    
    if (tracesRef.current) {
      const material = tracesRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.4 + Math.sin(time * 2) * 0.2
    }
  })
  
  return (
    <group ref={circuitRef}>
      <lineSegments ref={tracesRef} geometry={traceGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {circuitData.nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshStandardMaterial
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

// Binary data stream
function DataStream({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const streamRef = useRef<THREE.Points>(null)
  
  const streamData = useMemo(() => {
    const count = 400
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
      
      const isOne = Math.random() > 0.5
      const color = new THREE.Color(isOne ? '#10b981' : '#22d3ee')
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      speeds[i] = Math.random() * 0.03 + 0.01
    }
    
    return { positions, colors, speeds, count }
  }, [])
  
  useFrame((state) => {
    if (streamRef.current) {
      const time = state.clock.elapsedTime
      const positions = streamRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < streamData.count; i++) {
        const i3 = i * 3
        
        // Matrix-style falling code
        positions[i3 + 1] -= streamData.speeds[i] * (1 + Math.sin(time + i) * 0.3)
        positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.005
        positions[i3 + 2] += Math.cos(time * 0.3 + i * 0.2) * 0.003
        
        // Reset particles that fall too far
        if (positions[i3 + 1] < -15) {
          positions[i3 + 1] = 15
          positions[i3] = (Math.random() - 0.5) * 50
          positions[i3 + 2] = (Math.random() - 0.5) * 25
        }
      }
      
      streamRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={streamData.count}
          array={streamData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={streamData.count}
          array={streamData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Holographic data cubes
function DataCubes({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const cubesRef = useRef<THREE.InstancedMesh>(null)
  
  const cubeData = useMemo(() => {
    const cubes = []
    for (let i = 0; i < 20; i++) {
      cubes.push({
        position: [
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20
        ] as [number, number, number],
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        scale: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2
      })
    }
    return cubes
  }, [])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (cubesRef.current) {
      const matrix = new THREE.Matrix4()
      const color = new THREE.Color()
      
      cubeData.forEach((cube, i) => {
        const rotY = time * cube.rotationSpeed + cube.phase
        const rotX = time * cube.rotationSpeed * 0.7
        const pulse = Math.sin(time * 2 + cube.phase) * 0.1 + 0.9
        
        matrix.makeRotationFromEuler(new THREE.Euler(rotX, rotY, 0))
        matrix.setPosition(cube.position[0], cube.position[1], cube.position[2])
        matrix.scale(new THREE.Vector3(cube.scale * pulse, cube.scale * pulse, cube.scale * pulse))
        cubesRef.current!.setMatrixAt(i, matrix)
        
        // Holographic color shifting
        const hue = 0.5 + Math.sin(time + i * 0.5) * 0.2
        color.setHSL(hue, 0.8, 0.6)
        cubesRef.current!.setColorAt(i, color)
      })
      
      cubesRef.current.instanceMatrix.needsUpdate = true
      if (cubesRef.current.instanceColor) {
        cubesRef.current.instanceColor.needsUpdate = true
      }
    }
  })
  
  return (
    <instancedMesh
      ref={cubesRef}
      args={[undefined, undefined, cubeData.length]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        emissive="#d946ef"
        emissiveIntensity={0.4}
        transparent
        opacity={0.3}
        wireframe
      />
    </instancedMesh>
  )}

// Server racks with blinking lights
function ServerRacks({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const racksRef = useRef<THREE.Group>(null)
  
  const rackData = useMemo(() => {
    const racks = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 12
      racks.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 8,
          Math.sin(angle) * radius
        ] as [number, number, number],
        height: 2 + Math.random() * 3,
        activity: Math.random()
      })
    }
    return racks
  }, [])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (racksRef.current) {
      racksRef.current.rotation.y = time * 0.03 + mousePosition.x * 0.1
    }
  })
  
  return (
    <group ref={racksRef}>
      {rackData.map((rack, i) => (
        <group key={i} position={rack.position}>
          <mesh>
            <boxGeometry args={[0.8, rack.height, 0.4]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive="#0ea5e9"
              emissiveIntensity={rack.activity * 0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
          
          {/* Server lights */}
          {Array.from({ length: Math.floor(rack.height * 2) }, (_, j) => (
            <mesh key={j} position={[0.35, rack.height/2 - j * 0.3, 0.15]}>
              <sphereGeometry args={[0.02, 4, 4]} />
              <meshStandardMaterial
                emissive={j % 2 === 0 ? "#10b981" : "#ef4444"}
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export default function NeuralNetwork3D({ className = "" }: { className?: string }) {
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
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
        <directionalLight position={[0, 0, 10]} intensity={0.5} color="#06b6d4" />
        
        <NeuralNetworkMesh mousePosition={mousePosition} />
        <DataStream mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
