import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { DataContext, SET_DOCENTES } from '../Context2/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ListTeachers.module.css'; // para usar los estilos del archivo ListTeachers.module.css

const apiUrl = process.env.REACT_APP_API_URL; 





function ListTeachers() {
  

  const { state,dispatch} = useContext(DataContext);
  const { docentes } = state;

  console.log("Teachers:", docentes);
  
  

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const totalPages = Math.ceil(docentes.length / studentsPerPage);
  const maxPageButtons = 5;

  // Calcular los docentes que se deben mostrar en la página actual
  const indexOfLastTeachers = currentPage * studentsPerPage;
  const indexOfFirstTeacher = indexOfLastTeachers - studentsPerPage;
  const currentTeachers = docentes.slice(indexOfFirstTeacher, indexOfLastTeachers);

  // Determinar el rango de botones a mostrar
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  const pages = [...Array((endPage - startPage + 1)).keys()].map(i => startPage + i);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const deleteTeacher = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/Docentes/${id}`);
      console.log('Estudiante eliminado:', response.data);

      const responseStudents = await axios.get(apiUrl+'/Docentes');
      dispatch({ type: SET_DOCENTES, payload: responseStudents.data });

    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };
  return (
    <div>
        <h2>Lista de Profesores</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher, index) => (
            <tr key={index}>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.dni}</td>
              <td>{teacher.correo}</td>
              <td><Link to={`/Docentes/${teacher.idDocentes}`}>🖋️</Link></td>
              <td><a className={styles.btn_delete} onClick={() => deleteTeacher(teacher.idDocentes)}>🗑️</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          &lt; {/* Flecha izquierda */}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={currentPage === page ? styles.active : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          &gt; {/* Flecha derecha */}
        </button>
      </div>
    </div>
  );
}

export default ListTeachers;
