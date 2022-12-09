import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { API_HOST } from './utils/constants';

function App() {
  const [name, setName] = useState('shao');

  useEffect(() => {
    (async () => {
      const url = `${API_HOST}/user`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const content = await response.json();

      setName(content.name);
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Nav name={name} setName={setName} />
          <Route path="/" exact component={() => <Home name={name} />} />
        </div>

        {/* <Route path="/login" component={() => <Login setName={setName}/>}/> */}
        <Route path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

function WrapperApp() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          colors: {
            // Add your color
            deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
            // or replace default theme color
            blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          },

          shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
          },

          headings: {
            fontFamily: 'Roboto, sans-serif',
            sizes: {
              h1: { fontSize: 30 },
            },
          },
        }}
      >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default WrapperApp;
