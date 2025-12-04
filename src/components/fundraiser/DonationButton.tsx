import React from 'react'

export interface DonationButtonProps {
  url: string
  text?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

export function DonationButton({ 
  url, 
  text = 'Donate Now',
  variant = 'primary',
  className = ''
}: DonationButtonProps) {
  const baseClasses = 'luxury-btn inline-flex items-center gap-2 group'
  const variantClasses = variant === 'primary' 
    ? 'luxury-btn-accent hover:scale-105 transform transition-transform'
    : 'luxury-btn-secondary'

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <span className="i-heroicons-heart text-xl"></span>
      {text}
      <span className="i-heroicons-arrow-right text-lg group-hover:translate-x-1 transition-transform"></span>
    </a>
  )
}

