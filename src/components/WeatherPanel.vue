<script setup>
import { onMounted, ref, watch } from 'vue'
import sunIcon from '../assets/weather/sun.svg'
import cloudIcon from '../assets/weather/cloud.svg'
import fogIcon from '../assets/weather/fog.svg'
import partlyCloudIcon from '../assets/weather/partly-cloud.svg'
import rainIcon from '../assets/weather/rain.svg'
import snowIcon from '../assets/weather/snow.svg'
import stormIcon from '../assets/weather/storm.svg'

import {
    handleAsturiasMunicipalitiesRequest,
    handleAsturiasMunicipalityWeatherRequest,
    handleMunicipalitiesByProvinceRequest,
    handleMunicipalityWeatherRequest,
    handleProvincesRequest,
} from '../controllers/weatherController'

const selectedMode = ref('national')
const provinces = ref([])
const selectedProvince = ref('')
const municipalities = ref([])
const selectedMunicipality = ref('')
const weather = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

function getWeatherIcon(stateSky) {
    const state = (stateSky || '').toLowerCase()

    if (state.includes('tormenta')) {
        return stormIcon
    }

    if (state.includes('nieve')) {
        return snowIcon
    }

    if (
        state.includes('lluvia') ||
        state.includes('chubasco') ||
        state.includes('llovizna')
    ) {
        return rainIcon
    }

    if (state.includes('niebla') || state.includes('bruma')) {
        return fogIcon
    }

    if (
        state.includes('poco nuboso') ||
        state.includes('intervalos nubosos') ||
        state.includes('nubes altas')
    ) {
        return partlyCloudIcon
    }

    if (
        state.includes('nuboso') ||
        state.includes('cubierto') ||
        state.includes('nube')
    ) {
        return cloudIcon
    }

    return sunIcon
}

async function loadProvinces() {
    try {
        provinces.value = await handleProvincesRequest()

        if (provinces.value.length > 0) {
        selectedProvince.value = provinces.value[0].CODPROV
        }
    } catch (error) {
        errorMessage.value = 'No se pudieron cargar las provincias'
    }
}

async function loadMunicipalitiesByProvince() {
    if (!selectedProvince.value) {
        return
    }

    try {
        municipalities.value = await handleMunicipalitiesByProvinceRequest(selectedProvince.value)

        if (municipalities.value.length > 0) {
        selectedMunicipality.value = municipalities.value[0].id
        }
    } catch (error) {
        errorMessage.value = 'No se pudieron cargar los municipios'
    }
}

async function loadMunicipalities() {
    try {
        municipalities.value = await handleAsturiasMunicipalitiesRequest()

        if (municipalities.value.length > 0) {
            selectedMunicipality.value = municipalities.value[0].id
        }
  } catch (error) {
        errorMessage.value = 'No se pudieron cargar los municipios'
  }
}

async function selectNationalMode() {
    selectedMode.value = 'national'

    if (provinces.value.length === 0) {
        await loadProvinces()
    }

    await loadMunicipalitiesByProvince()
    await loadWeather()
}

async function selectAsturiasMode() {
    selectedMode.value = 'asturias'
    selectedProvince.value = '33'

        await loadMunicipalities()
        await loadWeather()
}

async function loadWeather() {
    if (!selectedMunicipality.value) {
        return
    }

    errorMessage.value = ''
    isLoading.value = true

    try {
        if (selectedMode.value === 'national') {
        weather.value = await handleMunicipalityWeatherRequest(
            selectedProvince.value,
            selectedMunicipality.value,
        )
        } else {
        weather.value = await handleAsturiasMunicipalityWeatherRequest(selectedMunicipality.value)
        }
    } catch (error) {
        errorMessage.value = error.message || 'No se pudo cargar el tiempo'
    } finally {
        isLoading.value = false
    }
}

watch(selectedProvince, async () => {
    if (selectedMode.value === 'national') {
        await loadMunicipalitiesByProvince()
    }
})

watch(selectedMunicipality, async () => {
    await loadWeather()
    })

onMounted(async () => {
    await selectNationalMode()
})

</script>

