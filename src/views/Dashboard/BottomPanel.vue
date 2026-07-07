<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'

const store = useDashboardStore()
const { orders } = storeToRefs(store)
</script>

<template>
  <div class="bottom-panel">
    <div class="bottom-header">
      <span class="bottom-title">数据总览滚动条</span>
      <span class="bottom-subtitle">共 {{ orders.length }} 条最新记录</span>
    </div>
    <div class="bottom-scroll">
      <div class="scroll-content">
        <span v-for="item in orders" :key="item.id" class="scroll-item">
          <b>{{ item.orderNo.slice(-8) }}</b>
          {{ item.product }}
          <span class="scroll-amount">¥{{ item.amount }}</span>
        </span>
        <span v-for="item in orders" :key="'dup-' + item.id" class="scroll-item">
          <b>{{ item.orderNo.slice(-8) }}</b>
          {{ item.product }}
          <span class="scroll-amount">¥{{ item.amount }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-panel {
  background: $bg-panel;
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
}

.bottom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-title {
  font-size: 12px;
  color: $color-primary;
  font-family: $font-title;
}

.bottom-subtitle {
  font-size: 10px;
  color: $color-text-dim;
}

.bottom-scroll {
  overflow: hidden;
  white-space: nowrap;
}

.scroll-content {
  display: inline-flex;
  animation: scroll-marquee 40s linear infinite;
  gap: 24px;
}

.scroll-item {
  font-size: 11px;
  color: $color-text;
  white-space: nowrap;
  display: inline-flex;
  gap: 6px;
  align-items: center;
}

.scroll-item b {
  color: $color-primary;
}

.scroll-amount {
  color: $color-yellow;
}

@keyframes scroll-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
