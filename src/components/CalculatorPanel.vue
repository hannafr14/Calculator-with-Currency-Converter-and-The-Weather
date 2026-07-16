<script setup>
import { ref } from 'vue'
import { useMemoryStore } from '../stores/memoryStore'

const displayValue = ref('0')
const firstNumber = ref(null)
const selectedOperator = ref(null)
const shouldResetDisplay = ref(false)

const memoryStore = useMemoryStore()

function pressDigit(digit) {
    if (displayValue.value === 'Error') {
        displayValue.value = digit
        return
    }

    if (shouldResetDisplay.value) {
        displayValue.value = digit
        shouldResetDisplay.value = false
        return
    }

    if (displayValue.value.length >= 12) {
        return
    }

    if (displayValue.value === '0') {
        displayValue.value = digit
    } else {
        displayValue.value += digit
    } 
}

function clearCalculator() {
    displayValue.value = '0'
    firstNumber.value = null
    selectedOperator.value = null
    shouldResetDisplay.value = false
}

function pressDecimal() {
    if (!displayValue.value.includes('.')) {
        displayValue.value +='.'
    }
}

function chooseOperator(operator) {
    firstNumber.value = Number(displayValue.value)
    selectedOperator.value = operator
    shouldResetDisplay.value = true
}

function calculateResult() {
    if (firstNumber.value === null || selectedOperator.value === null) {
        return
    }

    const secondNumber = Number(displayValue.value)
    let result = 0

    if (selectedOperator.value === '+') {
        result = firstNumber.value + secondNumber
    }

     if (selectedOperator.value === '-') {
        result = firstNumber.value - secondNumber
    }

    if (selectedOperator.value === '*') {
        result = firstNumber.value * secondNumber
    }

    if (selectedOperator.value === '/') {
        if (secondNumber === 0) {
            displayValue.value = 'Error'
            firstNumber.value = null
            selectedOperator.value = null
            shouldResetDisplay.value = true
            return
        }

        result = firstNumber.value / secondNumber
    }

    displayValue.value = String(result)
    firstNumber.value = null
    selectedOperator.value = null
    shouldResetDisplay.value = true
}

function saveToMemory() {
  if (displayValue.value === 'Error') {
    return
  }

  memoryStore.saveMemory(displayValue.value)
}

function readMemory() {
  if (memoryStore.memoryValue === null) {
    return
  }

  displayValue.value = memoryStore.memoryValue
  shouldResetDisplay.value = true
}

function clearMemory() {
  memoryStore.clearMemory()
}
</script>

<template>
    <section class="panel calculator-panel">
        <h2>CALCULADORA</h2>

        <div class="calculator-display">
            {{ displayValue }}
        </div>

        <div class="calculator-grid">
            <button class="memory-button" type="button" @click="clearCalculator">CE</button>
            <button class="memory-button" type="button" @click="saveToMemory">M+</button>
            <button class="memory-button" type="button" @click="readMemory">MR</button>
            <button class="memory-button" type="button" @click="clearMemory">MC</button>

            <button type="button" @click="pressDigit('7')">7</button>
            <button type="button" @click="pressDigit('8')">8</button>
            <button type="button" @click="pressDigit('9')">9</button>
            <button class="operator-button" type="button" @click="chooseOperator('/')">÷</button>

            <button type="button" @click="pressDigit('4')">4</button>
            <button type="button" @click="pressDigit('5')">5</button>
            <button type="button" @click="pressDigit('6')">6</button>
            <button class="operator-button" type="button" @click="chooseOperator('*')">×</button>

            <button type="button" @click="pressDigit('1')">1</button>
            <button type="button" @click="pressDigit('2')">2</button>
            <button type="button" @click="pressDigit('3')">3</button>
            <button class="operator-button" type="button" @click="chooseOperator('-')">−</button>

            <button type="button" @click="pressDigit('0')">0</button>
            <button type="button" @click="pressDecimal">.</button>
            <button class="operator-button" type="button" @click="calculateResult">=</button>
            <button class="operator-button" type="button" @click="chooseOperator('+')">+</button>
        </div>
    </section>

</template>

<style scoped lang="scss">
.panel {
    padding: 21px;
    margin: 21px;
    border-radius: 14px;
}

.calculator-panel {
    border: 1px solid var(--color-primary-soft);

    h2 {
        margin: 0;
        font-size: 12px;
        font-weight: 600;
        color: var(--color-primary);
        line-height: 18px;
        letter-spacing: 0.6px;
    }
}

.calculator-display {
    margin: 14px 0;
    padding: 21px;
    border-radius: 10px;
    background: var(--color-display);
    color: var(--color-white);
    text-align: right;
    font-size: 43px;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 1.5px;
}

.calculator-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    width: 100%;
    min-height: 50px;
    background: var(--color-button);
    color: var(--color-text);
    font-weight: 600;
    font-size: 18px;
    border-radius: 10px;
    transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.08s ease;
}

button:active {
  transform: scale(0.95);
  filter: brightness(0.88);
  box-shadow: inset 0 3px 8px rgba(30, 41, 59, 0.22);
}

button:hover {
  filter: brightness(0.98);
}

.memory-button {
    background: var(--color-primary-soft);
    color: var(--color-primary-dark);
    font-size: 14px;
    font-weight: 700;
}

.memory-button:active {
  filter: brightness(0.9);
  box-shadow: inset 0 3px 8px rgba(99, 102, 241, 0.28);
}

.operator-button {
    background: var(--color-primary);
    color: var(--color-white);
    font-size: 21px;
  }

.operator-button:active {
  filter: brightness(0.78);
  box-shadow: inset 0 3px 10px rgba(30, 41, 59, 0.32);
}

</style>
