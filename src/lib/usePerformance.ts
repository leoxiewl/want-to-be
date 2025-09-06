'use client'

import { useEffect } from 'react'

// 性能监控钩子
export function usePerformanceMonitor(pageName: string) {
  useEffect(() => {
    // 只在生产环境和支持Performance API的浏览器中运行
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    // 监控页面加载性能
    const measurePageLoad = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          const metrics = {
            page: pageName,
            dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
            tcp: Math.round(navigation.connectEnd - navigation.connectStart),
            request: Math.round(navigation.responseStart - navigation.requestStart),
            response: Math.round(navigation.responseEnd - navigation.responseStart),
            dom: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
            load: Math.round(navigation.loadEventEnd - navigation.navigationStart),
            fcp: 0, // First Contentful Paint
            lcp: 0, // Largest Contentful Paint
            cls: 0, // Cumulative Layout Shift
          }

          // 测量 First Contentful Paint
          const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
          if (fcpEntry) {
            metrics.fcp = Math.round(fcpEntry.startTime)
          }

          // 使用 PerformanceObserver 监控 LCP 和 CLS
          if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries()
              if (entries.length > 0) {
                const lastEntry = entries[entries.length - 1]
                metrics.lcp = Math.round(lastEntry.startTime)
              }
            })
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((entryList) => {
              let clsScore = 0
              entryList.getEntries().forEach((entry: any) => {
                if (!entry.hadRecentInput) {
                  clsScore += entry.value
                }
              })
              metrics.cls = Math.round(clsScore * 1000) / 1000
            })
            clsObserver.observe({ entryTypes: ['layout-shift'] })

            // 清理观察器
            setTimeout(() => {
              lcpObserver.disconnect()
              clsObserver.disconnect()
              
              // 发送性能数据（在实际项目中可以发送到分析服务）
              console.log(`Performance metrics for ${pageName}:`, metrics)
              
              // 这里可以发送到分析服务，例如：
              // sendToAnalytics('performance', metrics)
            }, 5000)
          }
        }
      } catch (error) {
        console.warn('Performance monitoring error:', error)
      }
    }

    // 页面加载完成后测量性能
    if (document.readyState === 'complete') {
      measurePageLoad()
    } else {
      window.addEventListener('load', measurePageLoad, { once: true })
    }

    return () => {
      window.removeEventListener('load', measurePageLoad)
    }
  }, [pageName])
}

// 资源监控钩子
export function useResourceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    const monitorResources = () => {
      try {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        
        const resourceMetrics = {
          totalResources: resources.length,
          slowResources: resources.filter(r => r.duration > 1000).length,
          failedResources: resources.filter(r => r.transferSize === 0 && r.decodedBodySize === 0).length,
          totalSize: Math.round(resources.reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024), // KB
          totalTime: Math.round(resources.reduce((sum, r) => sum + r.duration, 0)),
        }

        console.log('Resource metrics:', resourceMetrics)
      } catch (error) {
        console.warn('Resource monitoring error:', error)
      }
    }

    setTimeout(monitorResources, 3000)
  }, [])
}

// 内存使用监控
export function useMemoryMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    const monitorMemory = () => {
      try {
        // @ts-ignore - memory API可能不被所有浏览器支持
        if (performance.memory) {
          // @ts-ignore
          const memory = performance.memory
          const memoryMetrics = {
            usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
            totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
            jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
          }

          console.log('Memory metrics:', memoryMetrics)
        }
      } catch (error) {
        console.warn('Memory monitoring error:', error)
      }
    }

    const interval = setInterval(monitorMemory, 30000) // 每30秒检查一次
    return () => clearInterval(interval)
  }, [])
}