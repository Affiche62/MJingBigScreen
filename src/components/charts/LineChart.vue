<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useChart } from '@/hooks/useChart'
import type { EChartsOption } from 'echarts'
import type { SalesTrendItem } from '@/types/dashboard'

const props = defineProps<{
  data: SalesTrendItem[]
}>()

const chartContainer = ref<HTMLElement | null>(null)
const { initChart, setOption } = useChart(chartContainer)

function buildOption(data: SalesTrendItem[]) {
  const months = data.map((d) => d.month)
  const onlineData = data.map((d) => d.online)
  const offlineData = data.map((d) => d.offline)
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(16, 24, 48, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
    },
    legend: {
      top: 0,
      textStyle: { color: '#8090b0', fontSize: 11 },
      itemWidth: 14,
      itemHeight: 8,
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '18%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
      axisTick: { show: false },
      axisLabel: { color: '#8090b0', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      name: '万元',
      nameTextStyle: { color: '#8090b0', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#8090b0', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
    },
    series: [
      {
        name: '线上销售',
        type: 'line',
        data: onlineData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2, color: '#00d4ff' },
        itemStyle: { color: '#00d4ff' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0.02)' },
            ],
          },
        },
      },
      {
        name: '线下销售',
        type: 'line',
        data: offlineData,
        smooth: true,
        symbol: 'diamond',
        symbolSize: 6,
        lineStyle: { width: 2, color: '#00ff88' },
        itemStyle: { color: '#00ff88' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 255, 136, 0.25)' },
              { offset: 1, color: 'rgba(0, 255, 136, 0.02)' },
            ],
          },
        },
      },
    ],
  } as EChartsOption
}

watch(
  () => props.data,
  (newData) => {
    if (newData.length > 0) {
      setOption(buildOption(newData))
    }
  },
)

onMounted(() => {
  initChart(buildOption(props.data))
})
</script>

<template>
  <div ref="chartContainer" class="line-chart"></div>
</template>

<style scoped lang="scss">
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
