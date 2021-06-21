import axios from 'axios'

const { REACT_APP_IBGE_API } = process.env

const ibge = axios.create({
  baseURL: REACT_APP_IBGE_API
})

export default ibge
