import axios from 'axios'

const API_BASE_URL = 'https://api.el-tiempo.net/json/v3'
const ASTURIAS_CODE = '33'

export async function fetchNationalWeather() {
    const response = await axios.get(`${API_BASE_URL}/general`)

    return response.data
}

export async function fetchProvinces() {
  const response = await axios.get(`${API_BASE_URL}/provincias`)

  return response.data
}

export async function fetchMunicipalitiesByProvince(provinceCode) {
  const response = await axios.get(
    `${API_BASE_URL}/provincias/${provinceCode}/municipios`,
  )

  return response.data
}

export async function fetchMunicipalityWeather(provinceCode, municipalityId) {
  const response = await axios.get(
    `${API_BASE_URL}/provincias/${provinceCode}/municipios/${municipalityId}`,
  )

  return response.data
}

export async function fetchAsturiasMunicipalities() {
    const response = await axios.get(`${API_BASE_URL}/provincias/${ASTURIAS_CODE}/municipios`)

    return response.data
}

export async function fetchAsturiasMunicipalityWeather(municipalityId) {
    const response = await axios.get(
  `${API_BASE_URL}/provincias/${ASTURIAS_CODE}/municipios/${municipalityId}`
)

return response.data
}