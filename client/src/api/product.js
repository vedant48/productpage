import axios from 'axios';


export const createProduct = async (data) => {
  const config = {
    // baseURL: "http://localhost:5000/",
    withCredentials: true,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const response = await axios.post('/api/product', data, config);
  return response;
}
