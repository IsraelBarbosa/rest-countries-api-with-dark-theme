import logo from './logo.svg';
import Header from './components/header';
import Main from './components/main';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ThemeContext from './context/contextTheme';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Post from './components/post';

function App() {
  const [theme, setTheme] = useState('dark');
  document.getElementsByTagName('body')[0].classList.add(`${theme}-background`);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document
      .getElementsByTagName('body')[0]
      .classList.toggle(`${theme}-background`);
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
        <Header />
      </ThemeContext.Provider>

      <Routes>
        <Route
          path="/"
          element={
            <ThemeContext.Provider
              value={{ theme: theme, toggleTheme: toggleTheme }}
            >
              <Main />
            </ThemeContext.Provider>
          }
        />
        <Route
          path="post/:id"
          element={
            <ThemeContext.Provider
              value={{ theme: theme, toggleTheme: toggleTheme }}
            >
              <Post />
            </ThemeContext.Provider>
          }
        />
        <Route path="*" element={<div style={{color: "white",}}>Pagina não encontrada</div>} />
      </Routes>
    </>
  );
}

export default App;
