'use client'

import { motion } from 'framer-motion'
import { Award, Users, Coffee, Heart, Code, Calendar, Star, Zap } from 'lucide-react'

const stats = [
  {
    icon: Code,
    value: '50+',
    label: 'Projects Completed',
    color: '#22c55e',
    description: 'Full-stack applications delivered'
  },
  {
    icon: Calendar,
    value: '5+',
    label: 'Years Experience',
    color: '#3b82f6',
    description: 'Professional development journey'
  },
  {
    icon: Users,
    value: '20+',
    label: 'Happy Clients',
    color: '#f59e0b',
    description: 'Satisfied customers worldwide'
  },
  {
    icon: Coffee,
    value: '1000+',
    label: 'Cups of Coffee',
    color: '#8b5cf6',
    description: 'Fuel for late-night coding sessions'
  },
  {
    icon: Star,
    value: '15+',
    label: 'Technologies',
    color: '#ef4444',
    description: 'Languages and frameworks mastered'
  },
  {
    icon: Zap,
    value: '99%',
    label: 'Uptime',
    color: '#06b6d4',
    description: 'Reliable and consistent delivery'
  }
]

export default function PersonalStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center overflow-hidden">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${stat.color}, transparent)`
              }}
            />
            
            {/* Icon */}
            <motion.div
              className="relative z-10 mb-4 mx-auto w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: `${stat.color}20`,
                border: `2px solid ${stat.color}40`
              }}
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.6 }}
            >
              <stat.icon size={24} style={{ color: stat.color }} />
            </motion.div>
            
            {/* Value with counter animation */}
            <motion.div
              className="text-2xl font-bold text-white mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              {stat.value}
            </motion.div>
            
            {/* Label */}
            <div className="text-sm font-medium text-gray-300 mb-2">
              {stat.label}
            </div>
            
            {/* Description */}
            <motion.div
              className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ height: 0 }}
              whileHover={{ height: 'auto' }}
            >
              {stat.description}
            </motion.div>
            
            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `0 0 30px ${stat.color}30`
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
