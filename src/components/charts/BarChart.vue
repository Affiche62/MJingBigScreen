<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useChart } from '@/hooks/useChart'
import type { EChartsOption } from 'echarts'
import type { CategoryGmvItem } from '@/types/dashboard'

const props = defineProps<{
  data: CategoryGmvItem[]
}>()

const chartContainer = ref<HTMLElement | null>(null)
const { initChart, setOption } = useChart(chartContainer)

function buildOption(data: CategoryGmvItem[]): EChartsOption {
  const names = data.map((d) => d.name)
  const values = data.map((d) => d.value)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(16, 24, 48, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '12%',
      top: '8%',
      bottom: '8%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#8090b0', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#e0e6f0', fontSize: 12 },
      inverse: true,
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 18,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#00d4ff' },
              { offset: 0.5, color: '#00d4ff' },
              { offset: 1, color: '#00ff88' },
            ],
          },
        },
        label: {
          show: true,
          position: 'right',
          color: '#e0e6f0',
          fontSize: 11,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 212, 255, 0.5)',
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
  <div ref="chartContainer" class="bar-chart"></div>
</template>

<style scoped lang="scss">
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>
