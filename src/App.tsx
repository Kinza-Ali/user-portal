import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './routes';
import { store } from './store/index';

// export const { store, persistor } = reduxStore();

export const  App = () => {
  return (
    <Provider store={ store }>
    <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
