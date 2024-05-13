import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
    },
    params: {
        language: 'en-US',
    },
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${process.env.TMDB_TOKEN}`;

    return config;
}, Promise.reject);
