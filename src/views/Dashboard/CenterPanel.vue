<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import MapChart from '@/components/charts/MapChart.vue'

const store = useDashboardStore()
const { mapProvinces, mapScatters, orders } = storeToRefs(store)
</script>

<template>
  <div class="center-panel">
    <ChartWrapper title="全国销售分布" class="map-block">
      <MapChart :provinces="mapProvinces" :scatters="mapScatters" />
    </ChartWrapper>
    <div class="info-stream">
      <div class="info-title">实时信息播报</div>
      <div class="info-list">
        <div v-for="item in orders.slice(0, 5)" :key="item.id" class="info-item">
          <span class="info-dot"></span>
          <span class="info-text">{{ item.product }} - ¥{{ item.amount.toLocaleString() }}</span>
          <span class="info-time">{{ item.time.slice(-8) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center-panel {
  display: flex;
  flex-direction: column;
  gap: $gap;
  min-height: 0;
}

.map-block {
  flex: 1;
  min-height: 0;
}

.info-stream {
  background: $bg-panel;
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 8px 12px;
  height: 120px;
  overflow: hidden;
}

.info-title {
  font-size: 12px;
  color: $color-primary;
  margin-bottom: 6px;
  font-family: $font-title;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.info-dot {
  width: 5px;
  height: 5px;
  background: $color-success;
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

.info-text {
  flex: 1;
  color: $color-text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info-time {
  color: $color-text-dim;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
