'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Filter, Play, Eye, Search, SortAsc, SortDesc, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const Project3D = dynamic(() => import('./Project3D'), { ssr: false })
const ProjectCard3D = dynamic(() => import('./ProjectCard3D'), { ssr: false })
const ProjectDetail3D = dynamic(() => import('./ProjectDetail3D'), { ssr: false })

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'title' | 'performance'>('title')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL featuring real-time inventory management.',
      longDescription: 'A comprehensive e-commerce platform built from the ground up with modern technologies. Features include real-time inventory management, secure payment processing, advanced search and filtering, user authentication, order tracking, and an admin dashboard for managing products and orders.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'Full Stack',
      github: 'https://github.com/ezedin/ecommerce-platform',
      demo: 'https://ecommerce-demo.com',
      color: '#22c55e',
      features: [
        'Real-time inventory tracking',
        'Secure payment processing with Stripe',
        'Advanced product search and filtering',
        'User authentication and profiles',
        'Order tracking and history',
        'Admin dashboard for management',
        'Responsive design for all devices',
        'Email notifications for orders'
      ],
      techDetails: {
        frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Express.js', 'JWT Authentication', 'Bcrypt'],
        database: ['PostgreSQL', 'Prisma ORM', 'Redis Cache'],
        deployment: ['Docker', 'AWS EC2', 'Nginx', 'PM2']
      },
      metrics: {
        performance: 95,
        security: 92,
        scalability: 88,
        maintainability: 90
      },
      timeline: '4 months',
      teamSize: '3 developers',
      challenges: [
        'Implementing real-time inventory updates across multiple users',
        'Handling high-traffic during sales events',
        'Ensuring secure payment processing and data protection'
      ],
      solutions: [
        'Used WebSocket connections and Redis pub/sub for real-time updates',
        'Implemented horizontal scaling with load balancers and caching strategies',
        'Integrated Stripe for PCI-compliant payments and implemented comprehensive security measures'
      ]
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, built with Next.js and Socket.io.',
      longDescription: 'A modern task management application designed for team collaboration. Features real-time updates, drag-and-drop functionality, project boards, team member assignments, deadline tracking, and comprehensive reporting. Built with performance and user experience as top priorities.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      tags: ['Next.js', 'Socket.io', 'MongoDB', 'TypeScript'],
      category: 'Frontend',
      github: 'https://github.com/ezedin/task-manager',
      demo: 'https://taskmanager-demo.com',
      color: '#06b6d4',
      features: [
        'Real-time collaborative editing',
        'Drag-and-drop task management',
        'Project boards and workflows',
        'Team member assignments',
        'Deadline tracking and notifications',
        'Time tracking and reporting',
        'File attachments and comments',
        'Mobile-responsive design'
      ],
      techDetails: {
        frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Socket.io', 'Express.js', 'JWT'],
        database: ['MongoDB', 'Mongoose', 'Redis'],
        deployment: ['Vercel', 'MongoDB Atlas', 'CloudFlare']
      },
      metrics: {
        performance: 93,
        security: 89,
        scalability: 91,
        maintainability: 94
      },
      timeline: '3 months',
      teamSize: '2 developers',
      challenges: [
        'Implementing real-time collaboration without conflicts',
        'Optimizing performance with large datasets',
        'Creating intuitive drag-and-drop interfaces'
      ],
      solutions: [
        'Used operational transformation algorithms for conflict resolution',
        'Implemented virtual scrolling and pagination for large lists',
        'Built custom drag-and-drop components with smooth animations'
      ]
    },
    {
      title: 'Weather Analytics API',
      description: 'RESTful API for weather data analytics with caching, rate limiting, and comprehensive documentation.',
      longDescription: 'A high-performance weather analytics API built with Python and FastAPI. Provides real-time weather data, historical analytics, forecasting capabilities, and comprehensive data visualization endpoints. Features advanced caching, rate limiting, and automatic API documentation.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop',
      tags: ['Python', 'FastAPI', 'Redis', 'Docker'],
      category: 'Backend',
      github: 'https://github.com/ezedin/weather-api',
      demo: 'https://weather-api-docs.com',
      color: '#f59e0b',
      features: [
        'Real-time weather data endpoints',
        'Historical weather analytics',
        'Weather forecasting algorithms',
        'Data visualization endpoints',
        'Advanced caching with Redis',
        'Rate limiting and throttling',
        'Automatic API documentation',
        'Comprehensive error handling'
      ],
      techDetails: {
        frontend: ['Swagger UI', 'ReDoc', 'HTML/CSS'],
        backend: ['Python 3.11', 'FastAPI', 'Pydantic', 'SQLAlchemy'],
        database: ['PostgreSQL', 'Redis', 'TimescaleDB'],
        deployment: ['Docker', 'Kubernetes', 'AWS EKS', 'Prometheus']
      },
      metrics: {
        performance: 97,
        security: 94,
        scalability: 96,
        maintainability: 92
      },
      timeline: '2 months',
      teamSize: '1 developer',
      challenges: [
        'Handling large volumes of weather data efficiently',
        'Implementing accurate forecasting algorithms',
        'Ensuring high availability and low latency'
      ],
      solutions: [
        'Used TimescaleDB for efficient time-series data storage',
        'Implemented machine learning models for weather prediction',
        'Set up distributed caching and load balancing'
      ]
    },
    {
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for fitness tracking with workout plans and progress visualization.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
      tags: ['React Native', 'Firebase', 'Charts.js'],
      category: 'Mobile',
      github: 'https://github.com/ezedin/fitness-tracker',
      demo: 'https://fitness-app-demo.com',
      color: '#ef4444',
      longDescription: 'A comprehensive fitness tracking mobile application built with React Native. Features workout planning, progress tracking, social features, nutrition logging, and AI-powered recommendations. Designed with a focus on user engagement and motivation.',
      features: [
        'Workout planning and tracking',
        'Progress visualization and analytics',
        'Social features and challenges',
        'Nutrition logging and analysis',
        'AI-powered workout recommendations',
        'Wearable device integration',
        'Offline mode support',
        'Push notifications and reminders'
      ],
      techDetails: {
        frontend: ['React Native', 'TypeScript', 'React Navigation', 'React Native Reanimated'],
        backend: ['Firebase Functions', 'Node.js', 'Express.js'],
        database: ['Firebase Firestore', 'Firebase Storage'],
        deployment: ['App Store', 'Google Play', 'Firebase Hosting']
      },
      metrics: {
        performance: 91,
        security: 87,
        scalability: 89,
        maintainability: 88
      },
      timeline: '5 months',
      teamSize: '2 developers',
      challenges: [
        'Creating smooth animations on mobile devices',
        'Integrating with various fitness wearables',
        'Handling offline data synchronization'
      ],
      solutions: [
        'Used React Native Reanimated for 60fps animations',
        'Built universal adapters for different wearable APIs',
        'Implemented robust offline-first architecture with sync queues'
      ]
    },
    {
      title: 'AI Content Generator',
      description: 'Web application that generates content using AI, with user authentication and subscription management.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      tags: ['React', 'OpenAI', 'Stripe', 'Auth0'],
      category: 'Full Stack',
      github: 'https://github.com/ezedin/ai-content-generator',
      demo: 'https://ai-content-demo.com',
      color: '#8b5cf6',
      longDescription: 'An AI-powered content generation platform that helps users create high-quality written content. Features multiple AI models, content templates, collaboration tools, and subscription management. Built with scalability and user experience in mind.',
      features: [
        'Multiple AI model integration',
        'Content templates and workflows',
        'Real-time collaboration tools',
        'Version control and history',
        'Subscription and billing management',
        'Content optimization suggestions',
        'Export to multiple formats',
        'Team workspace management'
      ],
      techDetails: {
        frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand'],
        backend: ['Node.js', 'Express.js', 'OpenAI API', 'Stripe API'],
        database: ['MongoDB', 'Redis', 'AWS S3'],
        deployment: ['AWS EC2', 'Docker', 'Nginx', 'CloudFlare']
      },
      metrics: {
        performance: 89,
        security: 95,
        scalability: 92,
        maintainability: 91
      },
      timeline: '6 months',
      teamSize: '4 developers',
      challenges: [
        'Managing AI API costs and rate limits',
        'Implementing secure user authentication',
        'Creating intuitive content editing interfaces'
      ],
      solutions: [
        'Built intelligent caching and request optimization',
        'Integrated Auth0 for enterprise-grade security',
        'Developed custom rich text editor with AI integration'
      ]
    },
    {
      title: 'DevOps Dashboard',
      description: 'Monitoring dashboard for DevOps teams with real-time metrics and alerting system.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      tags: ['Vue.js', 'Docker', 'Prometheus', 'Grafana'],
      category: 'Frontend',
      github: 'https://github.com/ezedin/devops-dashboard',
      demo: 'https://devops-demo.com',
      color: '#10b981',
      longDescription: 'A comprehensive DevOps monitoring dashboard designed for development teams. Provides real-time metrics, alerting, deployment tracking, and performance analytics. Built with modern web technologies and designed for scalability.',
      features: [
        'Real-time system metrics monitoring',
        'Custom alerting and notifications',
        'Deployment tracking and rollback',
        'Performance analytics and insights',
        'Team collaboration tools',
        'Custom dashboard creation',
        'Integration with popular DevOps tools',
        'Mobile-responsive design'
      ],
      techDetails: {
        frontend: ['Vue.js 3', 'TypeScript', 'Vuetify', 'Chart.js'],
        backend: ['Node.js', 'Express.js', 'WebSocket', 'Bull Queue'],
        database: ['InfluxDB', 'Redis', 'PostgreSQL'],
        deployment: ['Docker Swarm', 'Traefik', 'Prometheus', 'Grafana']
      },
      metrics: {
        performance: 94,
        security: 91,
        scalability: 95,
        maintainability: 89
      },
      timeline: '4 months',
      teamSize: '3 developers',
      challenges: [
        'Processing and visualizing large amounts of metrics data',
        'Creating responsive and interactive dashboards',
        'Implementing reliable alerting systems'
      ],
      solutions: [
        'Optimized time-series data ingestion and querying with InfluxDB',
        'Built responsive, virtualized charts for high data density',
        'Implemented threshold-based alerting with webhooks and Slack integration'
      ]
    }
  ]

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile']

