'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LucideIcon } from 'lucide-react'

interface EnhancedSkillCardProps {
  icon: LucideIcon
  name: string
  description: string
  level: number
  color: string
  index: number
  technologies: string[]
}

export default function EnhancedSkillCard({ 
  icon: Icon, 
  name, 
  description, 
  level, 
  color, 
  index,
  technologies 
}: EnhancedSkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden"
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: 5,
          boxShadow: `0 20px 40px ${color}20`
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
            background: `linear-gradient(135deg, ${color}30, transparent, ${color}10)`
          }}
          animate={{
            background: isHovered 
              ? `linear-gradient(135deg, ${color}50, transparent, ${color}20)`
              : `linear-gradient(135deg, ${color}30, transparent, ${color}10)`
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
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
                  y: [null, '-30px'],
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

        {/* Icon with 3D effect */}
        <motion.div
          className="relative z-10 mb-4"
          whileHover={{ rotateY: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ 
              backgroundColor: `${color}20`,
              border: `2px solid ${color}40`,
              boxShadow: `0 0 20px ${color}30`
            }}
          >
            <Icon size={24} style={{ color }} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h4 
            className="font-bold text-white mb-2 text-lg"
            style={{
              background: isHovered ? `linear-gradient(135deg, ${color}, #ffffff)` : '#ffffff',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: isHovered ? 'transparent' : '#ffffff'
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h4>
          
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          {/* Skill level with animated progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Proficiency</span>
              <span className="text-xs font-bold" style={{ color }}>
                {level}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
            </div>
          </div>

          {/* Technologies */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-1">
              {technologies.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md text-white border border-white/20"
                  style={{ 
                    backgroundColor: `${color}15`,
                    borderColor: `${color}30`
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: techIndex * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `${color}30`
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered ? `inset 0 0 20px ${color}20` : 'none'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner accent */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 opacity-20"
          style={{
            background: `radial-gradient(circle at top right, ${color}, transparent)`
          }}
        />
      </motion.div>
    </motion.div>
  )
}
