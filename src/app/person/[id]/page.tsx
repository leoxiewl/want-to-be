'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Award, Quote, Trophy, Users, Heart } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Timeline from '@/components/Timeline'
import { getPersonById, getPersonStats, getRecommendedPeople } from '@/data'
import PersonCard from '@/components/PersonCard'

export default function PersonDetailPage() {
  const params = useParams()
  const personId = params.id as string
  
  const person = getPersonById(personId)
  if (!person) {
    notFound()
  }

  const stats = getPersonStats(person)
  const recommendedPeople = getRecommendedPeople(personId)

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto container-padding py-6">
        <Link 
          href="/explore"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回探索页面
        </Link>
      </div>

      {/* Person Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto container-padding">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl">
              {person.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {person.name}
              </h1>
              <p className="text-xl text-blue-100 mb-4">{person.title}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {person.tags.slice(0, 4).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote className="flex items-start gap-3 text-lg italic text-blue-100 max-w-2xl">
                <Quote className="w-6 h-6 flex-shrink-0 mt-1" />
                <span>"{person.quote}"</span>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto container-padding">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {person.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto container-padding">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.age}年</div>
              <div className="text-gray-600 text-sm">人生历程</div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.achievements}</div>
              <div className="text-gray-600 text-sm">重大成就</div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.milestonesByImportance.critical}</div>
              <div className="text-gray-600 text-sm">关键转折</div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalMilestones}</div>
              <div className="text-gray-600 text-sm">人生里程碑</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">人生轨迹时间线</h2>
            <p className="text-gray-600">
              跟随时间的脚步，体验{person.name}的人生历程
            </p>
          </motion.div>

          <Timeline person={person} />
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto container-padding">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">主要成就</h2>
            <p className="text-gray-600">
              {person.name}一生中的重要成就和贡献
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {person.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recommended People Section */}
      {recommendedPeople.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto container-padding">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">相关人物推荐</h2>
              <p className="text-gray-600">
                与{person.name}有相似特质或经历的其他杰出人物
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recommendedPeople.map((recommendedPerson, index) => (
                <PersonCard
                  key={recommendedPerson.id}
                  person={recommendedPerson}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}