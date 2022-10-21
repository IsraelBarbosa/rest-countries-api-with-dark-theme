import { useEffect, useContext, useState } from 'react';
import './index.css';
import ThemeContext from '../../context/contextTheme';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

const PostDetalhesLista = ({ post, theme, listaPosit }) => {
  let listaFirstItensInnerHtml = {
    native_name: Object.values(post[0].name.nativeName)[0].common,
    population: post[0].population,
    region: post[0].region,
    sub_region: post[0].subregion,
    capital: post[0].capital[0],
  };

  let listaSecondItensInnerHtml = {
    top_level_domain: post[0].tld[0],
    currencies: Object.values(post[0].currencies)[0].name,
    languages: Object.values(post[0].languages).map((lang, ind, arr) => {
      if (arr.length === ind + 1) return `${lang}`;
      return `${lang}, `;
    }),
  };

  let listaPosition =
    listaPosit === 'first'
      ? listaFirstItensInnerHtml
      : listaSecondItensInnerHtml;

  return (
    <ul className="post-layout__lista">
      {Object.keys(listaPosition).map((itemLista, i) => {
        return (
          <li key={i} className={`post-layout__lista__item ${theme}-text`}>
            {itemLista.replace(/_/g, ' ') + ': '}
            <span className={`post-layout__lista__item__span ${theme}-text`}>
              {listaPosition[itemLista]}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

const Post = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();

  let [post, setPost] = useState();

  useEffect(() => {
    let ignore = false;

    async function fetchApiCountries() {
      const fetchApiURL = await fetch(
        `https://restcountries.com/v3.1/name/${id}`
      );

      if (fetchApiURL.status === 200 && !ignore) {
        const apiURLJSON = await fetchApiURL.json();
        setPost(apiURLJSON);
        //   setCountries(apiURLJSON);
        console.log(apiURLJSON);
        console.log("'Chmando fetchApiCountries '");
      } else if (fetchApiURL.status !== 200 && !ignore) {
        //   setCountries([]);
      }
    }

    fetchApiCountries();

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div className={`post-layout`}>
      <Container>
        <Container>
          <Link to={'/'} className={`post-layout__link ${theme}-element`}>
            <span className={`post-layout__link__span ${theme}-text`}>
              <FontAwesomeIcon
                className="post-layout__icon"
                icon={faArrowLeft}
              />
              Back
            </span>
          </Link>
          {post ? (
            <div className="container-post">
              <div className="container-img-e-info">
                <img
                  className={`post-layout__img`}
                  src={post[0].flags.png}
                  alt=""
                />
                <div className="container-post-info">
                  <h1 className={`post-layout__titulo ${theme}-text`}>
                    {post[0].name.common}
                  </h1>

                  <div className="container-lista">
                    <PostDetalhesLista
                      post={post}
                      theme={theme}
                      listaPosit={'first'}
                    />
                    <PostDetalhesLista post={post} theme={theme} />
                  </div>

                  {/* <div className={`container-border`}>
                    <p className={`container-border__paragrafo ${theme}-text`}>
                      Border Countries:
                    </p>

                    <div className={`container-border-countries`}>
                      <span
                        className={`border-countries__span ${theme}-element ${theme}-text`}
                      >
                        Germany
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: 'center' }} className={`${theme}-text`}>
              Carregando post
            </p>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Post;
