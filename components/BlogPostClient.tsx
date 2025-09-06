"use client"

import { Calendar, Clock, ArrowLeft, Tag, User, Share2, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export interface BlogPost {
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
  likes?: number
  comments?: number
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-purple-400 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </div>

        <article className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30">
          {/* Hero Image */}
          {post.image && (
            <div className="h-64 sm:h-80 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <div className="p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm font-bold border border-purple-400/30 backdrop-blur-sm">
                {post.category}
              </span>
              <div className="flex items-center space-x-4 text-sm text-cyan-300">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} className="text-blue-400" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} className="text-green-400" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm rounded-full border border-blue-400/30 backdrop-blur-sm"
                >
                  <Tag size={12} className="text-purple-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author & Actions */}
            <div className="flex items-center justify-between mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">{post.author}</p>
                  <p className="text-sm text-gray-300">Software Engineer</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg transition-all duration-300 border border-blue-400/30">
                  <Share2 size={20} className="text-blue-400" />
                </button>
                <button className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-lg transition-all duration-300 border border-purple-400/30">
                  <Bookmark size={20} className="text-purple-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 sm:px-12 pb-8">
            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <div 
                className="text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\n/g, '<br>')
                    .replace(/#{1,6}\s/g, '<strong class="text-cyan-400">')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-400">$1</strong>')
                }} 
              />
            </div>

            {/* Post Footer */}
            <footer className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 rounded-lg text-sm font-medium transition-all duration-300 border border-green-400/30 text-green-300">
                    <ThumbsUp size={16} />
                    <span>{post.likes || 0}</span>
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-400/30 text-blue-300">
                    <MessageCircle size={16} />
                    <span>{post.comments || 0} Comments</span>
                  </button>
                </div>
                
                <div className="text-sm text-purple-300">
                  Published on {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">Related Posts</h3>
          <div className="text-center py-8 text-gray-300 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            More related posts coming soon...
          </div>
        </div>
      </div>
    </div>
  )
}
