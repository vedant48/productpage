import axios from 'axios';
import '../axios';

export const createCategory = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    
    headers: {
      'Content-Type': 'application/json',
    },
    
  }
  const response = await axios.post('/api/category', data, config)
  return response;
  }

export const getCategories = async () => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
  }
  const response = await axios.get('/api/category', config)
  return response;
  }