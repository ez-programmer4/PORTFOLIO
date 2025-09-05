'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export const MorphingLogo = ({ className = "w-32 h-32" }: { className?: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <defs>
        <linearGradient id="morphGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.path
        d={isHovered 
          ? "M100 20 L180 60 L160 140 L40 140 L20 60 Z" 
          : "M100 30 L170 70 L150 130 L50 130 L30 70 Z"
        }
        fill="url(#morphGradient1)"
        filter="url(#glow)"
        animate={{
          d: isHovered 
            ? "M100 20 L180 60 L160 140 L40 140 L20 60 Z" 
            : "M100 30 L170 70 L150 130 L50 130 L30 70 Z"
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      <motion.circle
        cx="100"
        cy="100"
        r={isHovered ? "25" : "20"}
        fill="white"
        animate={{ r: isHovered ? 25 : 20 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.text
        x="100"
        y="105"
        textAnchor="middle"
        className="text-sm font-bold"
        fill="url(#morphGradient1)"
        animate={{
          fontSize: isHovered ? "16px" : "14px",
          opacity: [1, 0.7, 1]
        }}
        transition={{ duration: 0.5 }}
      >
        E
      </motion.text>
    </motion.svg>
  )
}

export const AnimatedWaveform = ({ className = "w-full h-24" }: { className?: string }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 400 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="25%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="75%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.rect
          key={i}
          x={i * 10}
          y="50"
          width="6"
          height="2"
          fill="url(#waveGradient)"
          animate={{
            height: [2, Math.random() * 40 + 10, 2],
            y: [49, 50 - (Math.random() * 20 + 5), 49]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </motion.svg>
  )
}

export const CodeBrackets = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.2, rotate: 10 }}
    >
      <motion.path
        d="M30 20 L10 50 L30 80"
        stroke="url(#codeGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      <motion.path
        d="M70 20 L90 50 L70 80"
        stroke="url(#codeGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="3"
        fill="url(#codeGradient)"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <defs>
        <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
