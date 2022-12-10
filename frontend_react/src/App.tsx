import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { API_HOST } from './utils/constants';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch cache cookie user
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
        <Route
          path="/"
          exact
          component={() => <Home name={name} setName={setName} />}
        />
        <Route path="/login" component={() => <Login setName={setName} />} />
        <Route path="/register" component={Register} />
      </BrowserRouter>
    </div>
  );
}

function WrapperApp() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  // Ctrl/Cmd-J to toggle between light/dark theme
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

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
