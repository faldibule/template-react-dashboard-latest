import axios from "axios";

export let baseURL = import.meta.env.VITE_API_URL

const http = axios
http.defaults.baseURL = baseURL;
http.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Usertimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   }
   return config;
});
http.interceptors.response.use(undefined, err => {
      const error = err.response;
      if (error.config.url !== 'auth/user' && error.status === 401 && error.config && !error.config.__isRetryRequest && window.location.pathname !== '/custom-dashboard/') {
         window.alert('Please login first before continuing the process.')
         window.location = `/login`
      }
      return Promise.reject(err);
});


export default http;