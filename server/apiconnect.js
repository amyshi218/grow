const axios = require('axios')
const url = `https://swapi.dev/api/planets/?page=1`

const getPlanets = (end = url) => {
  return axios.get(end)
}

const getResidents = (resident) => {
  return axios.get(resident)
}


const getPerson = (person) => {
  return axios.get(person)
}

module.exports = {
  getPlanets,
  getResidents,
  getPerson
}