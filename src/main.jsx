import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './route/route.jsx';
import { RouterProvider } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
