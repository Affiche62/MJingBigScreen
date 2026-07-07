import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { api } from '@/services/api'
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

export const useDashboardStore = defineStore('dashboard', () => {
  const kpiList: Ref<KpiData[]> = ref([])
  const salesTrend: Ref<SalesTrendItem[]> = ref([])
  const categoryGmv: Ref<CategoryGmvItem[]> = ref([])
  const categoryRatio: Ref<CategoryRatioItem[]> = ref([])
  const mapProvinces: Ref<MapProvinceItem[]> = ref([])
  const mapScatters: Ref<MapScatterItem[]> = ref([])
  const orders: Ref<OrderItem[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAllData() {
    loading.value = true
    error.value = null
    logger.info('开始加载大屏数据...')
    try {
      const results = await Promise.all([
        api.fetchKpiList(),
        api.fetchSalesTrend(),
        api.fetchCategoryGmv(),
        api.fetchCategoryRatio(),
        api.fetchMapProvinces(),
        api.fetchMapScatters(),
        api.fetchOrders(),
      ])
      kpiList.value = results[0]
      salesTrend.value = results[1]
      categoryGmv.value = results[2]
      categoryRatio.value = results[3]
      mapProvinces.value = results[4]
      mapScatters.value = results[5]
      orders.value = results[6]
      logger.info('大屏数据加载完成')
    } catch (e) {
      const msg = e instanceof Error ? e.message : '未知错误'
      error.value = msg
      logger.error('数据加载失败: ' + msg)
    } finally {
      loading.value = false
    }
  }

  return {
    kpiList,
    salesTrend,
    categoryGmv,
    categoryRatio,
    mapProvinces,
    mapScatters,
    orders,
    loading,
    error,
    fetchAllData,
  }
})
