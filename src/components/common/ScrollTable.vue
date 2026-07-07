<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { OrderItem } from '@/types/dashboard'

const props = defineProps<{
  data: OrderItem[]
}>()

const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
const scrollIndex = ref(0)

function startScroll() {
  timer = setInterval(() => {
    if (!isPaused.value && props.data.length > 1) {
      scrollIndex.value = (scrollIndex.value + 1) % props.data.length
    }
  }, 3000)
}

function getStatusClass(status: string) {
  if (status === '已完成') return 'status-done'
  if (status === '配送中') return 'status-delivering'
  return 'status-pending'
}

onMounted(() => {
  startScroll()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
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
    <div class="table-body" :style="{ transform: `translateY(-${scrollIndex * 36}px)` }">
      <div
        v-for="(item, index) in data"
        :key="item.id"
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
</template>

<style scoped lang="scss">
.scroll-table {
  font-size: 12px;
  overflow: hidden;
}

.table-header {
  display: flex;
  padding: 6px 8px;
  color: $color-text-dim;
  font-size: 11px;
  border-bottom: 1px solid $border-color;
}

.table-body {
  transition: transform 0.6s ease-in-out;
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
</style>
