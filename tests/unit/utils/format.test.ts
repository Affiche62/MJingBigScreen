import { describe, it, expect } from 'vitest'
import { formatNumber, formatCurrency, formatPercent, formatInt } from '@/utils/format'

describe('formatNumber', () => {
  it('should format numbers >= 1亿 as 亿', () => {
    expect(formatNumber(150000000)).toBe('1.50亿')
    expect(formatNumber(100000000)).toBe('1.00亿')
  })

  it('should format numbers >= 1万 as 万', () => {
    expect(formatNumber(50000)).toBe('5.00万')
    expect(formatNumber(12345.67)).toBe('1.23万')
  })

  it('should format numbers < 1万 as locale string', () => {
    expect(formatNumber(9999)).toContain('9,999')
  })
})

describe('formatCurrency', () => {
  it('should prefix with ¥', () => {
    expect(formatCurrency(1000)).toContain('¥')
  })
})

describe('formatPercent', () => {
  it('should show sign and percentage', () => {
    expect(formatPercent(12.5)).toBe('+12.5%')
    expect(formatPercent(-2.1)).toBe('-2.1%')
  })
})

describe('formatInt', () => {
  it('should format as locale string', () => {
    expect(formatInt(86423)).toContain('86,423')
  })
})
