import React from 'react'

export interface Milestone {
  percentage: number
  title: string
  description?: string
}

export interface MilestoneProgressProps {
  milestones: Milestone[]
  currentPercentage: number
}

export function MilestoneProgress({ milestones, currentPercentage }: MilestoneProgressProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.percentage - b.percentage)

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-brand-gray/50">
          <div
            className="h-full bg-gradient-to-r from-brand-accentBlue via-brand-accentOrange to-brand-accentRed transition-all duration-1000"
            style={{ width: `${Math.min(currentPercentage, 100)}%` }}
          ></div>
        </div>

        {/* Milestones */}
        <div className="relative flex justify-between">
          {sortedMilestones.map((milestone, index) => {
            const isReached = currentPercentage >= milestone.percentage
            const isCurrent = 
              currentPercentage >= milestone.percentage && 
              (index === sortedMilestones.length - 1 || currentPercentage < sortedMilestones[index + 1].percentage)

            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / sortedMilestones.length}%` }}
              >
                {/* Circle Marker */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                    isReached
                      ? 'bg-brand-accentOrange border-brand-accentOrange shadow-lg shadow-brand-accentOrange/30'
                      : 'bg-brand-gray border-brand-white/20'
                  } ${isCurrent ? 'animate-pulse scale-110' : ''}`}
                >
                  {isReached ? (
                    <span className="i-heroicons-check text-2xl text-brand-black"></span>
                  ) : (
                    <span className="text-sm font-bold text-brand-white/60">
                      {milestone.percentage}%
                    </span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-6 text-center px-2">
                  <div
                    className={`text-sm font-semibold mb-1 transition-colors ${
                      isReached ? 'text-brand-white' : 'text-brand-white/60'
                    }`}
                  >
                    {milestone.title}
                  </div>
                  {milestone.description && (
                    <div className="text-xs text-brand-white/50 max-w-[120px]">
                      {milestone.description}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

