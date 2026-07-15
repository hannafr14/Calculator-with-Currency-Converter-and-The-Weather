<script setup>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import CalculatorPanel from './components/CalculatorPanel.vue';
import CurrencyConverter from './components/CurrencyConverter.vue';
import WeatherPanel from './components/WeatherPanel.vue';

</script>

<template>
  <main class="app">
    <section class="app-shell">
      <AppHeader />
      <CalculatorPanel />
      <CurrencyConverter />
      <WeatherPanel />
      <AppFooter />
    </section>
  </main>
</template>

<style scoped>

</style>
