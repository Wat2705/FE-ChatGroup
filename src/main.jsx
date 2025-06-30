import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './config/axios.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; // Import store và persistor
import { message } from 'antd';

message.config({
  duration: 1,
  maxCount: 1,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);