import axios, { AxiosRequestConfig } from 'axios';

import { NEXT_PUBLIC_HOST_DATA_KEY } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosDataInstance = axios.create({ baseURL: 'https://api.values.seiki.co' });

axiosDataInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { axiosDataInstance };

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosDataInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: 'COMING-SOON',
    login: '/api/login_check',
    register: 'COMING-SOON',
  },
  data: {
    poi: {
      get: '/poi',
    },
    credits: {
      get: '/credits',
    },
  },
};
