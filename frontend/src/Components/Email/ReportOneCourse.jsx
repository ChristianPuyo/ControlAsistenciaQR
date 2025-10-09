// import React, { useState, useContext, useEffect } from 'react';
// import { DataContext, SET_CURSOS, SET_DOCENTES, SET_ASISTENCIAS, SET_STUDENTS } from '../Context2/Context';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import generatePDFBlob from '../Reporte/Document';
// import Header from '../../Views/Header/Header';

// const MySwal = withReactContent(Swal);

// const ReportOneCourse = () => {
//   const { state, dispatch } = useContext(DataContext);
//   const { students, docentes, cursos, asistencias } = state;

//   const [startDate, setStartDate] = useState(new Date());
//   const [selectedCurso, setSelectedCurso] = useState('');
//   const [asistenciasCurso, setAsistenciasCurso] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const subject = 'Reporte de Asistencia';
//   const text = '';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseStudents = await axios.get('http://localhost:3001/Student');
//         dispatch({ type: SET_STUDENTS, payload: responseStudents.data });

//         const responseDocentes = await axios.get('http://localhost:3001/Docentes');
//         dispatch({ type: SET_DOCENTES, payload: responseDocentes.data });

//         const responseCursos = await axios.get('http://localhost:3001/Cursos');
//         dispatch({ type: SET_CURSOS, payload: responseCursos.data });

//         const responseAsistencias = await axios.get('http://localhost:3001/registroAsistencia');
//         dispatch({ type: SET_ASISTENCIAS, payload: responseAsistencias.data });

//         console.log('Cursos cargados:', responseCursos.data);

//       } catch (error) {
//         console.error('Error al obtener los datos:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleDateChange = (date) => {
//     setStartDate(date);
//   };

//   const handleCursoChange = (e) => {
//     const selectedCursoId = e.target.value;
//     setSelectedCurso(selectedCursoId);

//     if (selectedCursoId) {
//       const selectedDate = new Date(startDate);
//       selectedDate.setHours(0, 0, 0, 0);
//       const formattedDate = selectedDate.toISOString().split('T')[0];

//       const filteredAsistencias = asistencias.filter(asistencia => 
//         asistencia.fecha === formattedDate && asistencia.idCurso === parseInt(selectedCursoId)
//       );

//       setAsistenciasCurso(filteredAsistencias);
//     } else {
//       setAsistenciasCurso([]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!selectedCurso) {
//       Swal.fire('Error', 'Por favor selecciona un curso', 'error');
//       setIsSubmitting(false);
//       return;
//     }

//     const selectedDate = new Date(startDate);
//     selectedDate.setHours(0, 0, 0, 0);
//     const formattedDate = selectedDate.toISOString().split('T')[0];

//     const curso = cursos.find(curso => curso.idCurso === parseInt(selectedCurso));

//     if (!curso) {
//       Swal.fire('Error', 'Curso no encontrado', 'error');
//       setIsSubmitting(false);
//       return;
//     }

//     const docente = docentes.find(docente => docente.idDocentes === curso.idDocente);

//     if (!docente) {
//       Swal.fire('Error', 'Docente no encontrado para el curso seleccionado', 'error');
//       setIsSubmitting(false);
//       return;
//     }

//     if (asistenciasCurso.length === 0) {
//       Swal.fire('Error', 'No se encontraron asistencias para este curso en la fecha seleccionada', 'error');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const pdfBlob = await generatePDFBlob({ ...docente, cursos: [{ ...curso, asistencias: asistenciasCurso }] }, students);
//       const pdfFile = new File([pdfBlob], 'asistencia_curso.pdf', { type: 'application/pdf' });

//       const formData = new FormData();
//       formData.append('to', docente.correo);
//       formData.append('subject', subject);
//       formData.append('text', text);
//       formData.append('file', pdfFile);

//       const response = await axios.post('http://localhost:3001/send-email', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Response:', response.data);

//       MySwal.fire({
//         title: 'Enviado!',
//         text: `El correo con la asistencia del curso ${curso.nombreCurso} fue enviado exitosamente al docente ${docente.firstName} ${docente.lastName}`,
//         icon: 'success',
//         timer: 5000,
//         showConfirmButton: true,
//       });

//     } catch (error) {
//       console.error('Error al enviar el correo electrónico:', error);
//       MySwal.fire({
//         title: 'Oops...!',
//         text: 'Error al enviar el correo electrónico',
//         icon: 'error',
//         timer: 5000,
//         showConfirmButton: true,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getEstadoAsistencia = (asistencia) => asistencia ? 'Presente' : 'Ausente';

//   return (
//     <div>
      
//       <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
//         <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center', margin: '20px 0', padding: '10px', borderBottom: '2px solid #ccc' }}>
//           Asistencia por curso
//         </h2>
//         <div className="input-field">
//           <i className="fa-solid fa-calendar-days"></i>
//           <DatePicker
//             selected={startDate}
//             onChange={handleDateChange}
//             placeholderText="Fecha"
//             dateFormat="dd/MM/yyyy"
//             className="date-picker-input"
//           />
//         </div>

