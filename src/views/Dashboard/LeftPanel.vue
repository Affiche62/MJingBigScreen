<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

const store = useDashboardStore()
const { salesTrend, categoryGmv } = storeToRefs(store)
</script>

<template>
  <div class="left-panel">
    <ChartWrapper title="月度销售趋势" class="chart-block">
      <LineChart :data="salesTrend" />
    </ChartWrapper>
    <ChartWrapper title="各品类 GMV 排名" class="chart-block">
      <BarChart :data="categoryGmv" />
    </ChartWrapper>
  </div>
</template>

<style scoped lang="scss">
.left-panel {
  display: flex;
  flex-direction: column;
  gap: $gap;
  min-height: 0;
}

.chart-block {
  flex: 1;
  min-height: 0;
}
</style>
