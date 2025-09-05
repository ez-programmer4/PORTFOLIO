'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, Box, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Tag, User, Share2, Bookmark, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  slug: string
  author: string
  tags: string[]
  featured: boolean
  image?: string
}

interface BlogDetail3DProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

function BlogDetailScene({ post }: { post: BlogPost }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

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
  
  const color = categoryColors[post.category] || '#8b5cf6'

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color={color} />
      
      <group ref={groupRef}>
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
          <Box position={[0, 0, -2]} args={[4, 5, 0.2]}>
            <meshStandardMaterial color={color} transparent opacity={0.1} />
          </Box>
        </Float>
        
        {post.tags.slice(0, 4).map((tag, index) => (
          <Float key={tag} speed={1.5 + index * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <Sphere 
              position={[
                Math.cos((index * Math.PI) / 2) * 3,
                Math.sin((index * Math.PI) / 2) * 2,
                1
              ]} 
              args={[0.2, 8, 8]}
            >
              <meshStandardMaterial color={color} transparent opacity={0.6} />
            </Sphere>
          </Float>
        ))}
      </group>
    </>
  )
}

export default function BlogDetail3D({ post, isOpen, onClose }: BlogDetail3DProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!post) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 3D Background */}
            <div className="absolute inset-0 opacity-10">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <BlogDetailScene post={post} />
              </Canvas>
            </div>

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                      post.featured 
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200'
                        : 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                    }`}>
                      {post.featured ? '⭐ Featured' : post.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 max-h-96 overflow-y-auto">
              {post.image && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                <div dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '<strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                    <Bookmark size={16} />
                    Save
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  Read Full Post
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
