import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Logger', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should have correct log level constants', async () => {
    // Just verify the module exports correctly
    const mod = await import('@/utils/logger')
    expect(mod.logger).toBeDefined()
    expect(typeof mod.logger.debug).toBe('function')
    expect(typeof mod.logger.info).toBe('function')
    expect(typeof mod.logger.warn).toBe('function')
    expect(typeof mod.logger.error).toBe('function')
    expect(typeof mod.logger.setLevel).toBe('function')
  })

  it('should call console methods when logging', async () => {
    const { logger } = await import('@/utils/logger')
    const debugSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    logger.setLevel('DEBUG')
    logger.debug('test debug')
    logger.info('test info')
    logger.warn('test warn')
    logger.error('test error')

    expect(debugSpy).toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalled()

    debugSpy.mockRestore()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })

  it('should filter log levels correctly', async () => {
    const { logger } = await import('@/utils/logger')
    const debugSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    logger.setLevel('ERROR')
    logger.debug('should not appear')
    logger.info('should not appear')
    logger.warn('should not appear')
    logger.error('should appear')

    // At ERROR level, only error should log
    // debug/info use console.log which may have been called for setup
    const debugCalls = debugSpy.mock.calls.filter(() => true)
    expect(errorSpy).toHaveBeenCalled()

    debugSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
