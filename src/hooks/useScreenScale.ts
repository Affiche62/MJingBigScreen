import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { logger } from '@/utils/logger'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

export function useScreenScale(containerRef: Ref<HTMLElement | null>) {
  const scale = ref(1)

  function updateScale() {
    if (!containerRef.value) return
    const { innerWidth: w, innerHeight: h } = window
    const scaleX = w / DESIGN_WIDTH
    const scaleY = h / DESIGN_HEIGHT
    scale.value = Math.min(scaleX, scaleY)
    containerRef.value.style.transform = `scale(${scale.value})`
    containerRef.value.style.transformOrigin = 'left top'
    containerRef.value.style.width = DESIGN_WIDTH + 'px'
    containerRef.value.style.height = DESIGN_HEIGHT + 'px'
    logger.debug(`Screen scale: ${scale.value.toFixed(4)} (${w}x${h})`)
  }

  onMounted(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale)
  })

  return { scale, updateScale }
}
