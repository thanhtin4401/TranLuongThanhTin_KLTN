import axios from 'axios';
import { localStorageService } from './localStorageService';

export const TOKEN = process.env.REACT_APP_TOKEN;

export const httpsKLTN = axios.create({
  baseURL: process.env.REACT_APP_API_KLTN,
  headers: {
    Token: localStorageService.get('accessToken'),
    "Content-Type": 'application/json',
  },
});

export const formDataRequest = axios.create({
  baseURL: process.env.REACT_APP_API_KLTN,
  headers: {
    Token: localStorageService.get('accessToken'),
    "Content-Type": 'multipart/form-data',
  },
});

httpsKLTN.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpsKLTN.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

formDataRequest.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

formDataRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
