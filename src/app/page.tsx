'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, Clock, Star } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              想要成为什么样的人？
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              走过名人的人生轨迹，思考自己的人生方向
            </p>
            <Link href="/explore">
              <motion.button
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                开始探索之旅
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              探索伟大人物的人生历程
            </h2>
            <p className="text-gray-600 text-lg">
              通过可视化的时间线，体验他们的成长、挫折与成就
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6 rounded-lg card-hover bg-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">时间线体验</h3>
              <p className="text-gray-600">
                按时间顺序体验名人的重要人生节点和转折点
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg card-hover bg-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">多样人物</h3>
              <p className="text-gray-600">
                涵盖科技、商业、艺术等各领域的杰出人物故事
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg card-hover bg-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">深度启发</h3>
              <p className="text-gray-600">
                从他们的经历中获得人生智慧和前进的动力
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              每个伟大的人生都有值得学习的地方
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              让我们从他们的人生轨迹中，找到自己想要成为的那个人
            </p>
            <Link
              href="/explore"
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              立即开始探索
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}