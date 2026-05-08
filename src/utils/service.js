import Axios from "axios";
import { clearAuth } from "../lib/cookieAuth";

// const site = import.meta.env.VITE_API_URL;
const site = '';

const publicEndpoints = ['/api/admin/login'];

const instance = Axios.create({
  baseURL: site,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});   

// Request interceptor - skip auth header for public endpoints
instance.interceptors.request.use(
  (request) => request,
  
  (error) => Promise.reject(error)
);

// Response interceptor - handle unauthorized responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearAuth();
    }
    return Promise.reject(error);
  }
);

export default instance;