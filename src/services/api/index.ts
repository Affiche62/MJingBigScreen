import * as mockApi from './mock'
import * as realApi from './real'

const isMock = import.meta.env.VITE_USE_MOCK === 'true'

export const api = isMock ? mockApi : realApi
