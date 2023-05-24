import axios from 'axios';

const instance: any = axios.create({
  baseURL: import.meta.env.BASE_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default instance;