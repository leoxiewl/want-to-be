'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Award, Quote } from 'lucide-react'
import { Person } from '@/lib/types'

interface PersonCardProps {
  person: Person
  index?: number
  className?: string
}

export default function PersonCard({ person, index = 0, className = '' }: PersonCardProps) {
  const birthYear = new Date(person.birthDate).getFullYear()
  const deathYear = person.deathDate ? new Date(person.deathDate).getFullYear() : null
  const age = deathYear ? deathYear - birthYear : new Date().getFullYear() - birthYear

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
        {person.coverImage ? (
          <img 
            src={person.coverImage} 
            alt={person.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold">{person.name.charAt(0)}</span>
              </div>
              <p className="text-sm opacity-80">{person.name}</p>
            </div>
          </div>
        )}
        
        {/* Overlay with Quote */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <Quote className="w-6 h-6 mx-auto mb-2 opacity-80" />
            <p className="text-sm italic line-clamp-3">{person.quote}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {person.name}
          </h3>
          <p className="text-blue-600 font-medium text-sm">{person.title}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {person.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{birthYear} - {deathYear || 'Present'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>{person.achievements.length} 项成就</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {person.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {tag}
            </span>
          ))}
          {person.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
              +{person.tags.length - 3} 更多
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link 
          href={`/person/${person.id}`}
          className="block w-full"
        >
          <motion.button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            探索人生轨迹
          </motion.button>
        </Link>
      </div>

      {/* Timeline Preview (Mini) */}
      <div className="px-6 pb-4">
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>人生轨迹预览</span>
            <span>{person.milestones.length} 个里程碑</span>
          </div>
          <div className="flex gap-1">
            {person.milestones.slice(0, 10).map((milestone, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  milestone.importance === 'critical' 
                    ? 'bg-red-400' 
                    : milestone.importance === 'high'
                    ? 'bg-yellow-400'
                    : milestone.importance === 'medium'
                    ? 'bg-blue-400'
                    : 'bg-gray-300'
                }`}
                title={`${milestone.year}: ${milestone.title}`}
              ></div>
            ))}
            {person.milestones.length > 10 && (
              <div className="text-xs text-gray-400 ml-1">...</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}