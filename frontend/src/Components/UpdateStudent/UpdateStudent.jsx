import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import styles from './UpdateStudent.module.css'; // Importa los estilos del archivo UpdateStudent.module.css
import Header from '../../Views/Header/Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataContext, SET_STUDENTS } from '../Context2/Context';

const apiUrl = process.env.REACT_APP_API_URL; 

const UpdateStudent = () => {
  const navigate = useNavigate(); // Hook para navegar
  const { id } = useParams(); // Obtén el ID del estudiante desde la URL
  console.log(id);
  
  const { state, dispatch } = useContext(DataContext); // Obtén el dispatch y el estado del contexto
  const [newStudent, setNewStudent] = useState({
    idCiclo: '',
    firstName: '',
    lastName: '',
    dni: '',
    gender: '',
    age: '',
    email: ''
  });

  // Efecto para cargar los datos del estudiante al montar el componente
  useEffect(() => {
    const student = state.students.find(student => student.idEstudiante === parseInt(id));
    console.log(state.students)
    console.log("current student:",student)
    if (student) {
      setNewStudent(student); // Llenar los campos del formulario con los datos del estudiante
    }
  }, [id, state.students]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleClickRegistrarStudent = async (e) => {
    e.preventDefault();

    try {
      // Enviar una solicitud PUT para actualizar al estudiante
      const response = await axios.put(`${apiUrl}/Student/${id}`, newStudent);
      // Mostrar un mensaje de éxito
      Swal.fire({
        title: 'Actualización exitosa',
        text: 'Estudiante actualizado correctamente.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });

      navigate('/Student');
      // Actualizar el estudiante en el estado global
      dispatch({
        type: SET_STUDENTS,
        payload: state.students.map(student => 
          student.id === parseInt(id) ? response.data : student
        ),
      });

    } catch (error) {
      console.error('Error al actualizar al estudiante:', error);

      // Mostrar un mensaje de error si la solicitud PUT falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar al estudiante. Inténtalo nuevamente.',
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
            <h2 className={styles.title}>Editar Estudiante</h2>
            <div className={styles.inputField}>
              <label htmlFor="idCiclo">Ciclo</label>
              <select 
                className={styles.select}
                name="idCiclo"
                value={newStudent.idCiclo}
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
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newStudent.firstName}
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
                value={newStudent.lastName}
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
                value={newStudent.dni}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="gender">Género</label>
              <select
                className={styles.select}
                name="gender"
                value={newStudent.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Selecciona el género
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <div className={styles.inputField}>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newStudent.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputField}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" value="Guardar" className={`${styles.btn} ${styles.solid}`} />
            <Link to='/Student'><button className={styles.btnCancelar}>Cancelar</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
