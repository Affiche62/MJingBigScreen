const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 } as const

type LogLevel = keyof typeof LOG_LEVELS

class Logger {
  private level: number

  constructor() {
    this.level = import.meta.env.PROD ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG
  }

  private getTimestamp(): string {
    const now = new Date()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const s = String(now.getSeconds()).padStart(2, '0')
    return `[${h}:${m}:${s}]`
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= this.level
  }

  debug(msg: string, ...args: unknown[]): void {
    if (!this.shouldLog('DEBUG')) return
    console.log(`%c${this.getTimestamp()} [DEBUG] ${msg}`, 'color: #888', ...args)
  }

  info(msg: string, ...args: unknown[]): void {
    if (!this.shouldLog('INFO')) return
    console.log(`%c${this.getTimestamp()} [INFO] ${msg}`, 'color: #00d4ff', ...args)
  }

  warn(msg: string, ...args: unknown[]): void {
    if (!this.shouldLog('WARN')) return
    console.warn(`%c${this.getTimestamp()} [WARN] ${msg}`, 'color: #f59e0b', ...args)
  }

  error(msg: string, ...args: unknown[]): void {
    if (!this.shouldLog('ERROR')) return
    console.error(`%c${this.getTimestamp()} [ERROR] ${msg}`, 'color: #ff4444', ...args)
  }

  setLevel(level: LogLevel): void {
    this.level = LOG_LEVELS[level]
  }
}

export const logger = new Logger()
