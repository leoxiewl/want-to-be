import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  name: '想要成为什么样的人',
  description: '通过可视化的方式探索名人的人生轨迹，思考自己想要成为什么样的人',
  navigation: [
    {
      name: '首页',
      href: '/',
    },
    {
      name: '探索人物',
      href: '/explore',
    },
    {
      name: '关于',
      href: '/about',
    },
  ],
};

// 网站页面结构规划
export const siteStructure = {
  // 首页 (/)
  home: {
    sections: [
      'hero', // 主标题和简介
      'features', // 特色功能介绍
      'featured-people', // 精选人物预览
      'cta', // 行动召唤
    ],
  },
  
  // 探索页面 (/explore)
  explore: {
    sections: [
      'people-grid', // 人物卡片网格
      'filters', // 筛选器
      'search', // 搜索功能
    ],
  },
  
  // 人物详情页 (/person/[id])
  personDetail: {
    sections: [
      'hero', // 人物介绍
      'timeline', // 交互式时间线
      'insights', // 人生感悟
      'related', // 相关人物推荐
    ],
  },
  
  // 关于页面 (/about)
  about: {
    sections: [
      'mission', // 使命介绍
      'how-it-works', // 工作原理
      'team', // 团队介绍
    ],
  },
};

// 时间线配置
export const timelineConfig = {
  categories: {
    birth: { label: '出生', color: 'bg-pink-500', icon: '🎂' },
    education: { label: '教育', color: 'bg-blue-500', icon: '🎓' },
    career: { label: '职业', color: 'bg-green-500', icon: '💼' },
    innovation: { label: '创新', color: 'bg-purple-500', icon: '💡' },
    leadership: { label: '领导力', color: 'bg-orange-500', icon: '👑' },
    setback: { label: '挫折', color: 'bg-red-500', icon: '⚡' },
    breakthrough: { label: '突破', color: 'bg-yellow-500', icon: '🚀' },
    legacy: { label: '传承', color: 'bg-indigo-500', icon: '🏆' },
    personal: { label: '个人', color: 'bg-gray-500', icon: '❤️' },
  },
  importance: {
    low: { label: '一般', size: 'small' },
    medium: { label: '重要', size: 'medium' },
    high: { label: '非常重要', size: 'large' },
    critical: { label: '关键转折', size: 'xlarge' },
  },
};