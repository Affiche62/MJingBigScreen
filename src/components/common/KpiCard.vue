<script setup lang="ts">
import type { KpiData } from '@/types/dashboard'

const props = defineProps<{
  data: KpiData
}>()

const changeClass = () => {
  if (props.data.isPositive) {
    return props.data.trend === 'up' ? 'change-up-good' : 'change-down-good'
  }
  return props.data.trend === 'up' ? 'change-up-bad' : 'change-down-good'
}
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-title">{{ data.title }}</div>
    <div class="kpi-value">{{ data.value }}</div>
    <div class="kpi-change" :class="changeClass()">
      <span class="arrow">{{ data.trend === 'up' ? '▲' : '▼' }}</span>
      <span>{{ (data.change >= 0 ? '+' : '') + data.change.toFixed(1) + '%' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.kpi-card {
  background: rgba(16, 24, 48, 0.6);
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $color-primary, transparent);
  }
}

.kpi-title {
  font-size: 13px;
  color: $color-text-dim;
  font-family: $font-body;
}

.kpi-value {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  font-family: $font-title;
  white-space: nowrap;
}

.kpi-change {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;

  .arrow {
    font-size: 10px;
  }
}

.change-up-good {
  color: $color-success;
}

.change-down-good {
  color: $color-success;
}

.change-up-bad {
  color: $color-warning;
}
</style>
