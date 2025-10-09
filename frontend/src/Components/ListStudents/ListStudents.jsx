import React, { useState, useContext, useEffect } from 'react';
import { DataContext, SET_STUDENTS } from '../Context2/Context';
import styles from './ListStudents.module.css'; // para usar los estilos del archivo ListStudents.module.css
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; 



function ListStudents() {
  const { state, dispatch } = useContext(DataContext);
  const { students } = state; 
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const responseStudents = await axios.get(apiUrl+'/Student');
            dispatch({ type: SET_STUDENTS, payload: responseStudents.data });
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    fetchData();
}, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const studentsPerPage = 10;

  // Filtrar estudiantes según el término de búsqueda
  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const maxPageButtons = 5;

  // Calcular los estudiantes que se deben mostrar en la página actual
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  console.log("EStudiantes:",currentStudents);
  
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando cambia la búsqueda
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/Student/${id}`);
      console.log('Estudiante eliminado:', response.data);

      const responseStudents = await axios.get(apiUrl+'/Student');
      dispatch({ type: SET_STUDENTS, payload: responseStudents.data });

    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };
  

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Ciclo</th>
            <th>Email</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.dni}</td>
              <td>{student.idCiclo}</td>
              <td>{student.email}</td>
              <td><Link to={`/Student/${student.idEstudiante}`}>🖋️</Link></td>
              <td><a className={styles.btn_delete} onClick={() => deleteStudent(student.idEstudiante)}>🗑️</a></td>
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

export default ListStudents;
