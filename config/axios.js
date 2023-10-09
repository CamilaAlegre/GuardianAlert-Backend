const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = req.headers.authorization;
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

module.exports = api;
