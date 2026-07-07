import type {
  KpiData,
  SalesTrendItem,
  CategoryGmvItem,
  CategoryRatioItem,
  MapProvinceItem,
  MapScatterItem,
  OrderItem,
} from '@/types/dashboard'
import { logger } from '@/utils/logger'
import { kpiList } from './kpi'
import { salesTrend } from './sales'
import { categoryGmv, categoryRatio } from './category'
import { mapProvinces, mapScatters } from './map'
import { orders } from './orders'

export async function fetchKpiList(): Promise<KpiData[]> {
  logger.info('Mock: 加载KPI数据')
  return Promise.resolve(kpiList)
}

export async function fetchSalesTrend(): Promise<SalesTrendItem[]> {
  logger.info('Mock: 加载销售趋势数据')
  return Promise.resolve(salesTrend)
}

export async function fetchCategoryGmv(): Promise<CategoryGmvItem[]> {
  logger.info('Mock: 加载品类GMV数据')
  return Promise.resolve(categoryGmv)
}

export async function fetchCategoryRatio(): Promise<CategoryRatioItem[]> {
  logger.info('Mock: 加载品类占比数据')
  return Promise.resolve(categoryRatio)
}

export async function fetchMapProvinces(): Promise<MapProvinceItem[]> {
  logger.info('Mock: 加载地图省份数据')
  return Promise.resolve(mapProvinces)
}

export async function fetchMapScatters(): Promise<MapScatterItem[]> {
  logger.info('Mock: 加载地图散点数据')
  return Promise.resolve(mapScatters)
}

export async function fetchOrders(): Promise<OrderItem[]> {
  logger.info('Mock: 加载订单数据')
  return Promise.resolve(orders)
}
