'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import PersonCard from '@/components/PersonCard'
import PersonFilter, { FilterState } from '@/components/PersonFilter'
import { allPeople, searchPeople, getPersonsByEra } from '@/data'

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    yearRange: [1900, 2024],
    tags: [],
    achievements: [],
  })

  // Filter people based on current filters
  const filteredPeople = useMemo(() => {
    let people = allPeople

    // Apply search filter
    if (filters.search) {
      people = searchPeople(filters.search)
    }

    // Apply year range filter
    if (filters.yearRange[0] !== 1900 || filters.yearRange[1] !== 2024) {
      people = people.filter(person => {
        const birthYear = new Date(person.birthDate).getFullYear()
        const deathYear = person.deathDate ? new Date(person.deathDate).getFullYear() : new Date().getFullYear()
        return (birthYear >= filters.yearRange[0] && birthYear <= filters.yearRange[1]) ||
               (deathYear >= filters.yearRange[0] && deathYear <= filters.yearRange[1]) ||
               (birthYear <= filters.yearRange[0] && deathYear >= filters.yearRange[1])
      })
    }

    // Apply tag filters
    if (filters.tags.length > 0) {
      people = people.filter(person =>
        filters.tags.some(tag => person.tags.includes(tag))
      )
    }

    // Apply category filters (would need to add category field to Person type)
    // For now, we'll skip this as we don't have categories defined

    return people
  }, [filters])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">探索伟大的人生</h1>
          <p className="text-gray-600 text-lg">
            选择一位你感兴趣的人物，开始你的人生探索之旅
          </p>
        </motion.div>

        {/* Search and Filter */}
        <PersonFilter onFilterChange={handleFilterChange} className="mb-8" />

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-600">
            找到 <span className="font-semibold text-gray-900">{filteredPeople.length}</span> 位人物
          </p>
        </motion.div>

        {/* People Grid */}
        {filteredPeople.length > 0 ? (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {filteredPeople.map((person, index) => (
              <PersonCard
                key={person.id}
                person={person}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到匹配的人物</h3>
            <p className="text-gray-600 mb-6">
              请尝试调整搜索条件或筛选器设置
            </p>
            <button
              onClick={() => setFilters({
                search: '',
                categories: [],
                yearRange: [1900, 2024],
                tags: [],
                achievements: [],
              })}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              清除所有筛选
            </button>
          </motion.div>
        )}

        {/* Featured Section - Show when no filters are active */}
        {filters.search === '' && filters.tags.length === 0 && (
          <motion.section
            className="mt-16 pt-16 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">为什么了解这些人物？</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                通过学习这些杰出人物的人生轨迹，我们可以从中汲取智慧，
                找到自己的人生方向，并获得前进的动力。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">获得启发</h3>
                <p className="text-gray-600 text-sm">
                  从他们的创新思维和解决问题的方式中获得启发
                </p>
              </motion.div>

              <motion.div
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">明确目标</h3>
                <p className="text-gray-600 text-sm">
                  了解他们如何设定和实现人生目标，制定自己的规划
                </p>
              </motion.div>

              <motion.div
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">持续成长</h3>
                <p className="text-gray-600 text-sm">
                  学习他们面对挫折的态度，培养坚韧不拔的品格
                </p>
              </motion.div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}