// import axios from 'axios';
// const request = axios.create({
// 	timeout: 30000,
// });

// request.interceptors.request.use((config) => {
// 	return config;
// }, (error) => {
// 	return Promise.reject(error);
// });
// request.interceptors.response.use((response) => {
// 	return response.data;
// }, (error) => {
// 	return Promise.reject(error);
// });
// export default request;





/* eslint-disable */
import axios from 'axios';
import { Toast } from 'vant';
import Vue from 'vue';
Vue.use(Toast);


const baseUrl = localStorage.getItem('baseUrl_v2') || 'https://xxx.xxx.com';


const instance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

instance.interceptors.request.use( (config)=> {
  return config;
},  (error)=> {
  return Promise.reject(error);
});

instance.interceptors.response.use( (response)=> {
  return response.data;
},  (error)=> {
  return Promise.reject(error);
});

export default instance
