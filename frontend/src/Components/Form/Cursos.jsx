import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { DataContext, SET_CURSOS } from '../Context2/Context';
import './CSS/Student.css';
import Header from '../../Views/Header/Header'
import ListCourses from '../ListCourses/ListCourses';
import Email from '../ReporteAutomatico/Email';

const apiUrl = process.env.REACT_APP_API_URL; 

const RegistrarCursos = () => {
  const { state, dispatch } = useContext(DataContext);
  const { docentes } = state;

  console.log("These are the teachers:",docentes);
  

  // Estado para los datos del nuevo curso
  const [newCurso, setNewCurso] = useState({
    idDocente: '',
    dniDocente: '',
    nombreCurso: '',
    idCiclo: '',
    descripcion: ''
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCurso((prevCurso) => ({
      ...prevCurso,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleClickRegistrarCurso = async (e) => {
    e.preventDefault();

    // Encontrar el idDocente basado en el dniDocente
    const id_docente = docentes.find(u => u.dni === newCurso.dniDocente);
    const idDocente = id_docente ? id_docente.idDocentes : null;

    if (!idDocente) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró un docente con el DNI proporcionado.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
      return;
    }

    const dataCurso = {
      ...newCurso,
      idDocente
    };

    try {
      // Enviar una solicitud POST para registrar el curso
      const response = await axios.post(apiUrl+'/Cursos', dataCurso);

      // Mostrar un mensaje de éxito
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Curso registrado correctamente.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });

      dispatch({
        type: SET_CURSOS,
        payload: [...state.cursos, response.data]
      })

      // Limpiar el formulario después de la operación exitosa
      setNewCurso({
        idDocente: '',
        dniDocente: '',
        nombreCurso: '',
        idCiclo: '',
        descripcion: ''
      });

    } catch (error) {
      console.error('Error al registrar el curso:', error);

      // Mostrar un mensaje de error si la solicitud POST falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar el curso. Inténtalo nuevamente.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
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
        <form className="registration-form" onSubmit={handleClickRegistrarCurso}>
  <h2 className="form-title">Registrar Curso</h2>

  <div className="form-group">
    <label htmlFor="dniDocente">Docente</label>
    <select
      name="dniDocente"
      value={newCurso.dniDocente}
      onChange={handleChange}
      required
    >
      <option value="">Selecciona un Docente</option>
      {docentes.map((docente) => (
        <option key={docente.idDocentes} value={docente.dni}>
          {docente.firstName} {docente.lastName}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="nombreCurso">Nombre del Curso</label>
    <input
      type="text"
      name="nombreCurso"
      placeholder="Nombre del Curso"
      value={newCurso.nombreCurso}
      onChange={handleChange}
      required
    />
  </div>

  <div className="form-group">
    <label htmlFor="idCiclo">Ciclo</label>
    <select
      name="idCiclo"
      value={newCurso.idCiclo}
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
    <label htmlFor="descripcion">Descripción</label>
    <input
      type="text"
      name="descripcion"
      placeholder="Descripción"
      value={newCurso.descripcion}
      onChange={handleChange}
    />
  </div>

  <input type="submit" value="Registrar" className="submit-btn" />
</form>

        </div>

        <div className='containerForm'>
          <ListCourses/>
        </div>

      </div>
      <Email/>{/*sirve para enviar los correos automaticamente */}
    </div>
    
  );
};

export default RegistrarCursos;
