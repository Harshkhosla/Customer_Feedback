import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api', // Backend URL, adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
