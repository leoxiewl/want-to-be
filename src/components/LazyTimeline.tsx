'use client'

import { lazy, Suspense } from 'react'
import { Person } from '@/lib/types'

// 懒加载Timeline组件
const Timeline = lazy(() => import('./Timeline'))

interface LazyTimelineProps {
  person: Person
  className?: string
}

// 加载占位符组件
function TimelineLoadingPlaceholder() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* 时间线骨架屏 */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gray-200 rounded-full"></div>
        
        {/* 时间线项目占位符 */}
        <div className="space-y-6 md:space-y-8">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="relative flex justify-start">
              {/* 时间点占位符 */}
              <div className="absolute left-2.5 md:left-6 w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
              
              {/* 卡片占位符 */}
              <div className="ml-8 mr-2 md:mr-auto md:ml-16 w-full max-w-lg">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                  {/* 年份和标签占位符 */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  
                  {/* 标题占位符 */}
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  
                  {/* 描述占位符 */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                  </div>
                  
                  {/* 按钮占位符 */}
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LazyTimeline({ person, className }: LazyTimelineProps) {
  return (
    <Suspense fallback={<TimelineLoadingPlaceholder />}>
      <Timeline person={person} className={className} />
    </Suspense>
  )
}