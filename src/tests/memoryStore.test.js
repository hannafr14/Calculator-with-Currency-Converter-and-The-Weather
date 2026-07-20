import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMemoryStore } from '../stores/memoryStore'

describe('memoryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty memory', () => {
    const memoryStore = useMemoryStore()

    expect(memoryStore.memoryValue).toBe(null)
  })

  it('saves a number in memory', () => {
    const memoryStore = useMemoryStore()

    memoryStore.addMemory('7')

    expect(memoryStore.memoryValue).toBe('7')
  })

  it('adds new values to existing memory', () => {
    const memoryStore = useMemoryStore()

    memoryStore.addMemory('12')
    memoryStore.addMemory('30')

    expect(memoryStore.memoryValue).toBe('42')
  })

  it('clears memory', () => {
    const memoryStore = useMemoryStore()

    memoryStore.addMemory('15')
    memoryStore.clearMemory()

    expect(memoryStore.memoryValue).toBe(null)
  })
})