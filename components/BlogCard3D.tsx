'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Text, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

interface BlogCard3DProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author: string
  tags: string[]
  slug: string
  featured: boolean
  image?: string
  index: number
}

function Card3DScene({ category, featured }: { category: string; featured: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const categoryColors: Record<string, string> = {
    'React': '#61dafb',
    'Web Development': '#ff6b6b',
    'TypeScript': '#3178c6',
    'Next.js': '#000000',
    'CSS': '#1572b6',
    'Backend': '#68d391',
    'JavaScript': '#f7df1e',
    'DevOps': '#326ce5'
  }
  
  const color = categoryColors[category] || '#8b5cf6'
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color={color} />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Box
          ref={meshRef}
          args={[2.5, 3, 0.2]}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={featured ? 0.8 : 0.6}
            roughness={0.3}
            metalness={0.1}
          />
        </Box>
      </Float>
      
      {featured && (
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
          <Box
            args={[0.3, 0.3, 0.3]}
            position={[1.5, 1.5, 0.5]}
          >
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.2} />
          </Box>
        </Float>
      )}
    </>
  )
}

export default function BlogCard3D({
  title,
  excerpt,
  date,
  readTime,
  category,
  author,
  tags,
  slug,
  featured,
  image,
  index
}: BlogCard3DProps) {
  return (
    <motion.div
      className="group relative h-96 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Card3DScene category={category} featured={featured} />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
            featured 
              ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700'
              : 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
          }`}>
            {featured ? '⭐ Featured' : category}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar size={12} />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors group-hover:translate-x-1 transform duration-200"
          >
            Read <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
