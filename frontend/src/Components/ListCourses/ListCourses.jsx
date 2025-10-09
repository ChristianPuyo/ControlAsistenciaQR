import React, { useState, useContext } from 'react';
import { DataContext, SET_CURSOS } from '../Context2/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ListCourses.module.css'; // para usar los estilos del archivo ListCourses.module.css

const apiUrl = process.env.REACT_APP_API_URL; 

function ListCourses() {
  const { state, dispatch } = useContext(DataContext);
  const { cursos } = state;

  console.log("Courses:", cursos);
  
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const totalPages = Math.ceil(cursos.length / studentsPerPage);
  const maxPageButtons = 5;

  // Nuevo estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los cursos con base en el término de búsqueda
  const filteredCourses = cursos.filter(course =>
    course.nombreCurso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los cursos que se deben mostrar en la página actual
  const indexOfLastCourses = currentPage * studentsPerPage;
  const indexOfFirstCourses = indexOfLastCourses - studentsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourses, indexOfLastCourses);

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

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/Cursos/${id}`);
      console.log('Curso eliminado:', response.data);

      const responseCursos = await axios.get(apiUrl+'/Cursos');
      dispatch({ type: SET_CURSOS, payload: responseCursos.data });

    } catch (error) {
      console.error('Error al eliminar el Curso:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Cursos</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar curso por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado del término de búsqueda
          className={styles.searchInput}
        />
      </div>
      {/* Input para buscar cursos por nombre */}
      

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Ciclo</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <tr key={index}>
                <td>{course.idCurso}</td>
                <td>{course.nombreCurso}</td>
                <td>{course.descripcion}</td>
                <td>{course.idCiclo}</td>
                <td><Link to={`/Cursos/${course.idCurso}`}>🖋️</Link></td>
                <td><a className={styles.btn_delete} onClick={() => deleteCourse(course.idCurso)}>🗑️</a></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron cursos</td>
            </tr>
          )}
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

export default ListCourses;
