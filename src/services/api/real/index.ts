import type {
  KpiData,
  SalesTrendItem,
  CategoryGmvItem,
  CategoryRatioItem,
  MapProvinceItem,
  MapScatterItem,
  OrderItem,
} from '@/types/dashboard'
import { request } from '@/services/request'

export async function fetchKpiList(): Promise<KpiData[]> {
  return request({ url: '/dashboard/kpi' })
}

export async function fetchSalesTrend(): Promise<SalesTrendItem[]> {
  return request({ url: '/dashboard/sales-trend' })
}

export async function fetchCategoryGmv(): Promise<CategoryGmvItem[]> {
  return request({ url: '/dashboard/category-gmv' })
}

export async function fetchCategoryRatio(): Promise<CategoryRatioItem[]> {
  return request({ url: '/dashboard/category-ratio' })
}

export async function fetchMapProvinces(): Promise<MapProvinceItem[]> {
  return request({ url: '/dashboard/map-provinces' })
}

export async function fetchMapScatters(): Promise<MapScatterItem[]> {
  return request({ url: '/dashboard/map-scatters' })
}

export async function fetchOrders(): Promise<OrderItem[]> {
  return request({ url: '/dashboard/orders' })
}
