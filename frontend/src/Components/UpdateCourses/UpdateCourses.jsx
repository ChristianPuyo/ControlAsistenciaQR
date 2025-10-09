import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import styles from './UpdateCourses.module.css'; // Importa los estilos del archivo
import Header from '../../Views/Header/Header';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DataContext, SET_CURSOS } from '../Context2/Context';

const apiUrl = process.env.REACT_APP_API_URL; 

const UpdateCourses = () => {
  const navigate = useNavigate()
  const { id } = useParams(); // Obtén el ID del estudiante desde la URL
  console.log(id);
  
  const { state, dispatch } = useContext(DataContext); // Obtén el dispatch y el estado del contexto
  const { cursos,docentes } = state; 
  const [newCourse, setnewCourse] = useState({
    idDocentes: null,
    nombreCurso: '',
    idCiclo: '',
    descripcion: ''
   
  });

  // Efecto para cargar los datos del curso al montar el componente
  useEffect(() => {
    const course = cursos.find(curso => curso.idCurso === parseInt(id));
    console.log(cursos)
    console.log("current curso:",course)
    if (course) {
      setnewCourse(course); // Llenar los campos del formulario con los datos del curso
    }
  }, [id, cursos]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleClickRegistrarStudent = async (e) => {
    e.preventDefault();

    try {
      // Enviar una solicitud PUT para actualizar al curso
      const response = await axios.put(`${apiUrl}/Cursos/${id}`, newCourse);
      // Mostrar un mensaje de éxito
      Swal.fire({
        title: 'Actualización exitosa',
        text: 'Curso actualizado correctamente.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });

      navigate("/Cursos")
      // Actualizar el curso en el estado global
      dispatch({
        type: SET_CURSOS,
        payload: cursos.map(curso => 
          curso.idCurso === parseInt(id) ? response.data : curso
        ),
      });

    } catch (error) {
      console.error('Error al actualizar al curso:', error);

      // Mostrar un mensaje de error si la solicitud PUT falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar al curso. Inténtalo nuevamente.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <form className={styles.signInForm} onSubmit={handleClickRegistrarStudent}>
            <h2 className={styles.title}>Editar Curso</h2>
            <div className={styles.inputField}>
              <label htmlFor="idDocentes">Docente</label>
              <select 
                className={styles.select}
                name="idDocentes" 
                value={newCourse.idDocentes}
                onChange={handleChange}
                required
              >

               <option value="" disabled>Selecciona un Docente</option>
               {docentes.map((docente) => (
                 <option key={docente.idDocentes} value={docente.idDocentes}>
                 {docente.firstName} {docente.lastName}
                 </option>
               ))}
              </select>
              
            </div>
            <div className={styles.inputField}>
              <label htmlFor="nombreCurso">Nombre del Curso</label>
              <input
                type="text"
                name="nombreCurso"
                placeholder="Nombre del Curso"
                value={newCourse.nombreCurso}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputField}>
              <label htmlFor="idCiclo">Ciclo</label>
              <select
                name="idCiclo"
                value={newCourse.idCiclo}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona el ciclo
                </option>
                <option value={1}>I</option>
                <option value={2}>II</option>
                <option value={3}>III</option>
                <option value={4}>IV</option>
                <option value={5}>V</option>
                <option value={6}>VI</option>
              </select>
            </div>

            <div className={styles.inputField}>
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={newCourse.descripcion}
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Guardar" className={`${styles.btn} ${styles.solid}`} />
            <Link to='/Cursos'><button className={styles.btnCancelar}>Cancelar</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourses;
