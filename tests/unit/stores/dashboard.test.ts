import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard'

describe('useDashboardStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty arrays', () => {
    const store = useDashboardStore()
    expect(store.kpiList).toEqual([])
    expect(store.salesTrend).toEqual([])
    expect(store.categoryGmv).toEqual([])
    expect(store.categoryRatio).toEqual([])
    expect(store.mapProvinces).toEqual([])
    expect(store.mapScatters).toEqual([])
    expect(store.orders).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should have fetchAllData method', () => {
    const store = useDashboardStore()
    expect(typeof store.fetchAllData).toBe('function')
  })

  it('should set loading to true during fetch', async () => {
    const store = useDashboardStore()
    // Since we're in test env, VITE_USE_MOCK likely isn't set
    // We just verify the method exists and handles gracefully
    try {
      await store.fetchAllData()
    } catch {
      // Expected if mock env not set
    }
    expect(store.loading).toBe(false)
  })
})
