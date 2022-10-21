import React, { useContext, useEffect, useMemo, useState } from 'react';
import './index.css';
import ThemeContext from '../../context/contextTheme';
import { Container } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const [APIsearch, setAPIsearch] = useState('all');
  const [APIstatusError, setAPIstatusError] = useState('');
  const [countries, setCountries] = useState([]);

  const [numeroDePosts, setNumeroDePosts] = useState(10);
  let countriesDe10Em10Posts = useMemo(
    () => countries.slice(0, numeroDePosts),
    [countries, numeroDePosts]
  );

  function resetCountries() {
    setCountries([]);
    setAPIstatusError('');
  }

  useEffect(() => {
    let ignore = false;

    async function fetchApiCountries() {
      const fetchApiURL = await fetch(
        `https://restcountries.com/v3.1/${APIsearch}`
      );

      if (fetchApiURL.status === 200 && !ignore) {
        const apiURLJSON = await fetchApiURL.json();
        setCountries(apiURLJSON);
      } else if (fetchApiURL.status !== 200 && !ignore) {
        setCountries([]);
        setAPIstatusError('Nada foi encontrado');
      }
    }

    fetchApiCountries();

    return () => {
      ignore = true;
    };
  }, [APIsearch]);

  function loadMorePosts() {
    setNumeroDePosts((numeroDePostsAnterior) => numeroDePostsAnterior + 10);
  }

  function filterRegion(e) {
    if (e.target.value !== 'filterByRegion') {
      resetCountries();
      setAPIsearch(`region/${e.target.value}`);
    } else {
      resetCountries();
      setAPIsearch(`all`);
    }
  }

  function searchCountry(e) {
    if (e.target.value.length > 0) {
      resetCountries();
      setAPIsearch(`name/${e.target.value}`);
    } else {
      resetCountries();
      setAPIsearch(`all`);
    }
  }

  const statusCountries = () => {
    if (APIstatusError) {
      return <p className={`${theme}-text`}>{APIstatusError}</p>;
    } else {
      return <p className={`${theme}-text`}>Carregando countries</p>;
    }
  };

  return (
    <>
      <div className={`wrapper-main`}>
        <Container>
          <Container className="container-main">
            <div className="container-input-e-select">
              <div className="container-input">
                <FontAwesomeIcon
                  className={`input-icon ${theme}-text`}
                  icon={faSearch}
                />

                <input
                  className={`input-country ${theme}-text ${theme}-element`}
                  type="text"
                  placeholder="Search for a country"
                  onInput={searchCountry}
                />
              </div>

              <select
                className={`select-country ${theme}-text ${theme}-element`}
                onChange={filterRegion}
                name="cars"
                title="Filter By Region"
              >
                <option value="filterByRegion">Filter By Region</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>

            <div className="container-countries">
              {countriesDe10Em10Posts.length > 0
                ? countriesDe10Em10Posts.map((country, index) => (
                    <Country
                      key={index}
                      flags={country.flags}
                      name={country.name}
                      population={country.population}
                      region={country.region}
                      capital={country.capital}
                    />
                  ))
                : statusCountries()}
            </div>

            {countries.length > numeroDePosts ? (
              <button
                className={`btn-load-more-countries ${theme}-element ${theme}-text`}
                onClick={loadMorePosts}
              >
                Load more posts
              </button>
            ) : (
              ''
            )}
          </Container>
        </Container>
      </div>
    </>
  );
};

function Country({ flags, name, population, region, capital }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to={`/post/${name.common}`} className="country-link">
      <div className={`country ${theme}-element`}>
        <img className={`country-img`} src={flags.png} alt={name.common} />
        <div className="container-titulo-e-descricao">
          <h1 className={`country-titulo ${theme}-text`}>{name.common}</h1>
          <ul className="country-lista">
            <li className={`country-lista-item ${theme}-text`}>
              Population:{' '}
              <span className={`item-span ${theme}-text`}>{population}</span>
            </li>
            <li className={`country-lista-item ${theme}-text`}>
              Region:{' '}
              <span className={`item-span ${theme}-text`}>{region}</span>
            </li>
            <li className={`country-lista-item ${theme}-text`}>
              Capital:{' '}
              <span className={`item-span ${theme}-text`}>{capital}</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default Main;
