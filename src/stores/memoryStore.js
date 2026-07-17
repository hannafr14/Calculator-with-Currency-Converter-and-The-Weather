import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemoryStore = defineStore('memory', () => {
    const memoryValue = ref(null)

    function addMemory(value) {
        const currentMemory = Number(memoryValue.value || 0)
        const currentValue = Number(value)

        memoryValue.value = String(currentMemory + currentValue)
    }

    function clearMemory() {
        memoryValue.value = null
    }

    return {
    memoryValue,
    addMemory,
    clearMemory,
  }
})