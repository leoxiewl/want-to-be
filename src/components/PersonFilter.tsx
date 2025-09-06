'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, Search, Calendar, Tag, Award } from 'lucide-react'

interface PersonFilterProps {
  onFilterChange: (filters: FilterState) => void
  className?: string
}

export interface FilterState {
  search: string
  categories: string[]
  yearRange: [number, number]
  tags: string[]
  achievements: string[]
}

const defaultFilters: FilterState = {
  search: '',
  categories: [],
  yearRange: [1900, 2024],
  tags: [],
  achievements: [],
}

const categories = [
  { id: 'technology', label: '科技创新', color: 'bg-blue-500' },
  { id: 'business', label: '商业领袖', color: 'bg-green-500' },
  { id: 'science', label: '科学家', color: 'bg-purple-500' },
  { id: 'arts', label: '艺术家', color: 'bg-pink-500' },
  { id: 'politics', label: '政治家', color: 'bg-orange-500' },
  { id: 'social', label: '社会改革家', color: 'bg-red-500' },
]

const popularTags = [
  '创新思维', '领导力', '坚持不懈', '逆境成长', 
  '商业天赋', '技术革命', '社会影响', '艺术天分',
  '科学突破', '哲学思考', '人文关怀', '全球视野'
]

export default function PersonFilter({ onFilterChange, className = '' }: PersonFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.categories.length > 0 || 
    filters.tags.length > 0 ||
    filters.yearRange[0] !== 1900 || 
    filters.yearRange[1] !== 2024

  return (
    <div className={`relative ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="搜索人物姓名、职业或关键词..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
            hasActiveFilters
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>筛选</span>
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1rem] text-center">
              {(filters.categories.length + filters.tags.length + (filters.search ? 1 : 0))}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Categories */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <h4 className="font-medium text-gray-900">人物类别</h4>
              </div>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      const newCategories = filters.categories.includes(category.id)
                        ? filters.categories.filter(c => c !== category.id)
                        : [...filters.categories, category.id]
                      updateFilters({ categories: newCategories })
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 text-center ${
                      filters.categories.includes(category.id)
                        ? `${category.color} text-white shadow-md`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <h4 className="font-medium text-gray-900">时代</h4>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">从</label>
                  <input
                    type="number"
                    min="1800"
                    max="2024"
                    value={filters.yearRange[0]}
                    onChange={(e) => updateFilters({ 
                      yearRange: [parseInt(e.target.value) || 1900, filters.yearRange[1]] 
                    })}
                    className="w-full px-2 md:px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="text-gray-400 text-sm">至</div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">到</label>
                  <input
                    type="number"
                    min="1800"
                    max="2024"
                    value={filters.yearRange[1]}
                    onChange={(e) => updateFilters({ 
                      yearRange: [filters.yearRange[0], parseInt(e.target.value) || 2024] 
                    })}
                    className="w-full px-2 md:px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-gray-500" />
                <h4 className="font-medium text-gray-900">特质标签</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const newTags = filters.tags.includes(tag)
                        ? filters.tags.filter(t => t !== tag)
                        : [...filters.tags, tag]
                      updateFilters({ tags: newTags })
                    }}
                    className={`px-3 py-2 rounded-full text-sm transition-all duration-200 text-center ${
                      filters.tags.includes(tag)
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              搜索: {filters.search}
              <button
                onClick={() => updateFilters({ search: '' })}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.categories.map((categoryId) => {
            const category = categories.find(c => c.id === categoryId)
            return category ? (
              <span
                key={categoryId}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
              >
                {category.label}
                <button
                  onClick={() => updateFilters({ 
                    categories: filters.categories.filter(c => c !== categoryId) 
                  })}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ) : null
          })}

          {filters.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
            >
              {tag}
              <button
                onClick={() => updateFilters({ 
                  tags: filters.tags.filter(t => t !== tag) 
                })}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </motion.div>
      )}
    </div>
  )
}