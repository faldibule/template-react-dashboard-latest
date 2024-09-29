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


export default http;