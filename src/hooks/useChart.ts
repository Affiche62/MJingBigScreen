import { ref, onUnmounted, type Ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export function useChart(chartRef: Ref<HTMLElement | null>) {
  const chart = ref<echarts.ECharts | null>(null)

  function initChart(options?: EChartsOption) {
    if (!chartRef.value) return
    chart.value = echarts.init(chartRef.value)
    if (options) {
      chart.value.setOption(options)
    }
    window.addEventListener('resize', handleResize)
  }

  function setOption(options: EChartsOption, notMerge = true) {
    chart.value?.setOption(options, notMerge)
  }

  function handleResize() {
    chart.value?.resize()
  }

  function dispose() {
    window.removeEventListener('resize', handleResize)
    chart.value?.dispose()
    chart.value = null
  }

  onUnmounted(() => {
    dispose()
  })

  return {
    chart,
    initChart,
    setOption,
    handleResize,
  }
}
