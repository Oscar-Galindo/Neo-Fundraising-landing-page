import React from 'react'

export interface FundraiserStatsProps {
  goalAmount: number
  currentAmount: number
  donorCount?: number
  endDate?: string
}

export function FundraiserStats({ 
  goalAmount, 
  currentAmount, 
  donorCount = 0,
  endDate 
}: FundraiserStatsProps) {
  const percentageReached = Math.min((currentAmount / goalAmount) * 100, 100)
  const daysLeft = endDate ? Math.max(0, Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-3">
          <div>
            <span className="text-4xl md:text-5xl font-bold text-brand-white">
              {formatCurrency(currentAmount)}
            </span>
            <span className="text-brand-white/60 text-xl ml-2">
              raised of {formatCurrency(goalAmount)}
            </span>
          </div>
          <span className="text-2xl font-semibold text-brand-accentOrange">
            {Math.round(percentageReached)}%
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-4 bg-brand-gray rounded-full overflow-hidden border border-brand-white/10">
          <div
            className="h-full bg-gradient-to-r from-brand-accentBlue via-brand-accentOrange to-brand-accentRed transition-all duration-1000 ease-out relative"
            style={{ width: `${percentageReached}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-brand-gray/50 backdrop-blur-sm rounded-xl p-6 border border-brand-white/10 text-center">
          <div className="text-3xl font-bold text-brand-accentBlue mb-1">
            {formatCurrency(currentAmount)}
          </div>
          <div className="text-sm text-brand-white/70">Raised</div>
        </div>

        <div className="bg-brand-gray/50 backdrop-blur-sm rounded-xl p-6 border border-brand-white/10 text-center">
          <div className="text-3xl font-bold text-brand-accentOrange mb-1">
            {donorCount}
          </div>
          <div className="text-sm text-brand-white/70">
            {donorCount === 1 ? 'Donor' : 'Donors'}
          </div>
        </div>

        {daysLeft !== null && (
          <div className="bg-brand-gray/50 backdrop-blur-sm rounded-xl p-6 border border-brand-white/10 text-center col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-brand-accentRed mb-1">
              {daysLeft}
            </div>
            <div className="text-sm text-brand-white/70">
              {daysLeft === 1 ? 'Day Left' : 'Days Left'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

