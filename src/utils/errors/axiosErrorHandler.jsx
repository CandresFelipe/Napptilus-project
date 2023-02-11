import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

export function AxiosErrorHandler({ children }) {
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((request) => {
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status) {
          switch (error.response.status) {
            case 500:
              return (
                <div>
                  <Typography>{error.response.message}</Typography>
                </div>
              );
          }
        }
        return error;
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
}
