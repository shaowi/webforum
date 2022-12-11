import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { API_HOST, getRandomColors } from './utils/constants';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { User } from './types/User';

function App() {
  const [user, setUser] = useState<User | undefined>({
    user_id: 1,
    email: 'abby@test.com',
    name: 'abby',
    access_type: 1,
    avatarColor: getRandomColors(),
  });

  useEffect(() => {
    // Fetch cache cookie user
    (async () => {
      const url = `${API_HOST}/user`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const content = await response.json();
      if (!('error' in content)) {
        setUser(content as User);
      }
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          exact
          component={() => <Home user={user} setUser={setUser} />}
        />
        <Route path="/login" component={() => <Login setUser={setUser} />} />
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
        }}
      >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default WrapperApp;
