import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CSS/Student.css';
import Header from '../../Views/Header/Header'
import ListTeachers from '../ListTeachers/ListTeachers';
import { DataContext, SET_DOCENTES } from '../Context2/Context';
import Email from '../ReporteAutomatico/Email';

const apiUrl = process.env.REACT_APP_API_URL; 

const RegistrarDocentes = () => {
  const {state, dispatch} = useContext(DataContext)
  // Estado para los datos del nuevo Docente
  const [newDocente, setNewDocente] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    correo: ''
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDocente((prevDocente) => ({
      ...prevDocente,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleClickRegistrarDocente = async (e) => {
    e.preventDefault();

    try {
      // Enviar una solicitud POST para registrar al Docente
      const response = await axios.post(apiUrl+'/Docentes', newDocente);

      // Mostrar un mensaje de éxito
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Docente registrado correctamente.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });

      dispatch({
        type: SET_DOCENTES,
        payload: [...state.docentes, response.data]
      })

      // Limpiar el formulario después de la operación exitosa
      setNewDocente({
        firstName: '',
        lastName: '',
        dni: '',
        correo: ''
      });

    } catch (error) {
      console.error('Error al registrar al Docente:', error);

      // Mostrar un mensaje de error si la solicitud POST falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar al Docente. Inténtalo nuevamente.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
      setNewDocente({
        firstName: '',
        lastName: '',
        dni: '',
        correo: ''
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
        <form className="registration-form" onSubmit={handleClickRegistrarDocente}>
  <h2 className="form-title">Registrar Docente</h2>

  <div className="form-group">
    <label htmlFor="firstName">First Name</label>
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={newDocente.firstName}
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
      value={newDocente.lastName}
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
      value={newDocente.dni}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="correo">Correo</label>
    <input
      type="email"
      name="correo"
      placeholder="Correo"
      value={newDocente.correo}
      onChange={handleChange}
      required
    />
  </div>
  <input type="submit" value="Registrar" className="submit-btn" />
</form>

        </div>

        <div className="containerForm">
          <ListTeachers/>
        </div >
      </div>
      <Email/>  {/*sirve para enviar los correos automaticamente */}
    </div>
    
  );
};

export default RegistrarDocentes;
