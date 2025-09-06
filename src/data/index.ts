import { Person } from '@/lib/types'
import { steveJobs } from './steve-jobs'
import { elonMusk } from './elon-musk'

// 所有人物数据
export const allPeople: Person[] = [
  steveJobs,
  elonMusk,
]

// 根据ID获取人物数据
export const getPersonById = (id: string): Person | undefined => {
  return allPeople.find(person => person.id === id)
}

// 根据标签过滤人物
export const getPersonsByTag = (tag: string): Person[] => {
  return allPeople.filter(person => person.tags.includes(tag))
}

// 获取所有标签
export const getAllTags = (): string[] => {
  const tags = new Set<string>()
  allPeople.forEach(person => {
    person.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

// 根据年代过滤人物
export const getPersonsByEra = (startYear: number, endYear: number): Person[] => {
  return allPeople.filter(person => {
    const birthYear = new Date(person.birthDate).getFullYear()
    const deathYear = person.deathDate ? new Date(person.deathDate).getFullYear() : new Date().getFullYear()
    return (birthYear >= startYear && birthYear <= endYear) || 
           (deathYear >= startYear && deathYear <= endYear) ||
           (birthYear <= startYear && deathYear >= endYear)
  })
}

// 搜索人物
export const searchPeople = (query: string): Person[] => {
  const lowercaseQuery = query.toLowerCase()
  return allPeople.filter(person => 
    person.name.toLowerCase().includes(lowercaseQuery) ||
    person.nameEn.toLowerCase().includes(lowercaseQuery) ||
    person.title.toLowerCase().includes(lowercaseQuery) ||
    person.description.toLowerCase().includes(lowercaseQuery) ||
    person.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// 获取推荐人物（基于标签相似性）
export const getRecommendedPeople = (currentPersonId: string, limit: number = 3): Person[] => {
  const currentPerson = getPersonById(currentPersonId)
  if (!currentPerson) return []

  const otherPeople = allPeople.filter(person => person.id !== currentPersonId)
  
  // 计算标签相似度
  const scored = otherPeople.map(person => {
    const commonTags = person.tags.filter(tag => currentPerson.tags.includes(tag))
    return {
      person,
      score: commonTags.length
    }
  })

  // 按相似度排序并返回前几个
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.person)
}

// 人物统计信息
export const getPersonStats = (person: Person) => {
  const birthYear = new Date(person.birthDate).getFullYear()
  const deathYear = person.deathDate ? new Date(person.deathDate).getFullYear() : null
  const currentYear = new Date().getFullYear()
  const age = deathYear ? deathYear - birthYear : currentYear - birthYear

  const milestonesByImportance = {
    critical: person.milestones.filter(m => m.importance === 'critical').length,
    high: person.milestones.filter(m => m.importance === 'high').length,
    medium: person.milestones.filter(m => m.importance === 'medium').length,
    low: person.milestones.filter(m => m.importance === 'low').length,
  }

  const milestonesByCategory = person.milestones.reduce((acc, milestone) => {
    acc[milestone.category] = (acc[milestone.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    age,
    lifespan: deathYear ? `${birthYear} - ${deathYear}` : `${birthYear} - Present`,
    totalMilestones: person.milestones.length,
    achievements: person.achievements.length,
    milestonesByImportance,
    milestonesByCategory,
    tags: person.tags.length,
  }
}