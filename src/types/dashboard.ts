export interface KpiData {
  id: number
  title: string
  value: string
  change: number
  unit: string
  trend: 'up' | 'down'
  isPositive: boolean
}

export interface SalesTrendItem {
  month: string
  online: number
  offline: number
}

export interface CategoryGmvItem {
  name: string
  value: number
}

export interface MapScatterItem {
  name: string
  value: number[]
  count: number
}

export interface MapProvinceItem {
  name: string
  value: number
}

export interface CategoryRatioItem {
  name: string
  value: number
}

export interface OrderItem {
  id: string
  orderNo: string
  product: string
  amount: number
  time: string
  status: string
}

export interface DashboardData {
  kpiList: KpiData[]
  salesTrend: SalesTrendItem[]
  categoryGmv: CategoryGmvItem[]
  mapProvinces: MapProvinceItem[]
  mapScatters: MapScatterItem[]
  categoryRatio: CategoryRatioItem[]
  orders: OrderItem[]
}