<template>
    <section class="panel weather-panel">
        <h2>El Tiempo</h2>

        <div class="weather-tabs">
            <button class="weather-tab" :class="{ active: selectedMode === 'national' }" type="button" @click="selectNationalMode" >
                Nacional
            </button>

            <button class="weather-tab" :class="{ active: selectedMode === 'asturias' }" type="button" @click="selectAsturiasMode">
                Asturias
            </button>
        </div>

        <div class="weather-form">
            <label v-if="selectedMode === 'national'" class="weather-field">
                <span>Provincia</span>

                <select v-model="selectedProvince">
                <option
                    v-for="province in provinces"
                    :key="province.CODPROV"
                    :value="province.CODPROV"
                >
                    {{ province.NOMBRE_PROVINCIA }}
                </option>
                </select>
            </label>

            <label v-if="selectedMode === 'asturias'" class="weather-field">
                <span>Municipio</span>

                <select v-model="selectedMunicipality">
                    <option
                    v-for="municipality in municipalities"
                    :key="municipality.id"
                    :value="municipality.id"
                    >
                    {{ municipality.name }}
                    </option>
                </select>
            </label>

            <p v-if="isLoading" class="weather-loading">
                Cargando...
            </p>
        </div>

        <div  v-if="weather" class="weather-card">
            <div class="weather-main">
                <div class="weather-icon" aria-hidden="true">
                    <img :src="getWeatherIcon(weather.stateSky)" :alt="weather.description">
                </div>

                <div class="weather-summary">
                    <strong>{{ weather.temperature }} C</strong>
                    <p>{{ weather.description }}</p>
                    <span>{{ weather.place }}</span>
                </div>
            </div>

            <ul class="weather-details">
                <li>
                    <span>Máxima</span>
                    <strong>{{ weather.maxTemp }} C</strong>
                </li>
                <li>
                    <span>Mínima</span>
                    <strong>{{ weather.minTemp }} C</strong>
                </li>
                <li>
                    <span>Humedad</span>
                    <strong>{{ weather.humidity }}</strong>
                </li>
                <li>
                    <span>Viento</span>
                    <strong>{{ weather.wind }}</strong>
                </li>
            </ul>

            <small class="weather-updated">
                Actualizado: {{ weather.updatedAt || 'Sin datos' }}
            </small>
        </div>

        <p v-if="errorMessage" class="weather-error">
            {{ errorMessage }}
        </p>
    </section>
</template>

<style scoped lang="scss">
.weather-panel {
    padding: 21px;
    margin: 21px;
    border-radius: 14px;
    background: var(--color-weather-soft);
    border: 1px solid rgba(30, 64, 175, 0.18);

    h2 {
        font-size: 16px;
        font-weight: 600;
        line-height: 25px;
        color: var(--color-weather);
    }
}

.weather-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 18px;
}

.weather-tab {
    min-height: 42px;
    border-radius: 8px;
    background: var(--color-white);
    color: var(--color-weather);
    border: 1px solid rgba(30, 64, 175, 0.18);
    font-size: 13px;
    font-weight: 700;
}

.weather-tab.active {
    background: var(--color-weather);
    color: var(--color-white);
}

.weather-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 18px;
}

.weather-field {
    display: grid;
    gap: 7px;

    span {
        font-size: 12px;
        color: var(--color-text);
    }

    select {
        width: 100%;
        min-height: 45px;
        padding: 12px 40px 12px 12px;
        border: 1px solid var(--color-border);
        border-radius: 7px;
        background: var(--color-white);
        color: var(--color-text);
        appearance: none;

        &:focus {
            outline: 1px solid rgba(30, 64, 175, 0.16);
        }
    }
}

.weather-loading {
  margin: 0;
  align-self: end;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-weather);
}

.weather-card {
    display: grid;
    gap: 29px;
    padding: 22px;
    border-radius: 14px;
    background: var(--color-white);
    border: 1px solid rgba(30, 64, 175, 0.12);
}

.weather-main {
    display: flex;
    align-items: center;
    gap: 22px;
}

.weather-icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;

  img {
    width: 72px;
    height: 72px;
    object-fit: contain;
  }
}

.weather-summary {
    strong {
        display: block;
        font-size: 43px;
        color: var(--color-text);
    }

    p {
        font-size: 14px;
        color: var(--color-text);
        margin: 0;
    }

    span {
        font-size: 12px;
        color: var(--color-muted);
    }
}

.weather-details {
    display: grid;
    gap: 11px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(30, 64, 175, 0.12);
        font-size: 13px;
        color: var(--color-muted);
    }

    strong {
        color: var(--color-text);
    }
}

.weather-updated {
    text-align: right;
    font-size: 11px;
    color: var(--color-muted);
}

.weather-error {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--color-danger);
}

@media (min-width: 640px) {
    .weather-form {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: end;
    }

    .weather-card {
        grid-template-columns: 1.2fr 1fr;
        align-items: center;
    }

    .weather-updated {
        grid-column: 1 / -1;
    }
}
</style>