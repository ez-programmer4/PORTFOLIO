'use client'

import { motion } from 'framer-motion'

export const CodeSVG = ({ className = "w-24 h-24" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <motion.path
      d="M25 35L15 50L25 65"
      stroke="url(#gradient1)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    <motion.path
      d="M75 35L85 50L75 65"
      stroke="url(#gradient1)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.7 }}
    />
    <motion.path
      d="M55 25L45 75"
      stroke="url(#gradient2)"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.9 }}
    />
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </motion.svg>
)

export const RocketSVG = ({ className = "w-24 h-24" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <motion.path
      d="M50 10C45 15 40 25 40 35L40 60L50 70L60 60L60 35C60 25 55 15 50 10Z"
      fill="url(#rocketGradient)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
    <motion.circle
      cx="50"
      cy="30"
      r="5"
      fill="#f59e0b"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    />
    <motion.path
      d="M35 45L25 55L35 60Z"
      fill="#ef4444"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    />
    <motion.path
      d="M65 45L75 55L65 60Z"
      fill="#ef4444"
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
    />
    <motion.path
      d="M45 70L50 85L55 70Z"
      fill="#f59e0b"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    />
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </motion.svg>
)

export const GeometricPattern = ({ className = "w-full h-full" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 2 }}
  >
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.circle
        key={i}
        cx={50 + (i % 4) * 100}
        cy={50 + Math.floor(i / 4) * 80}
        r="2"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      />
    ))}
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.line
        key={`line-${i}`}
        x1={50 + (i % 3) * 150}
        y1={50}
        x2={50 + (i % 3) * 150}
        y2={350}
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: i * 0.2 }}
      />
    ))}
  </motion.svg>
)

export const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-20 left-10"
      animate={{
        y: [-10, 10, -10],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60" />
    </motion.div>
    
    <motion.div
      className="absolute top-40 right-20"
      animate={{
        y: [10, -10, 10],
        x: [-5, 5, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-6 h-6 border-2 border-cyan-400 rotate-45 opacity-40" />
    </motion.div>
    
    <motion.div
      className="absolute bottom-40 left-1/4"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-50" />
    </motion.div>
    
    <motion.div
      className="absolute top-1/3 right-1/3"
      animate={{
        y: [-15, 15, -15],
        rotate: [0, -180, -360],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg className="w-5 h-5 text-yellow-400 opacity-60" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </motion.div>
  </div>
)
