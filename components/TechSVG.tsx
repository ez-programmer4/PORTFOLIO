'use client'

import { motion } from 'framer-motion'

export const GitBranch = ({ className = "w-20 h-20" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, rotateZ: 5 }}
  >
    <defs>
      <linearGradient id="gitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    
    {/* Main branch */}
    <motion.line
      x1="20"
      y1="20"
      x2="20"
      y2="80"
      stroke="url(#gitGradient)"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
    
    {/* Feature branch */}
    <motion.path
      d="M 20 40 Q 35 35 50 40 L 50 65"
      stroke="url(#gitGradient)"
      strokeWidth="3"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    />
    
    {/* Merge back */}
    <motion.path
      d="M 50 65 Q 35 70 20 65"
      stroke="url(#gitGradient)"
      strokeWidth="3"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    />
    
    {/* Commit dots */}
    <motion.circle cx="20" cy="25" r="4" fill="#f97316" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} />
    <motion.circle cx="20" cy="45" r="4" fill="#f97316" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
    <motion.circle cx="50" cy="45" r="4" fill="#dc2626" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
    <motion.circle cx="50" cy="60" r="4" fill="#dc2626" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} />
    <motion.circle cx="20" cy="70" r="4" fill="#f97316" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />
  </motion.svg>
)

export const CodeTerminal = ({ className = "w-24 h-24" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, rotateY: 10 }}
  >
    <defs>
      <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Terminal Window */}
    <motion.rect
      x="20"
      y="30"
      width="160"
      height="140"
      rx="8"
      fill="url(#terminalGradient)"
      stroke="#3b82f6"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
    
    {/* Terminal Header */}
    <rect x="20" y="30" width="160" height="25" rx="8" fill="#374151" />
    <circle cx="35" cy="42" r="4" fill="#ef4444" />
    <circle cx="50" cy="42" r="4" fill="#f59e0b" />
    <circle cx="65" cy="42" r="4" fill="#10b981" />
    
    {/* Code Lines */}
    <motion.text
      x="30"
      y="75"
      className="text-xs font-mono"
      fill="#22c55e"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      $ git commit -m "feat: add"
    </motion.text>
    
    <motion.text
      x="30"
      y="95"
      className="text-xs font-mono"
      fill="#06b6d4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      $ docker build -t app .
    </motion.text>
    
    <motion.text
      x="30"
      y="115"
      className="text-xs font-mono"
      fill="#f59e0b"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
    >
      $ kubectl apply -f deploy
    </motion.text>
    
    <motion.rect
      x="30"
      y="130"
      width="8"
      height="15"
      fill="#22c55e"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </motion.svg>
)

export const DatabaseIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, rotateX: 15 }}
  >
    <defs>
      <linearGradient id="dbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    {Array.from({ length: 4 }).map((_, i) => (
      <motion.ellipse
        key={i}
        cx="50"
        cy={20 + i * 20}
        rx="35"
        ry="8"
        fill="none"
        stroke="url(#dbGradient)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: i * 0.2 }}
      />
    ))}
    
    <motion.line
      x1="15"
      y1="20"
      x2="15"
      y2="80"
      stroke="url(#dbGradient)"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    
    <motion.line
      x1="85"
      y1="20"
      x2="85"
      y2="80"
      stroke="url(#dbGradient)"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
  </motion.svg>
)

export const APIIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <motion.svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, rotateZ: 5 }}
  >
    <defs>
      <linearGradient id="apiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    {/* Central Hub */}
    <motion.circle
      cx="50"
      cy="50"
      r="12"
      fill="url(#apiGradient)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    
    {/* Connection Nodes */}
    {Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 60) * (Math.PI / 180)
      const x = 50 + Math.cos(angle) * 30
      const y = 50 + Math.sin(angle) * 30
      
      return (
        <g key={i}>
          <motion.line
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="url(#apiGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
          <motion.circle
            cx={x}
            cy={y}
            r="6"
            fill="url(#apiGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
          />
        </g>
      )
    })}
  </motion.svg>
)

export const TechStackBadges = ({ className = "flex flex-wrap gap-2" }: { className?: string }) => {
  const techStack = [
    { name: 'React', color: '#61dafb' },
    { name: 'Next.js', color: '#000000' },
    { name: 'TypeScript', color: '#007acc' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Python', color: '#ffde57' },
    { name: 'Docker', color: '#0db7ed' },
    { name: 'MongoDB', color: '#47a248' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Redis', color: '#dc382d' },
    { name: 'AWS', color: '#ff9900' },
    { name: 'GraphQL', color: '#e10098' },
    { name: 'Kubernetes', color: '#326ce5' },
  ]

  return (
    <div className={className}>
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm border border-white/20"
          style={{ backgroundColor: `${tech.color}20` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.1,
            backgroundColor: `${tech.color}40`,
            boxShadow: `0 0 15px ${tech.color}50`
          }}
        >
          {tech.name}
        </motion.div>
      ))}
    </div>
  )
}
