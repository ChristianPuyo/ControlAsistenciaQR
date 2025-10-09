import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CSS/Student.css'
import Header from '../../Views/Header/Header'
import ListStudents from '../ListStudents/ListStudents';
import { DataContext, SET_STUDENTS } from '../Context2/Context';
import Email from '../ReporteAutomatico/Email';

const apiUrl = process.env.REACT_APP_API_URL; 

const RegistrarEstudiantes = () => {
  const { state, dispatch } = useContext(DataContext); // Obtén el dispatch y el estado del contexto
  // Estado para los datos del nuevo estudiante
  const [newStudent, setNewStudent] = useState({
    idCiclo: '',
    firstName: '',
    lastName: '',
    dni: '',
    gender: '',
    age: '',
    email: ''
  });

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
      // Enviar una solicitud POST para registrar al estudiante
      
      const response = await axios.post(apiUrl+'/Student', newStudent);
      // Mostrar un mensaje de éxito
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Estudiante registrado correctamente.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });

      dispatch({
        type: SET_STUDENTS,
        payload: [...state.students, response.data], // Agrega el nuevo estudiante a la lista existente
      });

      // Limpiar el formulario después de la operación exitosa
      setNewStudent({
        idCiclo: '',
        firstName: '',
        lastName: '',
        dni: '',
        gender: '',
        age: '',
        email: ''
      });

    } catch (error) {
      console.error('Error al registrar al estudiante:', error);

      // Mostrar un mensaje de error si la solicitud POST falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar al estudiante. Inténtalo nuevamente.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });

      // Limpiar el formulario después de la operación 
      setNewStudent({
        idCiclo: '',
        firstName: '',
        lastName: '',
        dni: '',
        gender: '',
        age: '',
        email: ''
      });
    }
  };

  return (
    <div>
      
      <div>
        <Header />
      </div>

      
      <div className='mainContainerForm'>
        <div className="containerForm">
          
        <form className="registration-form" onSubmit={handleClickRegistrarStudent}>
      <h2 className="form-title">Registrar Estudiante</h2>
      <div className="form-group">
        <label htmlFor="idCiclo">Ciclo</label>
        <select
          className="form-select"
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
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
        <label htmlFor="gender">Género</label>
        <select
          className="form-select"
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
      <div className="form-group">
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
      <div className="form-group">
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
      <input type="submit" value="Registrar" className="submit-btn" />
    </form>
    
        </div>

        <div className="containerForm">
            <ListStudents/>
        </div>

      </div>

      <Email/> {/*sirve para enviar los correos automaticamente */}
    </div>
    
  );
};

export default RegistrarEstudiantes;
