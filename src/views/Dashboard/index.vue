<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useScreenScale } from '@/hooks/useScreenScale'
import TopHeader from './TopHeader.vue'
import LeftPanel from './LeftPanel.vue'
import CenterPanel from './CenterPanel.vue'
import RightPanel from './RightPanel.vue'
import BottomPanel from './BottomPanel.vue'
import KpiCard from '@/components/common/KpiCard.vue'

const store = useDashboardStore()
const containerRef = ref<HTMLElement | null>(null)
useScreenScale(containerRef)

let pollTimer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await store.fetchAllData()
  pollTimer = setInterval(() => {
    store.fetchAllData()
  }, 30000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<template>
  <div ref="containerRef" class="dashboard">
    <TopHeader />

    <div class="kpi-row">
      <KpiCard v-for="kpi in store.kpiList" :key="kpi.id" :data="kpi" />
    </div>

    <div class="main-grid">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>

    <BottomPanel />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  width: 1920px;
  height: 1080px;
  padding: 0 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: $gap;
  height: 120px;
  flex-shrink: 0;
}

.main-grid {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  gap: $gap;
  flex: 1;
  min-height: 0;
}

.bottom-panel {
  flex-shrink: 0;
}
</style>
