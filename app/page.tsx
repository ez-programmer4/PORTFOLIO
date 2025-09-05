import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="relative min-h-screen tech-bg">
      <div className="grid-overlay" />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}
