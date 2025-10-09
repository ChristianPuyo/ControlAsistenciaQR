import React, { useEffect, useContext } from 'react';
import generatePDFBlob from '../Reporte/Document';
import { DataContext, SET_CURSOS, SET_DOCENTES, SET_ASISTENCIAS, SET_STUDENTS } from '../Context2/Context';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; 

function Email() {
  // Obtener el estado global y la función de dispatch del contexto
  const { state, dispatch } = useContext(DataContext);
  const { students, docentes, cursos, asistencias } = state;

  // Obtener la fecha actual y formatearla en 'YYYY-MM-DD'
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
  const dia = ('0' + hoy.getDate()).slice(-2);
  const fechaHoyFormateada = `${año}-${mes}-${dia}`;

  // Asignar el asunto y el texto del correo
  const subject = 'Reporte de Asistencia';
  const text = '';

  useEffect(() => {
    // Función para obtener los datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener la lista de estudiantes
        const responseStudents = await axios.get(apiUrl+'/Student');
        dispatch({ type: SET_STUDENTS, payload: responseStudents.data });

        // Obtener la lista de docentes
        const responseDocentes = await axios.get(apiUrl+'/Docentes');
        dispatch({ type: SET_DOCENTES, payload: responseDocentes.data });

        // Obtener la lista de cursos
        const responseCursos = await axios.get(apiUrl+'/Cursos');
        dispatch({ type: SET_CURSOS, payload: responseCursos.data });

        // Obtener la lista de asistencias
        const responseAsistencias = await axios.get(apiUrl+'/registroAsistencia');
        dispatch({ type: SET_ASISTENCIAS, payload: responseAsistencias.data });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    // Función para enviar los correos electrónicos con el reporte de asistencia
    const sendEmails = async () => {
      // Iterar sobre la lista de docentes
      for (let i = 0; i < docentes.length; i++) {
        let docente = docentes[i];
        let cursos_Docente = [];
        let x=0;
        // Filtrar los cursos del docente actual
        let cursosDocente = cursos.filter(curso => curso.idDocente == docente.idDocentes);

        // Iterar sobre los cursos del docente para filtrar las asistencias del día actual
        for (let j = 0; j < cursosDocente.length; j++) {
          let asistenciasCursos = asistencias.filter(asistencia => 
            asistencia.fecha == fechaHoyFormateada && asistencia.idCurso == cursosDocente[j].idCurso
          );

          // Si hay asistencias registradas para el curso en la fecha actual, agregarlo a la lista
          if (asistenciasCursos.length > 0) {
            cursos_Docente[x] = cursosDocente[j];
            
            cursos_Docente[x] = cursosDocente[j];
            console.log(cursos_Docente)
  
            
            console.log(x)
            cursos_Docente[x].asistencias = asistenciasCursos;
            x++;
          }
        }

        // Asignar los cursos con asistencias al docente
        docente.cursos = cursos_Docente;

        try {
          // Generar el PDF con los datos del docente y los estudiantes
          const pdfBlob = await generatePDFBlob(docente, students);
          const pdfFile = new File([pdfBlob], 'asistencia_diaria.pdf', { type: 'application/pdf' });

          // Preparar el FormData para el envío del correo
          const formData = new FormData();
          formData.append('to', docente.correo);
          formData.append('subject', subject);
          formData.append('text', text);
          formData.append('file', pdfFile);

          // Enviar el correo electrónico
          const response = await axios.post(apiUrl+'/send-email', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Response:', response.data);

        } catch (error) {
          console.error('Error al enviar el correo electrónico:', error);
        }
      }
    };

    // Definir la hora a la que se ejecutará la función de envío de correos
    const targetHour = 10; // Hora en formato de 24 horas
    const targetMinute = 18; // Minuto específico 
    const targetSecond = 0; // Segundo específico

    // Obtener la hora actual y calcular el tiempo restante hasta la hora programada
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(targetHour, targetMinute, targetSecond, 0);

    // Si la hora programada ya pasó, ajustarla para el día siguiente
    if (targetTime < now) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilExecution = targetTime - now;

    // Configurar un temporizador para ejecutar las funciones fetchData y sendEmails a la hora programada
    const timer = setTimeout(() => {
      fetchData();
      sendEmails();
    }, timeUntilExecution);
    
    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
    
  }, [dispatch]);

  return (
    <div>
      {/* Este componente se ejecutará automáticamente a la hora acordada */}
    </div>
  );
}

export default Email;





