import axios from 'axios';

import { API_SCHEME, API_DOMAIN, API_PORT } from '@env';

const api = axios.create({
  baseURL: `${API_SCHEME}://${API_DOMAIN}:${API_PORT}`,
});

export default api;
