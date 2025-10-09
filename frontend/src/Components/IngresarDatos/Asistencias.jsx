//Datos de Prueva para los reportes

import React from 'react';
import axios from 'axios';

const dataAsistencia=[
 
// {
//     "idEstudiante": 1,
//     "idCurso": 6,
//     "fecha": "2024-07-16",
//     "Estado": true
// },
{
    "idEstudiante": 2,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 3,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
// {
//     "idEstudiante": 4,
//     "idCurso": 6,
//     "fecha": "2024-07-16",
//     "Estado": true
// },
{
    "idEstudiante": 5,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 6,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 7,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 8,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 9,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 10,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 11,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 12,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 13,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 14,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 15,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 16,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 17,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 18,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 19,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 21,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 23,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 25,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 27,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 28,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 29,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 30,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
{
    "idEstudiante": 31,
    "idCurso": 6,
    "fecha": "2024-07-16",
    "Estado": true
},
// {
//     "idEstudiante": 24,
//     "idCurso": 1,
//     "fecha": "2024-07-16",
//     "Estado": true
// },
// {
//     "idEstudiante": 26,
//     "idCurso": 1,
//     "fecha": "2024-07-16",
//     "Estado": true
// },
// {
//     "idEstudiante": 22,
//     "idCurso": 2,
//     "fecha": "2024-07-16",
//     "Estado": true
// },
// {
//     "idEstudiante": 20,
//     "idCurso": 2,
//     "fecha": "2024-07-16",
//     "Estado": true
// }



]


const AsistenciaComponent = () => {

  const handleSubmit = () => {
    dataAsistencia.forEach(course => {
      axios.post('http://localhost:3001/registroAsistencia', course)
        .then(response => {
          console.log(`Course ${course.nombreCurso} submitted successfully`, response);
        })
        .catch(error => {
          console.error(`There was an error submitting the course ${course.nombreCurso}!`, error);
        });
    });
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit All ASistencias</button>
    </div>
  );
};

export default AsistenciaComponent;
