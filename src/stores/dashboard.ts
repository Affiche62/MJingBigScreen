import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
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

function formatKpiValue(item: KpiData, fluctuated: number): string {
  if (item.decimals === 0) {
    return item.prefix + Math.round(fluctuated).toLocaleString('zh-CN') + item.suffix
  }
  return item.prefix + fluctuated.toFixed(item.decimals) + item.suffix
}

function fluctuateValue(raw: number, ratio = 0.003): number {
  const delta = raw * ratio * (Math.random() * 2 - 1)
  return raw + delta
}

export const useDashboardStore = defineStore('dashboard', () => {
  const kpiList: Ref<KpiData[]> = ref([])
  const kpiFluctuated: Ref<Record<number, number>> = ref({})
  const salesTrend: Ref<SalesTrendItem[]> = ref([])
  const categoryGmv: Ref<CategoryGmvItem[]> = ref([])
  const categoryRatio: Ref<CategoryRatioItem[]> = ref([])
  const mapProvinces: Ref<MapProvinceItem[]> = ref([])
  const mapScatters: Ref<MapScatterItem[]> = ref([])
  const orders: Ref<OrderItem[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const displayKpiList = computed(() =>
    kpiList.value.map((item) => {
      const fluctuated = kpiFluctuated.value[item.id] ?? item.rawValue
      return { ...item, value: formatKpiValue(item, fluctuated) }
    }),
  )

  function tickKpi() {
    const next: Record<number, number> = {}
    for (const item of kpiList.value) {
      const prev = kpiFluctuated.value[item.id] ?? item.rawValue
      next[item.id] = fluctuateValue(prev)
    }
    kpiFluctuated.value = next
  }

  let kpiTimer: ReturnType<typeof setInterval> | null = null

  function startKpiFluctuation() {
    if (kpiTimer) return
    kpiTimer = setInterval(tickKpi, 2000)
  }

  function stopKpiFluctuation() {
    if (kpiTimer) {
      clearInterval(kpiTimer)
      kpiTimer = null
    }
  }

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
      const init: Record<number, number> = {}
      for (const item of kpiList.value) {
        init[item.id] = item.rawValue
      }
      kpiFluctuated.value = init
      startKpiFluctuation()
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
    displayKpiList,
    salesTrend,
    categoryGmv,
    categoryRatio,
    mapProvinces,
    mapScatters,
    orders,
    loading,
    error,
    fetchAllData,
    startKpiFluctuation,
    stopKpiFluctuation,
  }
})
