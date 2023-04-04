import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import  store  from './redux/store'
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(

  <React.StrictMode>
   <CookiesProvider>
      <Provider store={store}>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App />
                </LocalizationProvider>
            </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
