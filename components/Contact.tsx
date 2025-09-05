'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Clock, Calendar, Users, Award } from 'lucide-react'
import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const ContactBackground3D = dynamic(() => import('./ContactBackground3D'), { ssr: false })

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [status, setStatus] = useState<
    { loading: boolean; success: boolean; error: string | null }
  >({ loading: false, success: false, error: null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    const next: { [k: string]: string } = {}
    if (!formData.name.trim()) next.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Valid email is required'
    if (!formData.subject.trim()) next.subject = 'Subject is required'
    if (formData.message.trim().length < 10) next.message = 'Message should be at least 10 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ loading: false, success: false, error: null })
    if (!validate()) return
    try {
      setStatus({ loading: true, success: false, error: null })
      // TODO: integrate with an email API (Resend, Formspree, EmailJS, custom route)
      await new Promise((res) => setTimeout(res, 1200))
      setStatus({ loading: false, success: true, error: null })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (err: any) {
      setStatus({ loading: false, success: false, error: 'Something went wrong. Please try again.' })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'ezedin.ebrahim@example.com',
      href: 'mailto:ezedin.ebrahim@example.com',
      description: 'Primary contact for business inquiries'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      description: 'Available Mon-Fri, 9AM-6PM PST'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      href: '#',
      description: 'Available for remote & on-site work'
    },
  ]

  const professionalStats = [
    { icon: Users, label: 'Clients Served', value: '50+' },
    { icon: Award, label: 'Projects Completed', value: '100+' },
    { icon: Clock, label: 'Response Time', value: '< 24h' },
    { icon: Calendar, label: 'Years Experience', value: '5+' },
  ]

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-amber-900/20 to-orange-900/20 overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ContactBackground3D className="opacity-30" />
      </Suspense>
      
      {/* Enhanced ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-rose-500/15 to-amber-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/8 to-rose-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4.5s' }} />
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl flex items-center justify-center">
              <Mail size={24} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
          </motion.div>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8">
            Ready to bring your vision to life? I specialize in creating scalable, high-performance applications 
            that drive business results. Let's discuss how we can collaborate on your next project.
          </p>
          
          {/* Professional Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {professionalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 backdrop-blur-sm border border-white/10 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Contact Information
            </h3>
            <p className="text-gray-400 mb-8">
              Choose your preferred method of communication
            </p>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-white/10"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <info.icon className="w-6 h-6 text-orange-300" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">
                      {info.title}
                    </h4>
                    <a
                      href={info.href}
                      className="text-orange-300 hover:text-orange-200 transition-colors duration-200 font-medium"
                    >
                      {info.value}
                    </a>
                    <p className="text-sm text-gray-400 mt-1">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Services Offered
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Full-Stack Web Development',
                    'Mobile App Development',
                    'Technical Architecture Consulting',
                    'Code Review & Optimization',
                    'Team Leadership & Mentoring'
                  ].map((service, idx) => (
                    <motion.div
                      key={service}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full" />
                      <span className="text-gray-300">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose-400" />
                  Office Hours
                </h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-amber-300">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-gray-400">By appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-gray-400">Closed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Status banners */}
            {status.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-200"
              >
                <CheckCircle2 size={20} /> Message sent successfully!
              </motion.div>
            )}
            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-3 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-rose-200"
              >
                <AlertCircle size={20} /> {status.error}
              </motion.div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-gray-400">
                Fill out the form below and I'll get back to you within 24 hours
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="relative p-8 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-rose-900/10 backdrop-blur-md overflow-hidden shadow-xl">
              {/* Enhanced glow border */}
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/30 to-rose-500/10 blur-2xl" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-500/5 to-transparent" />
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border ${errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-amber-300/30 dark:border-amber-600/30 focus:ring-amber-500'} focus:ring-2 focus:border-transparent text-gray-900 dark:text-white shadow-sm`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-rose-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border ${errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-amber-300/30 dark:border-amber-600/30 focus:ring-amber-500'} focus:ring-2 focus:border-transparent text-gray-900 dark:text-white shadow-sm`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-rose-400">{errors.email}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Type *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border ${errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-amber-300/30 dark:border-amber-600/30 focus:ring-amber-500'} focus:ring-2 focus:border-transparent text-gray-900 dark:text-white shadow-sm`}
                />
                {errors.subject && <p className="mt-1 text-sm text-rose-400">{errors.subject}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder="Please describe your project requirements, timeline, and budget range..."
                  className={`w-full px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border ${errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-amber-300/30 dark:border-amber-600/30 focus:ring-amber-500'} focus:ring-2 focus:border-transparent text-gray-900 dark:text-white resize-none shadow-sm`}
                />
                {errors.message && <p className="mt-1 text-sm text-rose-400">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status.loading}
                whileHover={{ scale: status.loading ? 1 : 1.02 }}
                whileTap={{ scale: status.loading ? 1 : 0.98 }}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 px-6 py-4 font-semibold text-white shadow-xl transition-all hover:from-amber-500 hover:to-rose-500 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status.loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={20} />}
                  {status.loading ? 'Sending...' : 'Send Message'}
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: status.loading ? '0%' : '-100%' }}
                  transition={{ duration: 0.8, repeat: status.loading ? Infinity : 0, ease: 'linear' }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
