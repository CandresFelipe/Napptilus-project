import axios from 'axios';

import { VITE_API_URL } from '../config/index';

export const appClient = axios.create({
    baseURL: VITE_API_URL
});
