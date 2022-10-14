import { configureStore } from '@reduxjs/toolkit';
import zipcode from './zipcode';
import AuthReducer from './auth';
import loadingReducer from './loading';
const store = configureStore({
  reducer: {
    zipCode: zipcode,
    auth: AuthReducer,
    loading: loadingReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
