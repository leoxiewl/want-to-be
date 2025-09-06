import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '想要成为什么样的人',
  description: '可视化探索名人人生经历，思考自己想要成为什么样的人',
  keywords: ['人生规划', '名人传记', '乔布斯', '马斯克', '人生感悟'],
  openGraph: {
    title: '想要成为什么样的人',
    description: '走过名人的人生轨迹，思考自己的人生方向',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}