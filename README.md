# 想要成为什么样的人

一个可视化展示名人人生经历的网站，通过交互式时间线帮助用户思考自己想要成为什么样的人。

## 🌟 项目特色

- **可视化时间线**：以交互式时间线展示名人的人生轨迹
- **深度内容**：详细记录重要人生节点和转折点
- **响应式设计**：完美适配桌面端和移动端
- **人生启发**：从伟人经历中汲取智慧和动力

## 🚀 技术栈

- **前端框架**：Next.js 14 (App Router)
- **开发语言**：TypeScript
- **样式方案**：Tailwind CSS
- **动画效果**：Framer Motion
- **图标库**：Lucide React
- **部署平台**：Vercel

## 📦 安装和运行

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 包管理器

### 本地开发

1. 克隆项目
```bash
git clone https://github.com/your-username/want-to-be.git
cd want-to-be
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 🌐 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/want-to-be)

### 手动部署步骤

1. Fork 此项目到你的 GitHub 账户
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 从 GitHub 导入你 fork 的项目
5. 配置环境变量（如需要）
6. 点击 "Deploy"

### 环境变量配置

复制 `.env.example` 为 `.env.local` 并配置以下变量：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=想要成为什么样的人
```

## 📱 功能特性

### 核心功能

- **人物探索**：浏览不同领域的杰出人物
- **时间线体验**：沉浸式的人生轨迹展示
- **智能筛选**：按类别、标签、时代等筛选人物
- **深度阅读**：详细的人生故事和启示
- **移动优化**：完美的移动端浏览体验

### 当前收录人物

- **史蒂夫·乔布斯** - Apple联合创始人，科技创新先驱
- **埃隆·马斯克** - Tesla & SpaceX CEO，未来科技领袖

*更多人物持续添加中...*

## 🎨 设计理念

### 用户体验
- **直观导航**：清晰的页面结构和导航系统
- **视觉美观**：现代化的UI设计和动画效果
- **信息层次**：合理的信息架构和内容组织
- **互动体验**：丰富的交互元素和反馈

### 技术架构
- **性能优化**：SSR/SSG、代码分割、图片优化
- **SEO友好**：语义化HTML、元数据优化
- **可维护性**：模块化组件、TypeScript类型安全
- **扩展性**：灵活的数据结构和组件设计

## 🔧 开发指南

### 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # 首页
│   ├── explore/        # 探索页面
│   ├── person/[id]/    # 人物详情页
│   └── about/          # 关于页面
├── components/         # React组件
│   ├── Navigation.tsx  # 导航组件
│   ├── Timeline.tsx    # 时间线组件
│   ├── PersonCard.tsx  # 人物卡片
│   └── ...
├── data/               # 数据文件
│   ├── steve-jobs.ts   # 乔布斯数据
│   ├── elon-musk.ts    # 马斯克数据
│   └── index.ts        # 数据索引
├── lib/                # 工具库
│   ├── types.ts        # 类型定义
│   └── config.ts       # 配置文件
└── ...
```

### 添加新人物

1. 在 `src/data/` 目录创建新的数据文件
2. 按照 `Person` 接口定义人物信息
3. 在 `src/data/index.ts` 中导入并添加到 `allPeople` 数组
4. 测试数据的正确性

### 自定义样式

项目使用 Tailwind CSS，你可以：

1. 修改 `tailwind.config.js` 自定义主题
2. 在 `src/app/globals.css` 添加全局样式
3. 使用 Tailwind 工具类进行快速样式开发

## 🤝 贡献指南

欢迎贡献代码、提出建议或报告问题！

### 如何贡献

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

### 贡献内容

- **人物数据**：添加新的名人资料和时间线
- **功能改进**：优化现有功能或添加新特性
- **Bug修复**：发现并修复问题
- **文档完善**：改进文档和使用说明
- **设计优化**：提升用户界面和体验

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢所有为这个项目做出贡献的人，以及那些通过自己的人生经历启发他人的伟大人物。

## 📞 联系方式

如果你有任何问题或建议，欢迎：

- 提交 Issue
- 发送 Pull Request
- 通过邮件联系：your-email@example.com

---

**让我们一起从伟人的人生轨迹中汲取智慧，思考自己想要成为什么样的人！** 🌟
