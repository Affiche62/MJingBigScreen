# MJing 智慧数据大屏

> 基于 Vue 3 + ECharts 5 的数据可视化大屏项目，深蓝科技风主题。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API + `<script setup>`) |
| 语言 | TypeScript |
| 构建 | Vite 5 |
| 可视化 | ECharts 5 + echarts-gl |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| HTTP | Axios (Mock / Real 适配器模式) |
| CSS | Scoped SCSS |
| 测试 | Vitest + Vue Test Utils |
| 代码质量 | ESLint + Prettier |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（自动打开浏览器）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行单元测试
npm test

# 代码检查
npm run lint
```

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_USE_MOCK` | 是否使用 Mock 数据 | `true` (开发) / `false` (生产) |

- `.env.development` — 开发环境，启用 Mock
- `.env.production` — 生产环境，调用真实 API

## 项目结构

```
MJingBigScreen/
├── src/
│   ├── assets/styles/        # 全局样式 & SCSS 变量
│   ├── components/
│   │   ├── common/           # KpiCard / ChartWrapper / ScrollTable
│   │   └── charts/           # BarChart / LineChart / PieChart / MapChart
│   ├── hooks/                # useChart / useScreenScale
│   ├── services/
│   │   ├── api/mock/         # Mock 数据源
│   │   ├── api/real/         # 真实 API 调用（预留）
│   │   └── request.ts        # Axios 封装
│   ├── stores/               # Pinia 状态管理
│   ├── types/                # TypeScript 类型定义
│   ├── utils/                # 工具函数 (logger / format)
│   ├── views/Dashboard/      # 大屏页面组件
│   ├── router/               # 路由配置
│   ├── App.vue
│   └── main.ts
├── tests/unit/               # 单元测试
├── index.html
├── vite.config.ts
├── vitest.config.ts
└── tsconfig.json
```

## 核心模块

| 模块 | 说明 |
|------|------|
| **TopHeader** | 顶部标题栏，渐变色标题 + 实时时钟 |
| **KPI 卡片 ×6** | 总销售额、订单量、活跃用户、转化率、客单价、退款率 |
| **折线图** | 月度销售趋势（线上 / 线下），渐变面积填充 |
| **柱状图** | 横向品类 GMV 排名，渐变色柱体 |
| **中国地图** | 省份热力图 + 城市散点 + 飞线动画，降级散点图 |
| **饼图** | 南丁格尔玫瑰图，中心显示总销售额 |
| **滚动表格** | 订单实时播报，无缝循环滚动，悬停暂停 |

## 设计规范

- **主题**: 深蓝科技风 (Dark Blue Tech)
- **背景色**: `#0a0f24`
- **主色调**: `#00d4ff` (科技蓝)
- **强调色**: `#00ff88` (数据绿) / `#ff6b35` (警示橙)
- **设计分辨率**: 1920 × 1080，等比缩放自适应
- **数据刷新**: 每 30 秒自动轮询
