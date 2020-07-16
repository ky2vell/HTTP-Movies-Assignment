import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const initialValue = {
  title: '',
  director: '',
  metascore: '',
  stars: ''
};

const AddMovie = ({ setReloadMovies }) => {
  const [values, setValues, handleChanges] = useForm(initialValue);
  const { push } = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', values)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setReloadMovies(true);
    push('/');
    setValues(initialValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Movie</h1>
      <label htmlFor='title'>Title:</label>
      <input
        id='title'
        type='text'
        name='title'
        value={values.title}
        onChange={handleChanges}
        placeholder='Title..'
      />
      <label htmlFor='director'>Director:</label>
      <input
        id='director'
        type='text'
        name='director'
        value={values.director}
        onChange={handleChanges}
        placeholder='Director..'
      />
      <label htmlFor='metascore'>Metascore:</label>
      <input
        id='metascore'
        type='number'
        name='metascore'
        value={values.metascore}
        onChange={handleChanges}
        placeholder='Metascore..'
      />
      <label htmlFor='stars'>Stars:</label>
      <input
        id='stars'
        type='text'
        name='stars'
        value={values.stars}
        onChange={handleChanges}
        placeholder='Stars..'
      />
      <button className='submit'>Submit</button>
    </form>
  );
};

export default AddMovie;
