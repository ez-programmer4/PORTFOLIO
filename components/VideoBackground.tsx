'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface VideoBackgroundProps {
  src?: string
  fallbackColor?: string
  overlay?: boolean
  className?: string
  overlayOpacity?: number
  blurAmount?: number
  overlayColor?: string
  videoFilters?: string
  poster?: string
  preferReducedMotion?: boolean
  disableOnDataSaver?: boolean
  sources?: { src: string; type: string }[]
  meshOverlay?: boolean
}

export default function VideoBackground({ 
  src = "https://videocdn.cdnpk.net/videos/286b4fed-5366-4d0b-9ca0-f75789232677/horizontal/previews/clear/small.mp4?token=exp=1756665097~hmac=8d39df206ce2b6c32575033bc21483eb0d8cc20dca141acaba2555f972216f25", 
  fallbackColor = "from-cyan-500 to-fuchsia-600",
  overlay = true,
  className = "",
  overlayOpacity = 0.2,
  blurAmount = 2,
  overlayColor,
  videoFilters,
  poster,
  preferReducedMotion = true,
  disableOnDataSaver = true,
  sources,
  meshOverlay = false
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldDisableVideo, setShouldDisableVideo] = useState(false)

  // Determine if provided source(s) look playable
  const isPlayable = Array.isArray(sources) ? sources.length > 0 : (
    typeof src === 'string' && (
      /(\.mp4|\.webm|\.ogg)(\?.*)?$/i.test(src) || /^https?:\/\//i.test(src)
    )
  )

  // Respect reduced motion and Data Saver settings
  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as any)?.connection?.saveData === true
    if ((preferReducedMotion && mq?.matches) || (disableOnDataSaver && saveData)) {
      setShouldDisableVideo(true)
    }
  }, [preferReducedMotion, disableOnDataSaver])

  // Pause video when tab is hidden to save CPU/GPU
  useEffect(() => {
    const onVisibility = () => {
      const v = videoRef.current
      if (!v) return
      if (document.hidden) {
        try { v.pause() } catch {}
      } else if (isLoaded && !hasError) {
        try { v.play() } catch {}
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [isLoaded, hasError])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fallback gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColor}`} />
      
      {/* Video background */}
      {!hasError && !shouldDisableVideo && isPlayable && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={videoFilters ? { filter: videoFilters } : undefined}
          crossOrigin="anonymous"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          aria-hidden
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          {Array.isArray(sources) && sources.length > 0 ? (
            sources.map((s, i) => (
              <source key={i} src={s.src} type={s.type} />
            ))
          ) : (
            <source src={src} type="video/mp4" />
          )}
        </motion.video>
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor ?? `rgba(0,0,0,${overlayOpacity})`,
            backdropFilter: `blur(${blurAmount}px)`
          }}
        />
      )}

      {/* Animated mesh gradient overlay */}
      {meshOverlay && !preferReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.30) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.30) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.20) 0%, transparent 50%)
            `
          }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.30) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.30) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.20) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.30) 0%, transparent 50%),
               radial-gradient(circle at 20% 20%, rgba(217, 70, 239, 0.30) 0%, transparent 50%),
               radial-gradient(circle at 60% 60%, rgba(16, 185, 129, 0.20) 0%, transparent 50%)`,
              `radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.30) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.30) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.20) 0%, transparent 50%)`
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  )
}
