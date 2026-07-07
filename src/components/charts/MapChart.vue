<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { useChart } from '@/hooks/useChart'
import type { MapProvinceItem, MapScatterItem } from '@/types/dashboard'
import { logger } from '@/utils/logger'

const props = defineProps<{
  provinces: MapProvinceItem[]
  scatters: MapScatterItem[]
}>()

const chartContainer = ref<HTMLElement | null>(null)
const { initChart, setOption } = useChart(chartContainer)
const mapReady = ref(false)

const chinaGeoUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

function buildMapOption() {
  const top5 = [...props.scatters].sort((a, b) => b.count - a.count).slice(0, 5)
  const maxVal = Math.max(...props.provinces.map((p) => p.value), 1)

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(16, 24, 48, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
    },
    visualMap: {
      min: 0,
      max: maxVal,
      left: 'left',
      bottom: 10,
      text: ['高', '低'],
      textStyle: { color: '#8090b0', fontSize: 10 },
      inRange: {
        color: ['#0a1a3a', '#0d2f5e', '#14588a', '#1a84b8', '#20b2e0', '#28e0ff'],
      },
      calculable: true,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.15,
      center: [104.5, 36.5],
      itemStyle: {
        areaColor: '#0d2f5e',
        borderColor: 'rgba(0, 212, 255, 0.4)',
        borderWidth: 1,
      },
      emphasis: {
        disabled: true,
      },
      label: { show: false },
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        data: props.provinces.map((p) => ({ name: p.name, value: p.value })),
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: top5.map((s) => ({
          name: s.name,
          value: [...s.value, s.count],
        })),
        symbolSize: (val: number[]) => Math.sqrt(val[2]) / 8,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 8,
        },
        itemStyle: {
          color: '#00ff88',
          shadowBlur: 10,
          shadowColor: 'rgba(0, 255, 136, 0.5)',
        },
        label: {
          show: true,
          formatter: (p: { name: string }) => p.name,
          position: 'right',
          color: '#e0e6f0',
          fontSize: 11,
          distance: 10,
        },
        emphasis: {
          scale: 2,
        },
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        data: generateFlyLines(top5),
        lineStyle: {
          color: '#00d4ff',
          width: 1,
          opacity: 0.5,
          curveness: 0.2,
        },
        effect: {
          show: true,
          period: 6,
          trailLength: 0.3,
          symbol: 'arrow',
          symbolSize: 6,
          color: '#00ff88',
        },
      },
    ],
  } as EChartsOption
}

function generateFlyLines(cities: MapScatterItem[]) {
  const center: [number, number] = [108.5, 34.5]
  return cities.map((city) => ({
    fromName: city.name,
    toName: 'center',
    coords: [city.value, center],
  }))
}

function buildFallbackOption() {
  const cities = props.scatters
  const colors = ['#00d4ff', '#00ff88', '#ff6b35', '#a855f7', '#f59e0b']
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(16, 24, 48, 0.95)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#e0e6f0', fontSize: 12 },
    },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        type: 'scatter',
        data: cities.map((c, i) => ({
          name: c.name,
          value: c.value,
          symbolSize: Math.sqrt(c.count) / 3,
        })),
        itemStyle: {
          color: (p: { dataIndex: number }) => colors[p.dataIndex % colors.length],
          shadowBlur: 10,
          shadowColor: 'rgba(0, 212, 255, 0.3)',
        },
        label: {
          show: true,
          formatter: (p: { name: string }) => p.name,
          position: 'right',
          color: '#e0e6f0',
          fontSize: 12,
        },
        emphasis: {
          scale: 1.5,
        },
      },
    ],
  } as EChartsOption
}

function loadChinaMap(): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch(chinaGeoUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((geoJson) => {
        echarts.registerMap('china', geoJson)
        mapReady.value = true
        logger.info('中国地图GeoJSON加载成功')
        resolve()
      })
      .catch(() => {
        logger.warn('中国地图加载失败，使用降级方案')
        reject()
      })
  })
}

function renderChart() {
  const option = mapReady.value ? buildMapOption() : buildFallbackOption()
  setOption(option)
}

watch(
  () => [props.provinces, props.scatters],
  () => {
    renderChart()
  },
)

onMounted(async () => {
  initChart()
  try {
    await loadChinaMap()
  } catch {
    // 降级方案
  }
  renderChart()
})
</script>

<template>
  <div ref="chartContainer" class="map-chart"></div>
</template>

<style scoped lang="scss">
.map-chart {
  width: 100%;
  height: 100%;
}
</style>
