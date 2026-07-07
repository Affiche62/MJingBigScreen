<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div class="header-line"></div>
      <span class="chart-title">{{ title }}</span>
      <div class="header-line"></div>
    </div>
    <div class="chart-body">
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-wrapper {
  background: $bg-panel;
  border: 1px solid $border-color;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.chart-header {
  display: flex;
  align-items: center;
  padding: 10px 16px 0;
  gap: 10px;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, $color-primary, transparent);
}

.chart-title {
  font-size: 15px;
  font-weight: bold;
  color: $color-primary;
  white-space: nowrap;
  font-family: $font-title;
}

.chart-body {
  flex: 1;
  position: relative;
  padding: 6px 8px 8px;
  min-height: 0;
}

.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  z-index: 1;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: $color-primary;
  }
}

.corner-tl {
  top: 2px;
  left: 2px;

  &::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  &::after {
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
  }
}

.corner-tr {
  top: 2px;
  right: 2px;

  &::before {
    top: 0;
    right: 0;
    width: 100%;
    height: 2px;
  }

  &::after {
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
  }
}

.corner-bl {
  bottom: 2px;
  left: 2px;

  &::before {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  &::after {
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;
  }
}

.corner-br {
  bottom: 2px;
  right: 2px;

  &::before {
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
  }

  &::after {
    bottom: 0;
    right: 0;
    width: 2px;
    height: 100%;
  }
}
</style>
