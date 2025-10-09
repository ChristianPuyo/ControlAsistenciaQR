import { useState } from 'react'; 


import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

  //Convertir imágenes a Base64
  
  
  const LogoSuiza = '/img/LogoSuiza.png';

  
   const LogoArea='/img/log del area png1.png';
  const generatePDFBlob = (docente, students) => {
  
  
  

  // Crear un nuevo documento PDF
  const doc = new jsPDF();

  return new Promise((resolve) => {
    // Función para generar el encabezado del PDF con el nombre del curso y la fecha actual
    const encabezado = (curso) => {
      doc.text(`Asistencia Diaria`, 14, 38);
      doc.text(`Docente: ${docente.firstName} ${docente.lastName}`, 14, 45);
      
      doc.text(`Curso : ${curso}`, 14, 52);
      doc.text(`Fecha: ${docente.cursos[0].asistencias[0].fecha}`, 14, 59);
    };

    // Función para generar el cuerpo del PDF, que contiene la lista de estudiantes y su estado de asistencia
    const cuerpo = (studentCursos, asistenciasCursos) => {
      const tableColumn = ['APELLIDOS Y NOMBRES', 'DNI', 'ESTADO'];
      const tableRows = [];

      // Iterar sobre los estudiantes del curso para llenar las filas de la tabla
      for (let i = 0; i < studentCursos.length; i++) {
        const nombres_apellidos = studentCursos[i];
        let estado = 'Ausente'; // Estado por defecto

        // Verificar si el estudiante está presente buscando su registro de asistencia
        const asistencia = asistenciasCursos.find(asistenciaCurso => asistenciaCurso.idEstudiante == nombres_apellidos.idEstudiante);
        if (asistencia && asistencia.Estado) { // Asumimos que `asistencia.Estado` es true si está presente
          estado = 'Presente';
        }

        // Agregar una fila a la tabla con los datos del estudiante
        tableRows.push([`${nombres_apellidos.lastName} ${nombres_apellidos.firstName}`, `${nombres_apellidos.dni}`, `${estado}`]);
      }

      // Generar la tabla en el PDF con las columnas y filas definidas
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        theme: 'striped',
      });
    };

    // Iterar sobre los cursos del docente para generar una sección en el PDF por cada curso
    for (let i = 0; i < docente.cursos.length; i++) {
      if (i > 0) doc.addPage(); // Añadir una nueva página para cada curso después del primero

      // Añadir el título y la información del docente
      doc.addImage(LogoSuiza, 'PNG', 14, 5, 25, 25); // Logo Suiza
      doc.addImage(LogoArea, 'PNG', 170, 5, 25, 25); // Logo del área
      doc.text('Instituto de Educación Superior', 70, 15);
      doc.text('Tecnológica Suiza', 85, 23);
      

      // Llamar a la función de encabezado con el nombre del curso actual
      encabezado(docente.cursos[i].nombreCurso);
      
      // Filtrar los estudiantes del ciclo correspondiente al curso actual
      const studentCursos = students.filter(student => student.idCiclo === docente.cursos[i].idCiclo);
      // Obtener las asistencias del curso actual
      const asistenciasCursos = docente.cursos[i].asistencias;
      
      // Llamar a la función de cuerpo para generar la tabla de asistencia del curso actual
      cuerpo(studentCursos, asistenciasCursos);
    }

    // Convertir el documento PDF a un Blob para su descarga o envío
    const pdfBlob = doc.output('blob');
    resolve(pdfBlob);
  });
};

export default generatePDFBlob;


// const generatePDFBlob = (docente, students) => {

//   const doc = new jsPDF();

//   return new Promise((resolve) => {
//     // Rutas de las imágenes en la carpeta public
//     const logoSuiza = '/img/Logo-suiza.png';
//     const logoArea = '/img/log-del-area-png1.png';

//     // Convertir las dos imágenes a base64
//     getBase64Image(logoSuiza, (base64LogoSuiza) => {
//       getBase64Image(logoArea, (base64LogoArea) => {
//         // Función para generar el encabezado del PDF con el nombre del curso y la fecha actual
//         const encabezado = (curso) => {
//           doc.text(`Curso : ${curso}`, 14, 60); // Ajusta la posición si es necesario
//           doc.text(`Fecha: ${docente.cursos[0].asistencias[0].fecha}`, 14, 70);
//         };

//         // Función para generar el cuerpo del PDF, que contiene la lista de estudiantes y su estado de asistencia
//         const cuerpo = (studentCursos, asistenciasCursos) => {
//           const tableColumn = ['APELLIDOS Y NOMBRES', 'DNI', 'ESTADO'];
//           const tableRows = [];

//           for (let i = 0; i < studentCursos.length; i++) {
//             const nombres_apellidos = studentCursos[i];
//             let estado = 'Ausente'; // Estado por defecto
//             const asistencia = asistenciasCursos.find(asistenciaCurso => asistenciaCurso.idEstudiante == nombres_apellidos.idEstudiante);
//             if (asistencia && asistencia.Estado) {
//               estado = 'Presente';
//             }
//             tableRows.push([`${nombres_apellidos.lastName} ${nombres_apellidos.firstName}`, `${nombres_apellidos.dni}`, `${estado}`]);
//           }

//           doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 80, // Ajusta esta posición si es necesario
//             theme: 'striped',
//           });
//         };

//         // Iterar sobre los cursos del docente
//         for (let i = 0; i < docente.cursos.length; i++) {
//           if (i > 0) doc.addPage();
          
//           // Añadir las imágenes en la parte superior
//           doc.addImage(base64LogoSuiza, 'PNG', 14, 10, 30, 30); // Logo Suiza
//           doc.addImage(base64LogoArea, 'PNG', 180, 10, 30, 30); // Logo del área
//           doc.text('Instituto de Educación Superior Tecnológica Suiza', 70, 20);
//           doc.text(`Docente: ${docente.firstName} ${docente.lastName}`, 14, 50);

//           encabezado(docente.cursos[i].nombreCurso);
//           const studentCursos = students.filter(student => student.idCiclo === docente.cursos[i].idCiclo);
//           const asistenciasCursos = docente.cursos[i].asistencias;
//           cuerpo(studentCursos, asistenciasCursos);
//         }

//         const pdfBlob = doc.output('blob');
//         resolve(pdfBlob);
//       });
//     });
//   });
// };

// export default generatePDFBlob;

