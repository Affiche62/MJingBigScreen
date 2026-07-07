<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useChart } from '@/hooks/useChart'
import type { EChartsOption } from 'echarts'
import type { CategoryRatioItem } from '@/types/dashboard'
import { formatCurrency } from '@/utils/format'

const props = defineProps<{
  data: CategoryRatioItem[]
}>()

const chartContainer = ref<HTMLElement | null>(null)
const { initChart, setOption } = useChart(chartContainer)

const total = computed(() => props.data.reduce((sum, d) => sum + d.value, 0))

function buildOption(data: CategoryRatioItem[]) {
  const colors = ['#00d4ff', '#00ff88', '#ff6b35', '#a855f7', '#f59e0b', '#ff4444']
  return {
    color: colors,
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(16, 24, 48, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#8090b0', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10,
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '45%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 2,
          borderColor: 'rgba(10, 15, 36, 0.8)',
          borderWidth: 3,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 212, 255, 0.3)',
          },
        },
        data: data.map((d) => ({
          name: d.name,
          value: d.value,
        })),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: '总销售额',
          fill: '#8090b0',
          fontSize: 12,
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '46%',
        style: {
          text: formatCurrency(total.value),
          fill: '#00d4ff',
          fontSize: 16,
          fontWeight: 'bold',
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
  <div ref="chartContainer" class="pie-chart"></div>
</template>

<style scoped lang="scss">
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
