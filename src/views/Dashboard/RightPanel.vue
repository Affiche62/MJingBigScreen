<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import ScrollTable from '@/components/common/ScrollTable.vue'
import PieChart from '@/components/charts/PieChart.vue'

const store = useDashboardStore()
const { categoryRatio, orders } = storeToRefs(store)
</script>

<template>
  <div class="right-panel">
    <ChartWrapper title="品类销售额占比" class="chart-block pie-wrap">
      <PieChart :data="categoryRatio" />
    </ChartWrapper>
    <ChartWrapper title="最新订单实时播报" class="chart-block table-wrap">
      <ScrollTable :data="orders" />
    </ChartWrapper>
  </div>
</template>

<style scoped lang="scss">
.right-panel {
  display: flex;
  flex-direction: column;
  gap: $gap;
  min-height: 0;
}

.chart-block {
  min-height: 0;
}

.pie-wrap {
  flex: 4;
}

.table-wrap {
  flex: 6;
  display: flex;
  flex-direction: column;

  :deep(.chart-body) {
    overflow: hidden;
  }
}
</style>
