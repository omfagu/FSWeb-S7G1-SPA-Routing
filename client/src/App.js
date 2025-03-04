import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {Routes, Route, Link} from "react-router-dom";

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    
    const varMi = saved.find((movie) => movie.id == id );
    if(!varMi) {
      const eklenecekFilm = movieList.find((movie) => movie.id == id);
      setSaved([...saved,eklenecekFilm]);
      
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />

      <div style={{width: "%75", margin: "0 auto" }}>
        
        <Routes>
          <Route 
          path="/filmler/:id"
          element = {<Film saveToHeader = {KaydedilenlerListesineEkle} />}
          />      
          <Route path="/filmler" element={<FilmListesi movies={movieList}/>}/>
          
           
          <Route path="/" element ={<FilmListesi movies={movieList}/>} />
          
           
        </Routes>
      </div>
    </div>
  );
}
