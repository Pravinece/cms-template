import Axios from "axios";
import { clearAuth, getSecureToken } from "../lib/cookieAuth";

const site = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_APP_URL;

const publicEndpoints = ['/api/loginadmin'];

const instance = Axios.create({
  baseURL: site,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - validate token
instance.interceptors.request.use(
  (request) => {
    const isPublicEndpoint = publicEndpoints.some(endpoint => request.url?.includes(endpoint));
    
    if (isPublicEndpoint) {
      return request;
    }
    
    const token = getSecureToken();
    
    if (!token) {
      clearAuth();
      if (window.location.pathname !== '/canara') {
        window.location.href = '/canara';
      }
      return Promise.reject(new Error('No valid token'));
    }
    
    request.headers.auth = token;
    
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle unauthorized responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const isPublic = publicEndpoints.some(ep => error.config?.url?.includes(ep));
    if (!isPublic && (error.response?.status === 401 || error.response?.status === 403)) {
      clearAuth();
      if (window.location.pathname !== BASE_URL) {
        window.location.href = BASE_URL;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;