import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://139.177.195.95/site',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default {
    login(credentials) {
        const data = JSON.stringify(credentials);
        const escapedData = `\"${data.replace(/\"/g, '\\\"')}\"`;  // Escapamos las comillas
        return apiClient.post('/login', `jsonSend=${escapedData}`);
    }
};