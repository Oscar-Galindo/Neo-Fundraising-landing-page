import React, { useState } from 'react'

interface TimelineItem {
  phase: string
  title: string
  tasks: string[]
}

export function MilestoneTimeline() {
  const [activeTab, setActiveTab] = useState(0)

  const milestones: TimelineItem[] = [
    {
      phase: 'Day 0 to 30',
      title: 'Foundation & Discovery',
      tasks: ['Audience map', 'Brand safety on', 'Baseline KPIs'],
    },
    {
      phase: 'Day 31 to 60',
      title: 'Testing & Optimization',
      tasks: ['Creative and segment tests', 'Bid tactics', 'Frequency tuning'],
    },
    {
      phase: 'Day 61 to 90',
      title: 'Scale & Systemize',
      tasks: ['Scale winners', 'Refine geo device daypart', 'Quarterly playbook'],
    },
  ]

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'milestone_tab_click', {
        event_category: 'engagement',
        event_label: milestones[index].phase,
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      handleTabChange(index - 1)
    } else if (e.key === 'ArrowRight' && index < milestones.length - 1) {
      handleTabChange(index + 1)
    }
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div
        role="tablist"
        aria-label="Milestone phases"
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        {milestones.map((milestone, index) => (
          <button
            key={index}
            role="tab"
            id={`tab-${index}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            onClick={() => handleTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              relative flex-1 p-6 rounded-2xl border-2 transition-all duration-300
              min-h-[44px] text-left
              ${
                activeTab === index
                  ? 'bg-brand-accentBlue/10 border-brand-accentBlue/50'
                  : 'bg-brand-gray/30 border-brand-white/10 hover:border-brand-white/20'
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="luxury-caption text-brand-accentBlue">
                {milestone.phase}
              </span>
              <span
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${
                    activeTab === index
                      ? 'bg-brand-accentBlue text-brand-black'
                      : 'bg-brand-white/10 text-brand-white/60'
                  }
                `}
              >
                {index + 1}
              </span>
            </div>
            <h3 className="text-lg font-light text-brand-white">
              {milestone.title}
            </h3>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="luxury-card">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`panel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
            className={activeTab === index ? 'block' : 'hidden'}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h4 className="luxury-h3 mb-6">{milestone.title}</h4>
                <p className="luxury-body mb-8">
                  {index === 0 &&
                    'We establish your performance baseline, map your true addressable audience, and implement enterprise-grade brand safety from day one.'}
                  {index === 1 &&
                    'We test creative variations, audience segments, and bidding strategies to identify what drives the lowest cost per qualified lead.'}
                  {index === 2 &&
                    'We scale proven winners, refine targeting by geography, device, and daypart, then document everything in your quarterly playbook.'}
                </p>
                <ul className="space-y-4">
                  {milestone.tasks.map((task, taskIndex) => (
                    <li
                      key={taskIndex}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-accentBlue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="i-heroicons-check-solid text-brand-accentBlue text-xs"></span>
                      </div>
                      <span className="luxury-body">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/3">
                <div className="luxury-surface p-6 rounded-2xl">
                  <h5 className="luxury-caption mb-4">Expected Outcomes</h5>
                  <div className="space-y-3">
                    {index === 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Baseline CTR</span>
                          <span className="text-brand-white">Established</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Audience Size</span>
                          <span className="text-brand-white">Mapped</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Brand Safety</span>
                          <span className="text-brand-accentBlue">Active</span>
                        </div>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <div className="flex justify-between">
                          <span className="luxury-muted">CPL Reduction</span>
                          <span className="text-brand-accentBlue">-24% to -38%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Creative Winner</span>
                          <span className="text-brand-white">Identified</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Optimal Frequency</span>
                          <span className="text-brand-white">Set</span>
                        </div>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Scale Factor</span>
                          <span className="text-brand-accentBlue">2.8x to 3.4x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="luxury-muted">QLR Improvement</span>
                          <span className="text-brand-accentBlue">+31% to +54%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="luxury-muted">Playbook</span>
                          <span className="text-brand-white">Delivered</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}