import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemoryStore = defineStore('memory', () => {
    const memoryValue = ref(null)

    function saveMemory(value) {
        memoryValue.value = value
    }

    function clearMemory(){
        memoryValue.value = null
    }

    return {
    memoryValue,
    saveMemory,
    clearMemory,
  }
})