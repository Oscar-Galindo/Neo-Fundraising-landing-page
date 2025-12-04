import React, { useState, useEffect } from 'react'

export interface VideoModalProps {
  videoUrl?: string
  videoFile?: string
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function VideoModal({ videoUrl, videoFile, isOpen, onClose, title }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Check if it's an uploaded video file
  const isUploadedVideo = !!videoFile

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    
    // Handle youtu.be links
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    
    // Handle youtube.com/watch links
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    
    // Handle Instagram
    if (url.includes('instagram.com')) {
      return url.replace('/reel/', '/embed/reel/')
    }
    
    return url
  }

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center"
        >
          <span className="i-heroicons-x-mark w-5 h-5"></span>
        </button>

        {/* Video Title */}
        {title && (
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white text-sm font-medium">{title}</span>
          </div>
        )}

        {/* Video Player */}
        {isUploadedVideo ? (
          // HTML5 Video Player for uploaded files
          <video
            src={videoFile}
            className="w-full h-full bg-black"
            controls
            autoPlay
            playsInline
          >
            Your browser doesn't support video playback.
          </video>
        ) : (
          // iframe for YouTube/Instagram
          <iframe
            src={embedUrl || ''}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  )
}

export function VideoSlider({ highlights }: { highlights: any[] }) {
  const [activeVideo, setActiveVideo] = useState<{ url?: string; file?: string; title: string } | null>(null)

  return (
    <>
      <div className="flex overflow-x-auto gap-3 sm:gap-4 snap-x snap-mandatory no-scrollbar pb-6 pr-12">
        {highlights.map((highlight: any, index: number) => {
          const hasExternalVideo = highlight.videoUrl && highlight.videoUrl !== '#'
          const hasUploadedVideo = highlight.videoFile
          const hasAnyVideo = hasExternalVideo || hasUploadedVideo
          
          return (
            <div
              key={index}
              onClick={() => {
                if (hasAnyVideo) {
                  setActiveVideo({ 
                    url: highlight.videoUrl, 
                    file: highlight.videoFile,
                    title: highlight.title 
                  })
                }
              }}
              className="relative flex-none w-[160px] sm:w-[200px] aspect-[9/16] rounded-xl bg-slate-900 border border-white/10 shadow-lg overflow-hidden snap-center group cursor-pointer hover:border-white/20 transition-all duration-300"
            >
              <img 
                src={highlight.thumbnail || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600'} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                alt={highlight.category}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="i-heroicons-play text-white w-4 h-4"></span>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 block">{highlight.category}</span>
                <p className="text-xs text-white font-medium leading-tight line-clamp-2">{highlight.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo.url}
          videoFile={activeVideo.file}
          title={activeVideo.title}
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}

