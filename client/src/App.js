import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import UpdateForm from './Movies/UpdateForm';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [reloadMovies, setReloadMovies] = useState(null);

  const getMovieList = () => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(setReloadMovies(false));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [reloadMovies]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/'>
        <MovieList movies={movieList} />
      </Route>

      <Route path='/movies/:id'>
        <Movie
          addToSavedList={addToSavedList}
          setReloadMovies={setReloadMovies}
        />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateForm setReloadMovies={setReloadMovies} />
      </Route>
    </>
  );
};

export default App;