// Compute category counts (respects current search filter for better UX)
const categoryCounts = useMemo(() => {
  const base = projects.filter(p => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    const hay = [
      p.title,
      p.description,
      p.longDescription ?? '',
      ...(p.tags ?? []),
      p.category,
    ].join(' ').toLowerCase()
    return hay.includes(q)
  })
  const counts: Record<string, number> = { All: base.length }
  for (const cat of categories.filter(c => c !== 'All')) counts[cat] = 0
  base.forEach(p => { counts[p.category] = (counts[p.category] ?? 0) + 1 })
  return counts
}, [projects, searchQuery])

const filteredProjects = useMemo(() => {
  const q = searchQuery.toLowerCase().trim()
  let base = projects.filter(p => (activeFilter === 'All' ? true : p.category === activeFilter))
  if (q) {
    base = base.filter(p => {
      const hay = [
        p.title,
        p.description,
        p.longDescription ?? '',
        ...(p.tags ?? []),
        p.category,
      ].join(' ').toLowerCase()
      return hay.includes(q)
    })
  }
  base.sort((a, b) => {
    let comp = 0
    if (sortBy === 'title') {
      comp = a.title.localeCompare(b.title)
    } else if (sortBy === 'performance') {
      const av = a.metrics?.performance ?? 0
      const bv = b.metrics?.performance ?? 0
      comp = av - bv
    }
    return sortDir === 'asc' ? comp : -comp
  })
  return base
}, [projects, activeFilter, searchQuery, sortBy, sortDir])

