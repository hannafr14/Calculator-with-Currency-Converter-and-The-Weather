<script setup>
</script>

<template>
    <section class="panel weather-panel">
        <h2>El Tiempo - Asturias</h2>

        <div class="weather-card">
            <div class="weather-main">
                <div class="weather-icon" aria-hidden="true">
                    ☀
                </div>

                <div class="weather-summary">
                    <strong>18°C</strong>
                    <p>Parcialmente nublado</p>
                    <span>Sensación: 18°C</span>
                </div>
            </div>

            <ul class="weather-details">
                <li>
                    <span>Máxima</span>
                    <strong>20°C</strong>
                </li>
                <li>
                    <span>Mínima</span>
                    <strong>13°C</strong>
                </li>
                <li>
                    <span>Humedad</span>
                    <strong>72%</strong>
                </li>
                <li>
                    <span>Viento</span>
                    <strong>15 km/h</strong>
                </li>
            </ul>

            <small class="weather-updated">
                Actualizado: 20/05/2025 12:30
            </small>
        </div>
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
    border-radius: 50%;
    background: var(--color-sun);
    color: var(--color-white);
    font-size: 42px;
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

@media (min-width: 640px) {
  .weather-card {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }

  .weather-updated {
    grid-column: 1 / -1;
  }
}
</style>