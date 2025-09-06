'use client'

import { motion } from 'framer-motion'
import { Target, Lightbulb, Users, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            关于「想要成为什么样的人」
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们相信，通过了解那些改变世界的伟大人物的人生轨迹，
            每个人都能找到自己想要成为的那个人。
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8" />
              <h2 className="text-3xl font-bold">我们的使命</h2>
            </div>
            <p className="text-xl leading-relaxed mb-6">
              通过可视化的方式展现名人的人生经历，让每个人都能从中获得启发，
              思考自己的人生方向，并为之努力奋斗。
            </p>
            <p className="text-lg text-blue-100">
              "每个伟大的人生都值得被了解，每个普通的人生都值得被启发。"
            </p>
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">它是如何工作的？</h2>
            <p className="text-gray-600 text-lg">
              我们用心整理每位名人的人生轨迹，让您身临其境地体验他们的成长历程
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">精选人物</h3>
              <p className="text-gray-600">
                我们精心挑选了各个领域的杰出人物，从科技创新者到艺术家，
                从企业家到思想家，每个人都有独特的人生故事。
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">深度挖掘</h3>
              <p className="text-gray-600">
                我们不仅展示他们的成功，更关注他们的挫折、转折点和成长过程，
                让您看到一个完整真实的人生轨迹。
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">启发思考</h3>
              <p className="text-gray-600">
                通过互动式的时间线和深度的人生感悟，帮助您思考自己想要成为什么样的人，
                并为此制定行动计划。
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">我们的价值观</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-600">真实性</h3>
                <p className="text-gray-700 mb-6">
                  我们致力于呈现真实、完整的人生故事，不美化成功，也不回避失败。
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-purple-600">启发性</h3>
                <p className="text-gray-700">
                  每个故事都应该能够启发读者思考，为他们的人生选择提供参考和动力。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-600">多元化</h3>
                <p className="text-gray-700 mb-6">
                  我们展示来自不同文化、不同领域、不同时代的杰出人物，提供多样化的人生模板。
                </p>
                
                <h3 className="text-xl font-bold mb-3 text-orange-600">实用性</h3>
                <p className="text-gray-700">
                  我们不只是讲故事，更希望这些故事能够指导人们的实际行动和人生决策。
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">开始你的探索之旅</h2>
            <p className="text-gray-600 text-lg mb-8">
              准备好了解那些改变世界的人是如何成长的吗？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/explore"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                探索人物
              </a>
              <a
                href="/"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                返回首页
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}