'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Play, Code, Database, Server, Smartphone } from 'lucide-react'
import { useState } from 'react'

interface ProjectCard3DProps {
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  github: string
  demo: string
  color: string
  index: number
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Full Stack': return Code
    case 'Frontend': return Play
    case 'Backend': return Server
    case 'Mobile': return Smartphone
    default: return Database
  }
}

const getTechColor = (tech: string) => {
  const colors: { [key: string]: string } = {
    'React': '#61dafb',
    'Next.js': '#000000',
    'TypeScript': '#007acc',
    'Node.js': '#339933',
    'Python': '#ffde57',
    'Docker': '#0db7ed',
    'MongoDB': '#47a248',
    'PostgreSQL': '#336791',
    'Redis': '#dc382d',
    'Vue.js': '#4fc08d',
    'FastAPI': '#009688',
    'Socket.io': '#010101',
    'Firebase': '#ffca28',
    'React Native': '#61dafb',
    'Stripe': '#635bff',
    'Auth0': '#eb5424',
    'OpenAI': '#412991',
    'Prometheus': '#e6522c',
    'Grafana': '#f46800',
  }
  return colors[tech] || '#6b7280'
}

export default function ProjectCard3D({ 
  title, 
  description, 
  image, 
  tags, 
  category, 
  github, 
  demo, 
  color, 
  index 
}: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const CategoryIcon = getCategoryIcon(category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        whileHover={{ 
          rotateY: 5,
          rotateX: 5,
          z: 50,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${color}20, transparent, ${color}10)`
          }}
          animate={{
            background: isHovered 
              ? `linear-gradient(135deg, ${color}40, transparent, ${color}20)`
              : `linear-gradient(135deg, ${color}20, transparent, ${color}10)`
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Category badge */}
        <motion.div
          className="absolute top-4 left-4 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div 
            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm border border-white/20"
            style={{ backgroundColor: `${color}30` }}
          >
            <CategoryIcon size={12} />
            {category}
          </div>
        </motion.div>

        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Overlay with tech stack visualization */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 4).map((tag, tagIndex) => (
                  <motion.div
                    key={tag}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: getTechColor(tag) }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: tagIndex * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                  >
                    {tag.slice(0, 2).toUpperCase()}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={16} className="text-white" />
            </motion.a>
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={16} className="text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold text-white mb-3"
            style={{
              background: isHovered ? `linear-gradient(135deg, ${color}, #ffffff)` : '#ffffff',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: isHovered ? 'transparent' : '#ffffff'
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
            {description}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-2 py-1 text-xs rounded-md text-white border border-white/20"
                style={{ 
                  backgroundColor: `${getTechColor(tag)}20`,
                  borderColor: `${getTechColor(tag)}40`
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tagIndex * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: `${getTechColor(tag)}40`
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Performance metrics visualization */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between text-xs text-gray-400">
              <span>Performance</span>
              <span>95%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <motion.div
                className="h-1 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '95%' : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered ? `0 0 20px ${color}40` : 'none'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: color }}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  opacity: 0
                }}
                animate={{
                  y: [null, '-20px'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
