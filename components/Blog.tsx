'use client'

import React, { useState, useMemo, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SortAsc, SortDesc, Calendar, Clock, User, Tag, ArrowRight, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Blog3D = dynamic(() => import('./Blog3D'), { ssr: false })

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

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for building large-scale React applications that can grow with your team and requirements.',
      content: `# Building Scalable React Applications\n\nBuilding scalable React applications is crucial for long-term success...`,
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      slug: 'building-scalable-react-applications',
      author: 'Ezedin',
      tags: ['React', 'Architecture', 'Best Practices', 'Scalability'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies that are shaping the future of web development in 2024 and beyond.',
      content: `# The Future of Web Development\n\nThe web development landscape is evolving rapidly...`,
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Web Development',
      slug: 'future-of-web-development',
      author: 'Ezedin',
      tags: ['Trends', 'Future', 'Technology', 'Innovation'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'TypeScript Best Practices',
      excerpt: 'A comprehensive guide to writing better TypeScript code with practical examples and real-world scenarios.',
      content: `# TypeScript Best Practices\n\nA comprehensive guide to writing better TypeScript code...`,
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'TypeScript',
      slug: 'typescript-best-practices',
      author: 'Ezedin',
      tags: ['TypeScript', 'Best Practices', 'JavaScript', 'Types'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Optimizing Next.js Performance',
      excerpt: 'Tips and techniques for improving the performance of your Next.js applications for better user experience.',
      content: `# Optimizing Next.js Performance\n\nTips and techniques for improving performance...`,
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'Next.js',
      slug: 'optimizing-nextjs-performance',
      author: 'Ezedin',
      tags: ['Next.js', 'Performance', 'Optimization', 'React'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Modern CSS Techniques',
      excerpt: 'Discover the latest CSS features and techniques that will revolutionize your styling workflow.',
      content: `# Modern CSS Techniques\n\nDiscover the latest CSS features and techniques...`,
      date: '2023-12-20',
      readTime: '5 min read',
      category: 'CSS',
      slug: 'modern-css-techniques',
      author: 'Ezedin',
      tags: ['CSS', 'Styling', 'Modern', 'Techniques'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'API Design Principles',
      excerpt: 'Essential principles for designing robust and developer-friendly APIs that scale.',
      content: `# API Design Principles\n\nEssential principles for designing robust APIs...`,
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Backend',
      slug: 'api-design-principles',
      author: 'Ezedin',
      tags: ['API', 'Backend', 'Design', 'REST'],
      featured: true,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'JavaScript Performance Tips',
      excerpt: 'Practical tips for optimizing JavaScript performance in modern web applications.',
      content: `# JavaScript Performance Tips\n\nPractical tips for optimizing JavaScript performance...`,
      date: '2023-12-10',
      readTime: '6 min read',
      category: 'JavaScript',
      slug: 'javascript-performance-tips',
      author: 'Ezedin',
      tags: ['JavaScript', 'Performance', 'Optimization', 'Tips'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Docker for Developers',
      excerpt: 'A practical guide to using Docker in your development workflow for better consistency and deployment.',
      content: `# Docker for Developers\n\nA practical guide to using Docker in development...`,
      date: '2023-12-05',
      readTime: '12 min read',
      category: 'DevOps',
      slug: 'docker-for-developers',
      author: 'Ezedin',
      tags: ['Docker', 'DevOps', 'Containers', 'Development'],
      featured: false,
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=500&h=300&fit=crop'
    }
  ]

  const categories = ['All', 'React', 'Web Development', 'TypeScript', 'Next.js', 'CSS', 'Backend', 'JavaScript', 'DevOps']

  // Compute category counts (respects current search filter)
  const categoryCounts = useMemo(() => {
    const base = blogPosts.filter(post => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      const searchText = [
        post.title,
        post.excerpt,
        post.content,
        post.author,
        ...post.tags,
        post.category
      ].join(' ').toLowerCase()
      return searchText.includes(q)
    })
    
    const counts: Record<string, number> = { All: base.length }
    for (const cat of categories.filter(c => c !== 'All')) {
      counts[cat] = base.filter(post => post.category === cat).length
    }
    return counts
  }, [blogPosts, searchQuery])

  // Filter, search, and sort posts
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    let base = blogPosts.filter(post => 
      activeFilter === 'All' ? true : post.category === activeFilter
    )
    
    if (q) {
      base = base.filter(post => {
        const searchText = [
          post.title,
          post.excerpt,
          post.content,
          post.author,
          ...post.tags,
          post.category
        ].join(' ').toLowerCase()
        return searchText.includes(q)
      })
    }
    
    base.sort((a, b) => {
      let comp = 0
      if (sortBy === 'title') {
        comp = a.title.localeCompare(b.title)
      } else if (sortBy === 'date') {
        comp = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === 'readTime') {
        const aTime = parseInt(a.readTime.split(' ')[0])
        const bTime = parseInt(b.readTime.split(' ')[0])
        comp = aTime - bTime
      }
      return sortDir === 'asc' ? comp : -comp
    })
    
    return base
  }, [blogPosts, activeFilter, searchQuery, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))
  const pagePosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPosts.slice(start, start + pageSize)
  }, [filteredPosts, currentPage])

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={<div />}>
          <Blog3D 
            title="Blog"
            description="Insights & Tutorials"
            tags={['React', 'Next.js', 'TypeScript']}
            color="#8B5CF6"
            isActive={true}
          />
        </Suspense>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-12 border border-white/20 dark:border-gray-700/30">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Blog & Insights
            </h2>
            <p className="text-lg text-gray-200 dark:text-gray-300 max-w-3xl mx-auto">
              Thoughts, tutorials, and insights about software development, technology trends, and my journey as a developer.
            </p>
          </div>
        </div>

        {/* Controls: Filter, Search, Sort */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
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
                title={`${categoryCounts[category] ?? 0} posts`}
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
                placeholder="Search posts..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300/40 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'readTime')}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300/40 dark:border-gray-700"
                title="Sort by"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="readTime">Read Time</option>
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
        </div>

        {/* Featured Posts Section */}
        {activeFilter === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.filter(post => post.featured).slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                      >
                        Read more <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pagePosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative h-96 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ y: -5 }}
            >
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    post.featured 
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700'
                      : 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                  }`}>
                    {post.featured ? '⭐ Featured' : post.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors group-hover:translate-x-1 transform duration-200"
                  >
                    Read <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300/40 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300 px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300/40 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center border border-primary-200/30 dark:border-primary-700/30"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Subscribe to get notified about new blog posts, tutorials, and development insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Blog Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{blogPosts.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Posts</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {Math.round(blogPosts.reduce((acc, post) => acc + parseInt(post.readTime.split(' ')[0]), 0) / blogPosts.length)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Read Time</div>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {blogPosts.filter(post => post.featured).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
