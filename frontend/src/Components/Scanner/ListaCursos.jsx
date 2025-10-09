import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { DataContext, SET_CURSOS, SET_LOADING, SET_SELECTED_CURSO } from '../Context2/Context';
import CustomSelect from './CustomSelect';
import './ListaCursos.css';

const apiUrl = process.env.REACT_APP_API_URL; 

const ListaCurso = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cursos, loading } = state;

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(apiUrl+'/Cursos');
        dispatch({ type: SET_CURSOS, payload: response.data });
        dispatch({ type: SET_LOADING, payload: false });
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: SET_LOADING, payload: false });
      }
    };
    fetchCursos();
  }, [dispatch]);

  const handleSelectChange = (curso) => {
    dispatch({ type: SET_SELECTED_CURSO, payload: curso.value });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <CustomSelect
      options={cursos.map((curso) => ({ value: curso.idCurso, label: curso.nombreCurso }))}
      onChange={handleSelectChange}
    />
  );
};

export default ListaCurso;
