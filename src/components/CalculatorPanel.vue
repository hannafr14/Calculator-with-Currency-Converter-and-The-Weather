<script setup>
import { ref } from 'vue'

const displayValue = ref('0')

function pressDigit(digit) {
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
}

function pressDecimal() {
    if (!displayValue.value.includes('.')) {
        displayValue.value +='.'
    }
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
            <button class="memory-button" type="button">M+</button>
            <button class="memory-button" type="button">MR</button>
            <button class="memory-button" type="button">MC</button>

            <button type="button" @click="pressDigit('7')">7</button>
            <button type="button" @click="pressDigit('8')">8</button>
            <button type="button" @click="pressDigit('9')">9</button>
            <button class="operator-button" type="button">÷</button>

            <button type="button" @click="pressDigit('4')">4</button>
            <button type="button" @click="pressDigit('5')">5</button>
            <button type="button" @click="pressDigit('6')">6</button>
            <button class="operator-button" type="button">×</button>

            <button type="button" @click="pressDigit('1')">1</button>
            <button type="button" @click="pressDigit('2')">2</button>
            <button type="button" @click="pressDigit('3')">3</button>
            <button class="operator-button" type="button">−</button>

            <button type="button" @click="pressDigit('0')">0</button>
            <button type="button" @click="pressDecimal">.</button>
            <button class="operator-button" type="button">=</button>
            <button class="operator-button" type="button">+</button>
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
}

.memory-button {
    background: var(--color-primary-soft);
    color: var(--color-primary-dark);
    font-size: 14px;
    font-weight: 700;
}

.operator-button {
    background: var(--color-primary);
    color: var(--color-white);
    font-size: 21px;
  }

</style>
