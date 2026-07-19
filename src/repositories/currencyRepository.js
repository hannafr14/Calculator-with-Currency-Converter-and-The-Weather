import axios from 'axios'

const API_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest'

export async function fetchCurrencyRates() {
  const apiKey = import.meta.env.VITE_CURRENCYFREAKS_API_KEY

  const response = await axios.get(API_URL, {
    params: {
      apikey: apiKey,
      symbols: 'EUR,USD,JPY',
    },
  })

  return response.data
}