const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
const pageProjects = useMemo(() => {
  const start = (currentPage - 1) * pageSize
  return filteredProjects.slice(start, start + pageSize)
}, [filteredProjects, currentPage])

return (
  <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* 3D Hero Header */}
      <div className="relative mb-16">
        <div className="h-64 sm:h-80 rounded-3xl overflow-hidden border border-white/10 bg-black/20">
          <Suspense fallback={<div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />}> 
            <Project3D
              title="Project Gallery"
              description="A 3D showcase header for featured projects"
              tags={["3D", "React", "Three.js"]}
              color="#6366f1"
              isActive={true}
            />
          </Suspense>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow mb-3">Featured Projects</h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl">
            Explore an interactive gallery of my work. Filter, search, and sort to find what interests you.
          </p>
        </motion.div>
      </div>

      {/* Controls: Filter, Search, Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => { setActiveFilter(category); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 border ${
                activeFilter === category
                  ? 'bg-primary-600 text-white border-primary-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border-gray-300/40 dark:border-gray-700'
              }`}
              title={`${categoryCounts[category] ?? 0} projects`}
            >
              <span>{category}</span>
              <span className="ml-2 inline-flex items-center justify-center rounded-full text-xs px-2 py-0.5 bg-black/10 dark:bg-gray-700">
                {categoryCounts[category] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-1 md:flex-initial items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              placeholder="Search projects..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300/40 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'title' | 'performance')}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300/40 dark:border-gray-700"
              title="Sort by"
            >
              <option value="title">Title</option>
              <option value="performance">Performance</option>
            </select>
            <button
              onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300/40 dark:border-gray-700"
              title={sortDir === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortDir === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Integrated Project Showcase */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pageProjects.map((project, index) => (
          <Suspense key={project.title} fallback={<div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />}>
            <motion.div
              className="relative group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <ProjectCard3D
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                category={project.category}
                github={project.github}
                demo={project.demo}
                color={project.color}
                index={index}
              />

              {/* Enhanced overlay with detail button */}
              <motion.div
                className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-medium flex items-center gap-2 hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedProject(project)
                  }}
                >
                  <Eye size={20} />
                  View Details
                </motion.button>
              </motion.div>
            </motion.div>
          </Suspense>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-300/40 dark:border-gray-700 disabled:opacity-40"
          title="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-300/40 dark:border-gray-700 disabled:opacity-40"
          title="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Project Detail Modal */}
      <Suspense fallback={null}>
        <ProjectDetail3D
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </Suspense>
    </div>
  </section>
)

}
