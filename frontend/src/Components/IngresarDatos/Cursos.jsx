//Datos de Prueva para los reportes

import React from 'react';
import axios from 'axios';

const dataCurso = [
  // { "nombreCurso": "Lenguaje de programación", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Arquitectura de Computadoras e Integración de Tic", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Análisis y diseño de sistemas", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Fundamentos de programación", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Redes y conectividad de Computadoras", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Herramientas de Programación Distribuida", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Herramientas de Programación Concurrente", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Administración de redes y servidores", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Aplicaciones empresariales", "idCiclo": 1, "descripcion": "--" },
  { "idDocente":1,"nombreCurso": "Lógica de programación", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Comunicación oral", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Interpretación y producción de textos", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Aplicaciones de internet", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Ofimática", "idCiclo": 1, "descripcion": "--" },
  // { "nombreCurso": "Arquitectura de Base de Datos", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Taller de Base de Datos", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Programación Distribuida", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Programación Concurrente", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Programación Orientada a Objetos", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Taller de Software", "idCiclo": 2, "descripcion": "--" },
  { "idDocente":1,"nombreCurso": "Seguridad Informática", "idCiclo": 4, "descripcion": "--" },
  // { "nombreCurso": "Diseño Gráfico", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Modelamiento de Software", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Inglés para la comunicación oral", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Comprensión y redacción en inglés", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Innovación Tecnológica", "idCiclo": 2, "descripcion": "--" },
  // { "nombreCurso": "Cultura Ambiental", "idCiclo": 2, "descripcion": "--" },

  // { "idDocente":1,"nombreCurso": "Gestión y Administración Web", "idCiclo": 6, "descripcion": "--" },
  // { "idDocente":1,"nombreCurso": "Animación Gráfica", "idCiclo": 3, "descripcion": "--" },
  // { "idDocente":1,"nombreCurso": "Diseño Web", "idCiclo": 3, "descripcion": "--" },
  // { "nombreCurso": "Taller de programación Web", "idCiclo": 3, "descripcion": "--" },
  // { "idDocente":1,"nombreCurso": "Diseño de Aplicaciones Móviles", "idCiclo": 6, "descripcion": "--" },

  { "idDocente":1,"nombreCurso": "Taller de Aplicaciones Móviles", "idCiclo": 6, "descripcion": "--" },

  // { "nombreCurso": "Inteligencia de Negocios", "idCiclo": 3, "descripcion": "--" },
  // { "idDocente":1,"nombreCurso": "Herramientas Multimedia", "idCiclo": 3, "descripcion": "--" },
  // { "idDocente":1,"nombreCurso": "Comportamiento ético", "idCiclo": 3, "descripcion": "--" },
  // { "nombreCurso": "Solución de problemas", "idCiclo": 3, "descripcion": "--" },
  // { "idDocente":1,"nombreCurso": "Oportunidades de negocios", "idCiclo": 3, "descripcion": "--" }
];

const CursoComponent = () => {

  const handleSubmit = () => {
    dataCurso.forEach(course => {
      axios.post('http://localhost:3001/Cursos', course)
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
      <button onClick={handleSubmit}>Submit All Courses</button>
    </div>
  );
};

export default CursoComponent;
