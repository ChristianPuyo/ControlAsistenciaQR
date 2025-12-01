import React from 'react';
import style from './Header.module.css'

import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();

  const handleClickHome=()=>{
    navigate('/Home')
  }
  const handleClickStudent = () => {
    navigate('/Student');
  };
  const handleClickRegistro = () => {
    navigate('/Cursos');
  };
  const handleClickDocentes = () => {
    navigate('/Docentes');
  };
  const handleClickReporte = () => {
    navigate('/Reporte');
  };
  const handleClickQR = () => {
    navigate('/GenerarQR');
  };
  
  return (
    <div >
        <section>
            
            <div class={style.container}>
                <header id={style.navbar}>
                <a href="/" >
              <img src="img/log del area png1.png" alt="DSI Logo" />
            </a>
                <a src="img/log del area png1.png" href="/" class={style.logo}>DSI</a>
                
                <ul>
                    <li><a onClick={handleClickHome}>Home</a></li>
                    <li><a onClick={handleClickStudent}>Estudiante</a></li>
                    <li><a onClick={handleClickRegistro}>Cursos</a></li>
                    <li><a onClick={handleClickDocentes}>Docentes</a></li>
                    <li><a onClick={handleClickReporte}>Reporte</a></li>
                    <li><a onClick={handleClickQR}>Generar QR</a></li> 
                    
                </ul>
                <span class={style.menuIcon} ></span>
                </header>
                
            </div>
        </section>
    </div>
    
  );
}

export default Home;