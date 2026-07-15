<script setup>
</script>

<template>
    <section class="panel currency-panel">
        <h2>Conversor de Divisas</h2>

        <div class="currency-form">
            <label class="form-field">
                <span>Cantidad</span>
                <input type="number" value="100">
            </label>

            <label class="form-field">
                <span>De</span>
                <select>
                    <option>EUR (€)</option>
                    <option>USD ($)</option>
                    <option>JPY (¥)</option>
                </select>
            </label>

            <label class="form-field">
                <span>A</span>
                <select>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>JPY (¥)</option>
                </select>
            </label>

            <button class="convert-button" type="button">
                Convertir
            </button>
        </div>

        <div class="currency-result">
            <div>
                <span>Resultado:</span>
                <strong>108.47 USD</strong>
            </div>

            <div class="currency-rate">
                <span>1 EUR = 1.0847 USD</span>
                <small>Actualizado: 20/05/2025 12:30</small>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.currency-panel {
    padding: 21px;
    margin: 21px;
    border-radius: 14px;
    background: var(--color-success-soft);
    border: 1px solid rgba(16, 185, 129, 0.25);

    h2 {
        margin-bottom: 22px;
        margin-top: 0;
        font-size: 16px;
        font-weight: 600;
        line-height: 25px;
        color: var(--color-success-dark);
    }
}

.currency-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

.form-field {
    display: grid;
    gap: 7px;

    span {
        font-size: 12px;
        color: var(--color-text);
    }

    input,
    select {
        width: 100%;
        min-height: 45px;
        padding: 12px;
        border: 1px solid var(--color-border);
        border-radius: 7px;
        background: var(--color-white);
        color: var(--color-text);
    }

    input:focus,
    select:focus {
        outline: none;
        border-color: var(--color-success);
    }

    select {
        appearance: none;
        padding-right: 40px;
        background-image: linear-gradient(45deg, transparent 50%, var(--color-text) 50%),
            linear-gradient(135deg, var(--color-text) 50%, transparent 50%);
        background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%;
        background-size: 6px 6px, 6px 6px;
        background-repeat: no-repeat;
    }
}

.convert-button {
    min-height: 45px;
    min-width: 115px;
    padding: 0 11px;
    border-radius: 7px;
    background: var(--color-success);
    color: var(--color-white);
    font-size: 14px;
    font-weight: 700;
}

.currency-result {
    display: flex;
    gap: 14px;
    justify-content: space-between;
    margin-top: 22px;
    padding: 14px;
    border-radius: 10px;
    background: var(--color-white);
    border: 1px solid rgba(16, 185, 129, 0.12);

    span {
        display: block;
        font-size: 11px;
        color: var(--color-success-dark);
    }

    strong {
        display: block;
        font-size: 27px;
        color: var(--color-success-dark);
    }

    .currency-rate {
        text-align: right;

        small {
            display: block;
            font-size: 11px;
            color: var(--color-muted);
        }
    }
}

@media (min-width: 640px) {
    .currency-form {
        grid-template-columns: 1.1fr 1fr 1fr auto;
        align-items: end;
    }
}
</style>