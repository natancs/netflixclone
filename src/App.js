import React, { useEffect, useState } from 'react';
import Tmdb from './Api/Tmdb';

import Header from './components/Header';
import FeatureMovie from './components/FeatureMovie';
import MovieRow from './components/MovieRow';

import './App.css';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();

      setMovieList(list)

      // Pegando o feature
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      {/* Header */}
      <Header black={blackHeader} />

      {/* Spotlight */}
      {featureData &&
        <FeatureMovie item={featureData} />  
      }

      {/* List */}
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow 
            key={key}
            title={item.title}
            items={item.items}
          />
        ))}
      </section>

      {/* Footer */}
      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> por Natanael <br/>
        Direitos de imagem para Netflix <br/>
        Dados pego do site TMDB.
      </footer>
    </div>
  );
}

export default App;