//         <div className="input-fieldd">
//           <select
//             id="curso-select"
//             value={selectedCurso}
//             onChange={handleCursoChange}
//             style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
//           >
//             <option value="">--Seleccionar curso--</option>
//             {cursos.map((curso) => (
//               <option key={curso.idCurso} value={curso.idCurso}>
//                 {curso.nombreCurso || 'Sin nombre'}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedCurso && (
//           <div style={{ marginTop: '2rem' }}>
//             <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
//               Detalles de Asistencia
//             </h3>
//             <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
//               <thead>
//                 <tr>
//                   <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Estudiante</th>
//                   <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre Estudiante</th>
//                   <th style={{ border: '1px solid #ddd', padding: '8px' }}>Estado</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students
//                   .filter(student => student.idCiclo === cursos.find(curso => curso.idCurso === parseInt(selectedCurso)).idCiclo)
//                   .map((student) => {
//                     const asistenciaEstudiante = asistenciasCurso.find(asistencia => asistencia.idEstudiante === student.idEstudiante);
//                     console.log("Ver estaodo del estudiante:",asistenciaEstudiante)
//                     const estado = asistenciaEstudiante ? getEstadoAsistencia(asistenciaEstudiante.Estado) : 'Ausente';
//                     return (
//                       <tr key={student.idEstudiante}>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.idEstudiante}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.firstName} {student.lastName}</td>
//                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>{estado}</td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
//           {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReportOneCourse;




















import React, { useState, useContext, useEffect } from 'react';
import { DataContext, SET_CURSOS, SET_DOCENTES, SET_ASISTENCIAS, SET_STUDENTS } from '../Context2/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import generatePDFBlob from '../Reporte/Document';
import Header from '../../Views/Header/Header';

const apiUrl = process.env.REACT_APP_API_URL; 

const MySwal = withReactContent(Swal);

const ReportOneCourse = () => {
  const { state, dispatch } = useContext(DataContext);
  const { students, docentes, cursos, asistencias } = state;

  const [startDate, setStartDate] = useState(new Date());
  const [selectedCurso, setSelectedCurso] = useState('');
  const [asistenciasCurso, setAsistenciasCurso] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subject = 'Reporte de Asistencia';
  const text = '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStudents = await axios.get(apiUrl+'/Student');
        dispatch({ type: SET_STUDENTS, payload: responseStudents.data });

        const responseDocentes = await axios.get(apiUrl	+'/Docentes');
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

  const handleCursoChange = (e) => {
    const selectedCursoId = e.target.value;
    setSelectedCurso(selectedCursoId);

    if (selectedCursoId) {
      const selectedDate = new Date(startDate);
      selectedDate.setHours(0, 0, 0, 0);
      const formattedDate = selectedDate.toISOString().split('T')[0];

      const filteredAsistencias = asistencias.filter(asistencia => 
        asistencia.fecha === formattedDate && asistencia.idCurso === parseInt(selectedCursoId)
      );

      setAsistenciasCurso(filteredAsistencias);
    } else {
      setAsistenciasCurso([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedCurso) {
      Swal.fire('Error', 'Por favor selecciona un curso', 'error');
      setIsSubmitting(false);
      return;
    }

    const selectedDate = new Date(startDate);
    selectedDate.setHours(0, 0, 0, 0);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const curso = cursos.find(curso => curso.idCurso === parseInt(selectedCurso));

    if (!curso) {
      Swal.fire('Error', 'Curso no encontrado', 'error');
      setIsSubmitting(false);
      return;
    }

    const docente = docentes.find(docente => docente.idDocentes === curso.idDocente);

    if (!docente) {
      Swal.fire('Error', 'Docente no encontrado para el curso seleccionado', 'error');
      setIsSubmitting(false);
      return;
    }

    if (asistenciasCurso.length === 0) {
      Swal.fire('Error', 'No se encontraron asistencias para este curso en la fecha seleccionada', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const pdfBlob = await generatePDFBlob({ ...docente, cursos: [{ ...curso, asistencias: asistenciasCurso }] }, students);
      const pdfFile = new File([pdfBlob], 'asistencia_curso.pdf', { type: 'application/pdf' });

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

      MySwal.fire({
        title: 'Enviado!',
        text: `El correo con la asistencia del curso ${curso.nombreCurso} fue enviado exitosamente al docente ${docente.firstName} ${docente.lastName}`,
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
  };

  const getEstadoAsistencia = (asistencia) => asistencia ? 'Presente' : 'Ausente';

  const todosAusentes = () => {
    const cursoSeleccionado = cursos.find(curso => curso.idCurso === parseInt(selectedCurso));

    // Verificar que el curso exista antes de intentar acceder a idCiclo
    if (!cursoSeleccionado) {
      return false;
    }

    return students
      .filter(student => student.idCiclo === cursoSeleccionado.idCiclo)
      .every(student => {
        const asistenciaEstudiante = asistenciasCurso.find(asistencia => asistencia.idEstudiante === student.idEstudiante);
        return !asistenciaEstudiante || !asistenciaEstudiante.Estado;
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center', margin: '20px 0', padding: '10px', borderBottom: '2px solid #ccc' }}>
          Asistencia por curso
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

        <div className="input-fieldd">
          <select
            id="curso-select"
            value={selectedCurso}
            onChange={handleCursoChange}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
          >
            <option value="">--Seleccionar curso--</option>
            {cursos.map((curso) => (
              <option key={curso.idCurso} value={curso.idCurso}>
                {curso.nombreCurso || 'Sin nombre'}
              </option>
            ))}
          </select>
        </div>

        {selectedCurso && !todosAusentes() && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
              Detalles de Asistencia
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Estudiante</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre Estudiante</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter(student => student.idCiclo === cursos.find(curso => curso.idCurso === parseInt(selectedCurso)).idCiclo)
                  .map((student) => {
                    const asistenciaEstudiante = asistenciasCurso.find(asistencia => asistencia.idEstudiante === student.idEstudiante);
                    const estado = asistenciaEstudiante ? getEstadoAsistencia(asistenciaEstudiante.Estado) : 'Ausente';
                    return (
                      <tr key={student.idEstudiante}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.idEstudiante}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.firstName} {student.lastName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{estado}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="submit"
          className="btnn"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '1rem' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
        </button>
      </form>
    </div>
  );
};

export default ReportOneCourse;








