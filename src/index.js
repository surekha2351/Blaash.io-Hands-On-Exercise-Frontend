import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);

// If you want to start measuring performance in your app
reportWebVitals();
