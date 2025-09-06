'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Award, Lightbulb, Users, Zap, Trophy, Heart, GraduationCap } from 'lucide-react'
import { Person, Milestone, MilestoneCategory } from '@/lib/types'
import { timelineConfig } from '@/lib/config'

interface TimelineProps {
  person: Person
  className?: string
}

const categoryIcons: Record<MilestoneCategory, any> = {
  birth: Heart,
  education: GraduationCap,
  career: Users,
  innovation: Lightbulb,
  leadership: Award,
  setback: Zap,
  breakthrough: Trophy,
  legacy: Trophy,
  personal: Heart,
}

export default function Timeline({ person, className = '' }: TimelineProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const [filterCategory, setFilterCategory] = useState<MilestoneCategory | 'all'>('all')
  const timelineRef = useRef<HTMLDivElement>(null)

  // Sort milestones by year
  const sortedMilestones = [...person.milestones].sort((a, b) => a.year - b.year)
  
  // Filter milestones based on selected category
  const filteredMilestones = filterCategory === 'all' 
    ? sortedMilestones 
    : sortedMilestones.filter(m => m.category === filterCategory)

  // Calculate age range for positioning
  const birthYear = new Date(person.birthDate).getFullYear()
  const deathYear = person.deathDate ? new Date(person.deathDate).getFullYear() : new Date().getFullYear()
  const totalYears = deathYear - birthYear

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...Array.from(prev), entry.target.id]))
          }
        })
      },
      { threshold: 0.3, rootMargin: '50px' }
    )

    const items = timelineRef.current?.querySelectorAll('.timeline-item')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [filteredMilestones])

  const getImportanceStyle = (importance: string) => {
    switch (importance) {
      case 'critical': return 'w-6 h-6 ring-4 ring-red-200'
      case 'high': return 'w-5 h-5 ring-3 ring-yellow-200'
      case 'medium': return 'w-4 h-4 ring-2 ring-blue-200'
      default: return 'w-3 h-3 ring-1 ring-gray-200'
    }
  }

  const getCategoryStyle = (category: MilestoneCategory) => {
    const config = timelineConfig.categories[category]
    return config ? config.color : 'bg-gray-500'
  }

  return (
    <div className={`relative ${className}`}>
      {/* Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {Object.entries(timelineConfig.categories).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(key as MilestoneCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                filterCategory === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{config.icon}</span>
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative">
        {/* Main Timeline Line - Responsive positioning */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

        {/* Timeline Items */}
        <div className="space-y-6 md:space-y-8">
          {filteredMilestones.map((milestone, index) => {
            const Icon = categoryIcons[milestone.category]
            const isVisible = visibleItems.has(milestone.id)
            // On mobile, always align left; on desktop, alternate
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={milestone.id}
                id={milestone.id}
                className={`timeline-item relative flex justify-start md:${isLeft ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Dot - Responsive positioning */}
                <div className="absolute left-2.5 md:left-6 flex items-center justify-center z-10">
                  <motion.div
                    className={`rounded-full flex items-center justify-center text-white shadow-lg ${getCategoryStyle(milestone.category)} ${getImportanceStyle(milestone.importance)}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  </motion.div>
                </div>

                {/* Milestone Card - Mobile-first responsive layout */}
                <motion.div
                  className={`relative w-full max-w-full md:max-w-lg ml-8 mr-2 ${
                    isLeft ? 'md:mr-auto md:ml-16' : 'md:ml-auto md:mr-16'
                  }`}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedMilestone(milestone)}
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 cursor-pointer hover:shadow-lg transition-shadow">
                    {/* Year and Age - Mobile responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                      <span className="text-xl md:text-2xl font-bold text-blue-600">{milestone.year}</span>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs md:text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {milestone.age}岁
                        </span>
                        <span className={`text-xs md:text-sm px-2 py-1 rounded-full text-white ${getCategoryStyle(milestone.category)}`}>
                          {timelineConfig.categories[milestone.category]?.label}
                        </span>
                      </div>
                    </div>

                    {/* Title - Responsive font size */}
                    <h3 className="text-base md:text-lg font-bold mb-2 text-gray-900">
                      {milestone.title}
                    </h3>

                    {/* Description - Responsive text and line clamping */}
                    <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2 md:line-clamp-3">
                      {milestone.description}
                    </p>

                    {/* Importance Indicator - Mobile responsive */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {milestone.importance === 'critical' && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            关键转折
                          </span>
                        )}
                        {milestone.importance === 'high' && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            重要事件
                          </span>
                        )}
                      </div>
                      <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors self-start sm:self-auto">
                        详细了解 →
                      </button>
                    </div>

                    {/* Connector Line - Hide on mobile for cleaner look */}
                    <div className={`hidden md:block absolute top-8 ${
                      isLeft ? '-right-4' : '-left-4'
                    } w-4 h-0.5 bg-gray-200`}></div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* End Marker */}
        <motion.div
          className="relative flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute left-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
            <Trophy className="w-4 h-4" />
          </div>
          <div className="ml-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">传承与影响</h3>
            <p className="text-gray-600">
              {person.name}的人生故事继续启发着无数人追求自己的梦想
            </p>
          </div>
        </motion.div>
      </div>

      {/* Detailed Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-blue-600">{selectedMilestone.year}</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {selectedMilestone.age}岁
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">{selectedMilestone.title}</h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedMilestone.description}
              </p>

              {selectedMilestone.achievements && selectedMilestone.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">主要成就：</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedMilestone.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMilestone.challenges && selectedMilestone.challenges.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">面临挑战：</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedMilestone.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedMilestone.insights && selectedMilestone.insights.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-800 mb-2">人生启示：</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {selectedMilestone.insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => setSelectedMilestone(null)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                关闭详情
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}