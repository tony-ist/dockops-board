import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
