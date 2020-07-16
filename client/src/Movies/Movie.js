import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, setReloadMovies }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const params = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(setReloadMovies(true))
      .catch(err => console.log(err));
    history.push('/');
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <button onClick={() => history.push(`/update-movie/${params.id}`)}>
        Edit
      </button>
      <button onClick={deleteMovie}>Delete</button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
