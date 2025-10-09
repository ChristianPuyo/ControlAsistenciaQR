import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './UpdateTeachers.module.css'; // Importa los estilos del archivo correspondiente
import Header from '../../Views/Header/Header';
import { useNavigate } from 'react-router-dom';
import { DataContext, SET_DOCENTES } from '../Context2/Context';

const apiUrl = process.env.REACT_APP_API_URL; 

const UpdateTeacher = () => {
  const navigate = useNavigate()
  const { id } = useParams(); // Obtén el ID del docente desde la URL
  
  const { state, dispatch } = useContext(DataContext); // Obtén el dispatch y el estado del contexto
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    correo: ""
  });

  // Efecto para cargar los datos del docente al montar el componente
  useEffect(() => {
    const teacher = state.docentes.find(docente => docente.idDocentes === parseInt(id));
    if (teacher) {
      setNewTeacher(teacher); // Llenar los campos del formulario con los datos del docente
    }
  }, [id, state.docentes]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleClickUpdateTeacher = async (e) => {
    e.preventDefault();

    try {
      // Enviar una solicitud PUT para actualizar al docente
      const response = await axios.put(`${apiUrl}/Docentes/${id}`, newTeacher);
      // Mostrar un mensaje de éxito
      Swal.fire({
        title: 'Actualización exitosa',
        text: 'Docente actualizado correctamente.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });


      navigate("/Docentes")
      // Actualizar el docente en el estado global
      dispatch({
        type: SET_DOCENTES,
        payload: state.docentes.map(docente => 
          docente.idDocentes === parseInt(id) ? response.data : docente
        ),
      });

    } catch (error) {
      console.error('Error al actualizar al Docente:', error);

      // Mostrar un mensaje de error si la solicitud PUT falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar al Docente. Inténtalo nuevamente.',
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
          <form className={styles.signInForm} onSubmit={handleClickUpdateTeacher}>
            <h2 className={styles.title}>Editar Docente</h2>
            <div className={styles.inputField}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newTeacher.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newTeacher.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={newTeacher.dni}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={newTeacher.correo}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" value="Guardar" className={`${styles.btn} ${styles.solid}`} />
            <Link to='/Docentes'><button className={styles.btnCancelar}>Cancelar</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;
