<script setup lang="ts">
import { ref, computed } from 'vue'
import type { OrderItem } from '@/types/dashboard'

const props = defineProps<{
  data: OrderItem[]
}>()

const isPaused = ref(false)

const doubledData = computed(() => [...props.data, ...props.data])

function getStatusClass(status: string) {
  if (status === '已完成') return 'status-done'
  if (status === '配送中') return 'status-delivering'
  return 'status-pending'
}
</script>

<template>
  <div
    class="scroll-table"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div class="table-header">
      <span class="col-order">订单号</span>
      <span class="col-product">商品名称</span>
      <span class="col-amount">金额</span>
      <span class="col-time">时间</span>
      <span class="col-status">状态</span>
    </div>
    <div class="table-viewport">
      <div class="table-body" :class="{ paused: isPaused }">
        <div
          v-for="(item, index) in doubledData"
          :key="`${item.id}-${index}`"
          class="table-row"
          :class="{ 'row-even': index % 2 === 1 }"
        >
          <span class="col-order">{{ item.orderNo.slice(-8) }}</span>
          <span class="col-product">{{ item.product }}</span>
          <span class="col-amount">¥{{ item.amount.toLocaleString() }}</span>
          <span class="col-time">{{ item.time.slice(-8) }}</span>
          <span class="col-status" :class="getStatusClass(item.status)">{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-table {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.table-header {
  display: flex;
  padding: 6px 8px;
  color: $color-text-dim;
  font-size: 11px;
  border-bottom: 1px solid $border-color;
  flex-shrink: 0;
  background: rgba(16, 24, 48, 0.95);
  z-index: 2;
  position: relative;
}

.table-viewport {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.table-body {
  animation: scroll-vertical 60s linear infinite;
}

.table-body.paused {
  animation-play-state: paused;
}

.table-row {
  display: flex;
  padding: 6px 8px;
  color: $color-text;
  height: 36px;
  align-items: center;
}

.row-even {
  background: rgba(0, 212, 255, 0.03);
}

.col-order {
  width: 80px;
  flex-shrink: 0;
}

.col-product {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-amount {
  width: 70px;
  flex-shrink: 0;
  text-align: right;
  color: $color-yellow;
}

.col-time {
  width: 60px;
  flex-shrink: 0;
  text-align: right;
}

.col-status {
  width: 48px;
  flex-shrink: 0;
  text-align: right;
}

.status-done {
  color: $color-success;
}

.status-delivering {
  color: $color-primary;
}

.status-pending {
  color: $color-warning;
}

@keyframes scroll-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
