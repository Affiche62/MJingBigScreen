export function formatNumber(num: number, decimals = 2): string {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(decimals) + '亿'
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(decimals) + '万'
  }
  return num.toLocaleString('zh-CN', { maximumFractionDigits: decimals })
}

export function formatCurrency(num: number): string {
  if (num >= 10000) {
    return '¥' + formatNumber(num)
  }
  return '¥' + num.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
}

export function formatPercent(num: number): string {
  return (num >= 0 ? '+' : '') + num.toFixed(1) + '%'
}

export function formatInt(num: number): string {
  return num.toLocaleString('zh-CN')
}
