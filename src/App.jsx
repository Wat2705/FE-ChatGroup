import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './redux/auth';
import axiosInstance from './config/axios'; // Thay axios bằng axiosInstance
import { RouterProvider } from 'react-router-dom';
import './global.scss';
import { router } from './routers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
      axiosInstance
        .get('/verify-token')
        .then(() => {})
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            dispatch(logout()); // Sử dụng action logout
            window.location.href = '/login';
          }
        });
    }
  }, [dispatch]);

  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
}

export default App;