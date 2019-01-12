import React from 'react';
import ReactDOM from 'react-dom';
import App from './dev/'; 

import "./client";

const element = document.getElementById('root');

if(element) {
  ReactDOM.render(<App
    assetsBaseUrl="https://modxclub.ru/"
  />, element);
}

