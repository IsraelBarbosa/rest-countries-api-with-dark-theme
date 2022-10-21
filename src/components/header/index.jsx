import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../context/contextTheme';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <header className={`header ${theme}-element`}>
        <Container>
          <h1 className={`header-titulo ${theme}-text`}>
            <strong>Where in the World?</strong>
          </h1>
          <button
            className={`header-botao ${theme}-text`}
            onClick={() => toggleTheme()}
          >
            <FontAwesomeIcon className="header-icon" icon={faMoon} />
            <span className="header-botao-span">Dark Mode</span>
          </button>
        </Container>
      </header>
    </>
  );
};

export default Header;
