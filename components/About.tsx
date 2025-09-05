
'use client'


import { motion } from 'framer-motion'
import { Code2, Database, Globe, Smartphone, Server, Zap, User, Award, Target, Heart } from 'lucide-react'
import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import ParallaxSection from './ParallaxSection'
import { MorphingLogo, AnimatedWaveform } from './MorphingSVG'
import EnhancedSkillCard from './EnhancedSkillCard'
import PersonalStats from './PersonalStats'


const About3D = dynamic(() => import('./About3D'), { ssr: false })
const InteractiveParticles = dynamic(() => import('./InteractiveParticles'), { ssr: false })
const SkillConstellation3D = dynamic(() => import('./SkillConstellation3D'), { ssr: false })


export default function About() {
  const [activeSection, setActiveSection] = useState('overview')
  
  const skills = [
    { 
      icon: Code2, 
      name: 'Frontend Development', 
      description: 'Building responsive and interactive user interfaces', 
      level: 95,
      color: '#22d3ee',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    { 
      icon: Server, 
      name: 'Backend Development', 
      description: 'Creating robust server-side applications and APIs', 
      level: 90,
      color: '#a855f7',
      technologies: ['Node.js', 'Python', 'Express.js', 'FastAPI', 'GraphQL']
    },
    { 
      icon: Database, 
      name: 'Database Management', 
      description: 'Designing and optimizing database systems', 
      level: 85,
      color: '#f97316',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Mongoose']
    },
    { 
      icon: Globe, 
      name: 'Web Technologies', 
      description: 'Modern web standards and protocols', 
      level: 88,
      color: '#ec4899',
      technologies: ['REST APIs', 'GraphQL', 'WebSockets', 'OAuth', 'JWT']
    },
    { 
      icon: Smartphone, 
      name: 'Mobile Development', 
      description: 'Cross-platform mobile application development', 
      level: 80,
      color: '#ef4444',
      technologies: ['React Native', 'Flutter', 'Expo', 'Firebase']
    },
    { 
      icon: Zap, 
      name: 'DevOps & Tools', 
      description: 'Deployment, monitoring, and development tools', 
      level: 82,
      color: '#14b8a6',
      technologies: ['Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes', 'Nginx']
    },
  ];

  const experience = [
    {
      title: 'Senior Software Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using modern technologies.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client projects with focus on performance and UX.',
    },
    {
      title: 'Junior Developer',
      company: 'StartupXYZ',
      period: '2019 - 2020',
      description: 'Developed features for mobile and web applications in an agile environment.',
    },
  ];

  return (
    <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-violet-900/50 to-rose-900/50 overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-amber-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-rose-400/20 to-emerald-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-violet-400/15 to-rose-400/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>
      
      {/* Interactive Particles Background */}
      <Suspense fallback={null}>
        <InteractiveParticles className="opacity-30" />
      </Suspense>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-xl flex items-center justify-center shadow-xl">
              <User size={28} className="text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-cyan-400">const</span> <span className="text-amber-400">developer</span> = {'{'}
            <br />  <span className="text-violet-400">passion</span>: <span className="text-emerald-400">'Crafting innovative digital solutions'</span>,
            <br />  <span className="text-violet-400">experience</span>: <span className="text-emerald-400">'5+ years of full-stack expertise'</span>,
            <br />  <span className="text-violet-400">mission</span>: <span className="text-emerald-400">'Transforming ideas into elegant code'</span>
            <br />{'}'}
          </motion.p>
          
          {/* Section Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg">
              {['overview', 'skills', 'experience'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all capitalize ${
                    activeSection === section
                      ? 'bg-gradient-to-r from-cyan-500 to-amber-500 text-white shadow-md'
                      : 'text-gray-200 hover:text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dynamic Content Based on Active Section */}
        {activeSection === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Personal Stats */}
            <div className="mb-12">
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="text-cyan-400" size={28} />
                Professional Highlights
              </motion.h3>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                <PersonalStats />
              </div>
            </div>
            
            {/* 3D Skill Constellation */}
            <div className="mb-12">
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="text-amber-400" size={28} />
                Interactive Skill Universe
              </motion.h3>
              <Suspense fallback={<div className="h-96 bg-white/5 rounded-2xl animate-pulse border border-white/10" />}>
                <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-cyan-500/20 shadow-2xl overflow-hidden">
                  <div className="h-96 relative">
                    <SkillConstellation3D />
                  </div>
                </div>
              </Suspense>
            </div>

            {/* Traditional 3D Visualization */}
            <div className="mb-12">
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="text-violet-400" size={28} />
                Skills & Experience Overview
              </motion.h3>
              <Suspense fallback={<div className="h-96 bg-white/5 rounded-2xl animate-pulse border border-white/10" />}>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
                  <About3D skills={skills} experience={experience} />
                </div>
              </Suspense>
            </div>
          </motion.div>
        )}
        
        {activeSection === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <Code2 className="text-cyan-400" size={28} />
              Technical Expertise
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EnhancedSkillCard
                    icon={skill.icon}
                    name={skill.name}
                    description={skill.description}
                    level={skill.level}
                    color={skill.color}
                    index={index}
                    technologies={skill.technologies}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {activeSection === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <Server className="text-rose-400" size={28} />
              Professional Journey
            </motion.h3>
            <div className="max-w-4xl mx-auto">
              {experience.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Timeline line */}
                  {index < experience.length - 1 && (
                    <motion.div 
                      className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-cyan-400 to-rose-400"
                      initial={{ height: 0 }}
                      whileInView={{ height: 64 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    />
                  )}
                  
                  <div className="flex items-start gap-6">
                    {/* Timeline dot */}
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0 mt-2 shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.div 
                      className="flex-1 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl hover:border-cyan-400/30 transition-all"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-xl font-bold text-white">
                          {job.title}
                        </h4>
                        <span className="text-sm bg-gradient-to-r from-cyan-400 to-rose-400 bg-clip-text text-transparent font-semibold">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-amber-400 font-semibold mb-3">
                        {job.company}
                      </p>
                      <p className="text-gray-200 leading-relaxed">
                        {job.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Philosophy Section */}
        <ParallaxSection>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-indigo-900/20 via-violet-900/20 to-rose-900/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center overflow-hidden shadow-2xl">
              {/* Floating elements */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-300 rounded-full opacity-50"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.5, 0.9, 0.5]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className="text-3xl font-bold mb-6 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Heart className="text-rose-400" size={32} />
                  </motion.div>
                  <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
                    My Philosophy
                  </span>
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-cyan-400">// Clean code is not just about rules.</span>
                  <br /><span className="text-cyan-400">// It's about passion and precision.</span>
                  <br /><br />
                  <span className="text-violet-400">function</span> <span className="text-amber-400">createImpact</span>() {'{'}
                  <br />  <span className="text-emerald-400">return</span> {'{'}
                  <br />    <span className="text-rose-400">cleanCode</span>: <span className="text-cyan-400">true</span>,
                  <br />    <span className="text-rose-400">userExperience</span>: <span className="text-cyan-400">'exceptional'</span>,
                  <br />    <span className="text-rose-400">collaboration</span>: <span className="text-cyan-400">'essential'</span>,
                  <br />    <span className="text-rose-400">innovation</span>: <span className="text-cyan-400">'relentless'</span>
                  <br />  {'}'}
                  <br />{'}'}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </ParallaxSection>
      </div>
    </section>
  )
}
