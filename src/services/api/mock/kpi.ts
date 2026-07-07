import type { KpiData } from '@/types/dashboard'

// @mock KPI指标数据
export const kpiList: KpiData[] = [
  {
    id: 1,
    title: '总销售额',
    value: '¥12,856.32万',
    change: 12.5,
    unit: '万',
    trend: 'up',
    isPositive: true,
  },
  {
    id: 2,
    title: '总订单量',
    value: '86,423笔',
    change: 8.3,
    unit: '笔',
    trend: 'up',
    isPositive: true,
  },
  {
    id: 3,
    title: '活跃用户',
    value: '32.5万人',
    change: 15.2,
    unit: '万人',
    trend: 'up',
    isPositive: true,
  },
  {
    id: 4,
    title: '转化率',
    value: '24.8%',
    change: -2.1,
    unit: '%',
    trend: 'down',
    isPositive: false,
  },
  {
    id: 5,
    title: '客单价',
    value: '¥1,486元',
    change: 5.7,
    unit: '元',
    trend: 'up',
    isPositive: true,
  },
  {
    id: 6,
    title: '退款率',
    value: '3.2%',
    change: -0.5,
    unit: '%',
    trend: 'down',
    isPositive: true,
  },
]
