import axios from 'axios';

import { IBGE_API_URL } from '@env';

const ibge = axios.create({
  baseURL: IBGE_API_URL,
});

export default ibge;
