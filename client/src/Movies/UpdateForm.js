import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from '../hooks/useForm';
import { useParams, useHistory } from 'react-router-dom';

const initialValue = {
  title: '',
  director: '',
  metascore: '',
  stars: ''
};

const UpdateForm = ({ setReloadMovies }) => {
  const [values, setValues, handleChanges] = useForm(initialValue);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setValues(res.data))
      .catch(err => console.log(err));
  }, [id, setValues]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, values)
      .then(setReloadMovies(true))
      .catch(err => console.log(err));
    push(`/movies/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Movie</h1>
      <label htmlFor='title'>Title:</label>
      <input
        id='title'
        type='text'
        name='title'
        value={values.title}
        onChange={handleChanges}
      />
      <label htmlFor='director'>Director:</label>
      <input
        id='director'
        type='text'
        name='director'
        value={values.director}
        onChange={handleChanges}
      />
      <label htmlFor='metascore'>Metascore:</label>
      <input
        id='metascore'
        type='number'
        name='metascore'
        value={values.metascore}
        onChange={handleChanges}
      />
      <label htmlFor='stars'>Stars:</label>
      <input
        id='stars'
        type='text'
        name='stars'
        value={values.stars}
        onChange={handleChanges}
      />
      <button className='submit'>Update</button>
    </form>
  );
};

export default UpdateForm;
