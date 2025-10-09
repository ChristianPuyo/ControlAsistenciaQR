import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext, CLEAR_SCAN_RESULT, SET_STUDENTS, SET_ASISTENCIAS } from '../Context2/Context';
import styles from './Registrar.module.css';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL; 

const Guardar = () => {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
  const dia = ('0' + hoy.getDate()).slice(-2);
  const fechaHoyFormateada = `${año}-${mes}-${dia}`;

  const { state, dispatch } = useContext(DataContext);
  const { scanResult, selectedCurso, students, asistencias, cursos } = state;

  const [asistenciasHoy, setAsistenciasHoy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl+'/Student');
        dispatch({ type: SET_STUDENTS, payload: response.data });
        const responseAsistencias = await axios.get(apiUrl+'/registroAsistencia');
        dispatch({ type: SET_ASISTENCIAS, payload: responseAsistencias.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (scanResult) {
      handleScan(scanResult);
    }
  }, [scanResult]);

  const handleScan = async (scanData) => {
    if (selectedCurso === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona un curso antes de registrar la asistencia.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
      return dispatch({ type: CLEAR_SCAN_RESULT });
    }

    const datos = JSON.parse(scanData);
    const student = students.find(student => student.dni === datos.dni);

    if (!student) {
      Swal.fire({
        title: 'Error',
        text: 'Estudiante no encontrado.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
      return dispatch({ type: CLEAR_SCAN_RESULT });
    }

    const newUser = {
      idEstudiante: student.idEstudiante,
      idCurso: Number(selectedCurso),
      fecha: fechaHoyFormateada,
      Estado: true,
    };

    try {
      await axios.post(apiUrl+'/registroAsistencia', newUser);
      dispatch({ type: CLEAR_SCAN_RESULT });

      const responseAsistencias = await axios.get(apiUrl+'/registroAsistencia');
      dispatch({ type: SET_ASISTENCIAS, payload: responseAsistencias.data });
      const responseStudents = await axios.get(apiUrl+'/Student');
      dispatch({ type: SET_STUDENTS, payload: responseStudents.data });

      // Filtrar asistencias del día actual
      const listStudent = responseAsistencias.data.filter(asistencia => asistencia.fecha === fechaHoyFormateada);
      const registroHoy = listStudent.map(asistencia => {
        const studentData = students.find(student => student.idEstudiante === asistencia.idEstudiante);
        const cursoSelect = cursos.find(curso => curso.idCurso === asistencia.idCurso);

        return {
          ...studentData,
          curso: cursoSelect ? cursoSelect.nombreCurso : 'Curso no encontrado',
          horaRegistro: asistencia.horaRegistro, // Obtener la hora de la base de datos
        };
      });

      // Invertir el orden de los registros para mostrar el más reciente primero
      setAsistenciasHoy(registroHoy.reverse());

      Swal.fire({
        title: 'Registro exitoso',
        text: 'La asistencia ha sido registrada con éxito.',
        icon: 'success',
        timer: 5000,
        showConfirmButton: true,
      });
    } catch (error) {
      console.error('Error adding user:', error);
      dispatch({ type: CLEAR_SCAN_RESULT });
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar la asistencia. Inténtalo nuevamente.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Estudiantes registrados hoy</h2>
      <div className={styles.studentTableContainer}>
        <table className={styles.studentTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Curso</th>
              <th>Hora de Registro</th>
            </tr>
          </thead>
          <tbody>
            {asistenciasHoy.map(asistencia => (
              <tr key={asistencia.idEstudiante}>
                <td>{asistencia.lastName} {asistencia.firstName}</td>
                <td>{asistencia.dni}</td>
                <td>{asistencia.curso}</td>
                <td>{asistencia.horaRegistro}</td> {/* Mostrar la hora que viene de la base de datos */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guardar;




