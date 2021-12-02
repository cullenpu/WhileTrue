import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as dotenv from 'dotenv';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App';
import reportWebVitals from './reportWebVitals';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  blue: {
    500: '#47ADE4',
    900: '#4895EF',
  },
  lime: {
    50: '#f2ffde',
    100: '#defcb2',
    200: '#caf884',
    300: '#b5f554',
    400: '#a1f226',
    500: '#88d90d',
    600: '#69a905',
    700: '#4a7801',
    800: '#2b4800',
    900: '#0b1900',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
    },
    variants: {
      // @ts-expect-error
      solid: (props) => ({
        bg: 'blue.500',
        color: 'white',
        _hover: {
          bg: 'blue.200',
        },
      }),
    },
  },
};
const theme = extendTheme({ colors, components });

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
