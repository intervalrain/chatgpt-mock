import { DocumentResponse, DSM } from '@/app/types';
import { BASE_URL } from '@/app/config';
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 300, // default status checking function
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export interface TokenResponse {
  userId: string,
  userName: string,
  token: string,
  email: string,
  expireTime: Date,
}

export const authenticate = async ():Promise<TokenResponse> => {
  try {
    const response = await api.get<TokenResponse>('/Auth/login');
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('tokenExpireTime', response.data.expireTime.toString());
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('userName', response.data.userName);
    localStorage.setItem('email', response.data.email);
    return response.data;
  } catch (error) {
    console.error('Error authenticating:', error);
    throw error;
  }
};

export const getDocuments = async(): Promise<DSM[]> => {
  try {
    const response = await api.get<DocumentResponse>('/Document/getDocuments');
    console.log(response.data);
    return response.data.documents;
  }
  catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}
