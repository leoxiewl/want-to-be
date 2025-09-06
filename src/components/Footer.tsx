'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Github, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto container-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                W
              </div>
              <h3 className="text-xl font-bold">想要成为什么样的人</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              通过可视化的方式探索名人的人生轨迹，思考自己想要成为什么样的人。
              每个伟大的人生都值得被了解，每个普通的人生都值得被启发。
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <div className="space-y-2">
              <Link 
                href="/" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                首页
              </Link>
              <Link 
                href="/explore" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                探索人物
              </Link>
              <Link 
                href="/about" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                关于我们
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">精选人物</h4>
            <div className="space-y-2">
              <Link 
                href="/person/jobs" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                史蒂夫·乔布斯
              </Link>
              <Link 
                href="/person/musk" 
                className="block text-gray-300 hover:text-white transition-colors"
              >
                埃隆·马斯克
              </Link>
              <span className="block text-gray-500 text-sm">更多人物即将推出</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © {currentYear} 想要成为什么样的人. 用心打造，启发人生.
          </p>
          <div className="flex items-center space-x-1 text-gray-300 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by passionate developers</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}