"use client"

import { useMemo, useRef, useState, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface GalaxyProps {
  className?: string
  /** Number of particles */
  count?: number
  /** Galaxy radius */
  radius?: number
  /** Number of spiral arms */
  branches?: number
  /** How tightly particles follow the arm (0-1) */
  spin?: number
  /** Randomness strength */
  randomness?: number
  /** Randomness power */
  randomnessPower?: number
}

function GalaxyPoints({
  mousePosition,
  count = 4000,
  radius = 18,
  branches = 5,
  spin = 1.2,
  randomness = 0.35,
  randomnessPower = 2.5,
}: GalaxyProps & { mousePosition: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorInner = new THREE.Color("#22d3ee") // cyan-400
    const colorOuter = new THREE.Color("#d946ef") // fuchsia-500

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      const r = Math.random() * radius
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = r * spin

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * 0.6 * r
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r

      positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * r + randomX
      positions[i3 + 1] = randomY * 0.6
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ

      const mixed = colorInner.clone().lerp(colorOuter, r / radius)
      colors[i3 + 0] = mixed.r
      colors[i3 + 1] = mixed.g
      colors[i3 + 2] = mixed.b

      sizes[i] = 0.02 + Math.random() * 0.05
    }

    return { positions, colors, sizes }
  }, [count, radius, branches, spin, randomness, randomnessPower])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!pointsRef.current) return

    // Slow galaxy rotation with slight mouse parallax
    pointsRef.current.rotation.y = t * 0.05 + mousePosition.x * 0.15
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.05 + mousePosition.y * 0.1

    const geo = pointsRef.current.geometry
    const pos = geo.getAttribute("position") as THREE.BufferAttribute
    const arr = pos.array as Float32Array

    // Subtle breathing/pulsating on Y for depth
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i]
      const z = arr[i + 2]
      const dist = Math.sqrt(x * x + z * z)
      arr[i + 1] += Math.sin(t + dist * 0.15) * 0.0008
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function GalaxyField3D({ className = "" }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePosition({ x, y })
  }, [])

  return (
    <div className={`absolute inset-0 ${className}`} onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 2, 22], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.25} />
        <GalaxyPoints mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
