//Datos de Prueva para los reportes

import React from 'react';
import axios from 'axios';

const docentes=[
    // {
    // "nombres":"GIL",
    // "apellidos":"TORRES ARÉVALO",
    // "correo":"123123giltorresarevalo@Gmail.com",
    // "cargo":"COORDINADOR DEL PE"
    // },
    // {
    // "nombres":"RUBER",
    // "apellidos":"TORRES ARÉVALO",
    // "correo":"123123rutaar2015@gmail.com",
    // "cargo":"DOCENTE"
    // },
    // {
    // "nombres":"CHRISTIAN DUSTIN",
    // "apellidos":"PUYO TORRES",
    // "correo":"12312312christianpuyotorres@gmail.com",
    // "cargo":"DOCENTE"
    // },
    // {
    // "nombres":"JOHN",
    // "apellidos":"SABOYA FULCA",
    // "correo":"23412123123afheryita@gmail.com",
    // "cargo":"DOCENTE"
    // },
    // {
    // "nombres":"JUAN CARLOS",
    // "apellidos":"RÍOS ARRIAGA",
    // "correo":"12324virgojuank@hotmail.com",
    // "cargo":"DOCENTE"
    // },
    // {
    //   "firstName":"Frank Patrick",
    //   "lastName":"Cahuachi Chu",
    //   "correo":"frankcahuachichu@gmail.com",
    //   "dni":"72848961"
    //   },
      {
        "firstName":"CHRISTIAN DUSTIN",
        "lastName":"PUYO TORRES",
        "correo":"frankpatrickcahuachichu@gmail.com",
        "dni":"72848962"
      }
]
const Docentes = () => {

    const handleSubmit = () => {
        docentes.forEach(course => {
        axios.post('http://localhost:3001/Docentes', course)
          .then(response => {
            console.log(`Course  submitted successfully`, response);
          })
          .catch(error => {
            console.error(`There was an error submitting the course !`, error);
          });
      });
    };
  
    return (
      <div>
        <button onClick={handleSubmit}>Submit All Docentes</button>
      </div>
    );
  };
  
  export default Docentes;
  