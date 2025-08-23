
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    product: productReducer,

  },
});

export default store;
