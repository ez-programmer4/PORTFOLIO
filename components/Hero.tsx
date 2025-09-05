'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, Code, Coffee } from 'lucide-react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import VideoBackground from './VideoBackground'
import { CodeSVG, RocketSVG, GeometricPattern, FloatingElements } from './AnimatedSVG'
import { MorphingLogo } from './MorphingSVG'
import { CodeTerminal, DatabaseIcon, APIIcon, TechStackBadges } from './TechSVG'

const EnhancedScene3D = dynamic(() => import('./EnhancedScene3D'), { ssr: false })
const TechScene3D = dynamic(() => import('./TechScene3D'), { ssr: false })
const HolographicText = dynamic(() => import('./HolographicText'), { ssr: false })
const SkillConstellation3D = dynamic(() => import('./SkillConstellation3D'), { ssr: false })
const AdvancedScene3D = dynamic(() => import('./AdvancedScene3D'), { ssr: false })

export default function Hero() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/ez-programmer-4', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ezedin-ebrahim', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ezedin@example.com', label: 'Email' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Video Background */}
      <VideoBackground
        sources={[
          { src: "https://videocdn.cdnpk.net/videos/286b4fed-5366-4d0b-9ca0-f75789232677/horizontal/previews/clear/small.mp4?token=exp=1756665097~hmac=8d39df206ce2b6c32575033bc21483eb0d8cc20dca141acaba2555f972216f25", type: "video/mp4" }
        ]}
        fallbackColor="from-cyan-500 to-fuchsia-600"
        overlay
        overlayColor="rgba(0,0,0,0.55)"
        blurAmount={2}
        videoFilters="brightness(0.75) contrast(1.1) saturate(1.05)"
        preferReducedMotion={false}
        disableOnDataSaver={false}
        meshOverlay={false}
      />
      
      {/* Advanced 3D Scenes */}
      <Suspense fallback={null}>
        <TechScene3D className="opacity-40" />
      </Suspense>
      
      <Suspense fallback={null}>
        <HolographicText className="opacity-30" />
      </Suspense>
      
      <Suspense fallback={null}>
        <AdvancedScene3D className="opacity-25" />
      </Suspense>
      
      {/* Floating Elements */}
      {/* <FloatingElements /> */}
      
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5 text-white">
        {/* <GeometricPattern /> */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center mb-8">
            
              
              <div className="flex items-center justify-center gap-8 mb-6">
                <motion.div
                  initial={{ x: -50, opacity: 0, rotateY: -90 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.1, rotateY: 15 }}
                >
                  <CodeTerminal className="w-16 h-16 sm:w-20 sm:h-20" />
                </motion.div>
                
                <motion.h1 
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-0 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl block mb-2 text-cyan-300 font-mono">
                    {'<developer>'}
                  </span>
                  Ezedin Ebrahim
                  <motion.span 
                    className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent block text-2xl sm:text-3xl lg:text-4xl font-mono mt-2"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    {'</developer>'}
                  </motion.span>
                </motion.h1>
                
                <motion.div
                  initial={{ x: 50, opacity: 0, rotateY: 90 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.1, rotateY: -15 }}
                >
                  <DatabaseIcon className="w-16 h-16 sm:w-20 sm:h-20" />
                </motion.div>
              </div>
              
              {/* Animated subtitle with typewriter effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <motion.div
                  className="text-xl sm:text-2xl text-gray-100 mb-4 font-mono"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(34, 211, 238, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 10px rgba(139, 92, 246, 0.5)',
                      '0 0 10px rgba(34, 211, 238, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Full-Stack Developer | Software Engineer
                </motion.div>
                
                {/* Tech Stack Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mb-4"
                >
                  <TechStackBadges />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl sm:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto font-mono">
              Crafting <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">scalable applications</span> and <span className="font-semibold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">robust APIs</span> with modern technologies and clean architecture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <motion.button 
              className="group relative bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 hover:from-cyan-500 hover:via-blue-500 hover:to-violet-500 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.35)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(34, 211, 238, 0.25)",
                  "0 15px 35px rgba(59, 130, 246, 0.3)",
                  "0 10px 30px rgba(139, 92, 246, 0.25)"
                ]
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Download size={22} />
              </motion.div>
              <span className="relative z-10">Download Resume</span>
            </motion.button>
            
            <motion.button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative border-2 border-white/30 text-white hover:text-cyan-300 backdrop-blur-sm px-10 py-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(34, 211, 238, 0.6)",
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Get In Touch</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 hover:border-cyan-300/60 transition-all duration-300 overflow-hidden"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20, rotateY: -90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-violet-500/30 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <link.icon size={24} className="text-white group-hover:text-cyan-300 transition-colors duration-300" />
                </motion.div>
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-300/60"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center items-center space-x-8 text-gray-200"
          >
            <motion.div 
              className="flex items-center space-x-2 font-mono"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <APIIcon className="w-6 h-6" />
              <span className="text-sm">API Design</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 font-mono"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Code size={20} />
              <span className="text-sm">Clean Architecture</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 font-mono"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Coffee size={20} />
              <span className="text-sm">DevOps Ready</span>
            </motion.div>
          </motion.div>
          
          {/* Floating Tech Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                JS
              </div>
            </motion.div>
            
            <motion.div
              className="absolute top-1/3 right-1/4"
              animate={{
                y: [0, 20, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                TS
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-1/3 left-1/6"
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                PY
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-1/4 right-1/6"
              animate={{
                y: [0, 25, 0],
                x: [0, -15, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                GO
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
