import React, { useState, useContext, useEffect } from 'react';
import { DataContext, SET_CURSOS, SET_DOCENTES, SET_ASISTENCIAS, SET_STUDENTS } from '../Context2/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import generatePDFBlob from '../Reporte/Document';
import Header from '../../Views/Header/Header';
import styles from './Enviar.module.css'
import ReportOneCourse from './ReportOneCourse';
import Email from '../ReporteAutomatico/Email';

const apiUrl = process.env.REACT_APP_API_URL; 

// Inicializa SweetAlert2 con soporte para React
const MySwal = withReactContent(Swal);

const EmailForm = () => {
  const { state, dispatch } = useContext(DataContext);
  const { students, docentes, cursos, asistencias } = state;

  const [startDate, setStartDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filteredAsistencias, setFilteredAsistencias] = useState([]);

  const subject = 'Reporte de Asistencia';
  const text = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStudents = await axios.get(apiUrl+'/Student');
        dispatch({ type: SET_STUDENTS, payload: responseStudents.data });

        const responseDocentes = await axios.get(apiUrl+'/Docentes');
        dispatch({ type: SET_DOCENTES, payload: responseDocentes.data });

        const responseCursos = await axios.get(apiUrl+'/Cursos');
        dispatch({ type: SET_CURSOS, payload: responseCursos.data });

        const responseAsistencias = await axios.get(apiUrl+'/registroAsistencia');
        dispatch({ type: SET_ASISTENCIAS, payload: responseAsistencias.data });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const filterAsistencias = () => {
    const selectedDate = new Date(startDate);
    selectedDate.setHours(0, 0, 0, 0); // Ajusta la hora a medianoche
    const formattedDate = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"

    const cursosConAsistencias = cursos.map(curso => {
      const asistenciasCurso = asistencias.filter(asistencia =>
        asistencia.fecha === formattedDate && asistencia.idCurso === curso.idCurso
      );
      const estudiantesEnCiclo = students.filter(student => student.idCiclo === curso.idCiclo);

      const estudiantesConAsistencia = estudiantesEnCiclo.map(student => {
        const asistencia = asistenciasCurso.find(a => a.idEstudiante === student.idEstudiante);
        return {
          idEstudiante: student.idEstudiante,
          nombre: `${student.firstName} ${student.lastName}`,
          estado: asistencia ? (asistencia.Estado ? 'Presente' : 'Ausente') : 'Ausente',
        };
      });

      // Excluir el curso si todos los estudiantes están ausentes
      const hayAsistencia = estudiantesConAsistencia.some(estudiante => estudiante.estado === 'Presente');

      return {
        ...curso,
        estudiantes: estudiantesConAsistencia
      };
    }).filter(curso => curso.estudiantes.length > 0 && curso.estudiantes.some(estudiante => estudiante.estado === 'Presente'));

    setFilteredAsistencias(cursosConAsistencias);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedDate = new Date(startDate);
    selectedDate.setHours(0, 0, 0, 0); // Ajusta la hora a medianoche
    const formattedDate = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"

    for (let i = 0; i < docentes.length; i++) {
      let docente = docentes[i];

      // Filtra los cursos que pertenecen al docente actual
      let cursosDocente = cursos.filter(curso => curso.idDocente === docente.idDocentes);
      let cursos_Docente = [];

      for (let j = 0; j < cursosDocente.length; j++) {
        let asistenciasCursos = asistencias.filter(asistencia => 
          asistencia.fecha === formattedDate && asistencia.idCurso === cursosDocente[j].idCurso
        );

        if (asistenciasCursos.length > 0) {
          cursos_Docente.push({
            ...cursosDocente[j],
            asistencias: asistenciasCursos
          });
        }
      }

      docente.cursos = cursos_Docente;
      
      try {
        const pdfBlob = await generatePDFBlob(docente, students);
        const pdfFile = new File([pdfBlob], 'asistencia_diaria.pdf', { type: 'application/pdf' });

        const formData = new FormData();
        formData.append('to', docente.correo);
        formData.append('subject', subject);
        formData.append('text', text);
        formData.append('file', pdfFile);

        const response = await axios.post(apiUrl+'/send-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response:', response.data);

        MySwal.fire({
          title: 'Enviado!',
          text: `El correo fue enviado exitosamente al docente ${docente.firstName} ${docente.lastName}`,
          icon: 'success',
          timer: 5000,
          showConfirmButton: true,
        });

      } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        MySwal.fire({
          title: 'Oops...!',
          text: 'Error al enviar el correo electrónico',
          icon: 'error',
          timer: 5000,
          showConfirmButton: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div>
        <Header /> {/* Muestra el componente Header en la parte superior */}
      </div>

      <div className={styles.containerEnviar}>
        <div className={styles.div2}>
          
          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        margin: '20px 0',
        padding: '10px',
        borderBottom: '2px solid #ccc'
      }}
    >
      Todas las asistencias
    </h2>

            <div className="input-field">
              <i className="fa-solid fa-calendar-days"></i>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                placeholderText="Fecha"
                dateFormat="dd/MM/yyyy"
                className="date-picker-input"
              />
            </div>

            <div className="input-fieldf">
              <button
                type="button"
                onClick={filterAsistencias}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
              >
                Cargar Asistencias
              </button>
            </div>

            {/* Tabla para mostrar las asistencias filtradas */}
            {filteredAsistencias.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                {filteredAsistencias.map(curso => (
                  <div key={curso.idCurso} style={{ marginBottom: '2rem' }}>
                    <h3>{curso.nombreCurso}</h3>
                    <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>ID Estudiante</th>
                          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Nombre Estudiante</th>
                          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {curso.estudiantes.map(estudiante => (
                          <tr key={estudiante.idEstudiante}>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{estudiante.idEstudiante}</td>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{estudiante.nombre}</td>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{estudiante.estado}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
              {isSubmitting ? 'Enviando...' : 'Enviar Reportes'}
            </button>
          </form>
        </div>
        <div className={styles.div2}>
            <ReportOneCourse/>
        </div>
      </div>
            <Email></Email> {/*sirve para enviar los correos automaticamente */}
    </div>
  );
};

export default EmailForm;


