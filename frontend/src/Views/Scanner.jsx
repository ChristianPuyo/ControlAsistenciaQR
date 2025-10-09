import React from 'react';
import ListaCurso from '../Components/Scanner/ListaCursos';
import Scanner from '../Components/Scanner/Scanner';
import Email from '../Components/ReporteAutomatico/Email';
import Hearder from './Header/Header';
import Guardar from '../Components/Scanner/Registrar';
import MyQRCode from '../Components/QrCode/QrCode';

import styles from './Scanner.module.css'; // Importa el archivo CSS Module

const ScannerComponent = () => {
  return (
    <div>
        <Hearder />
    <div className={styles.mainContainer}>
      

      <h1 className={styles.header}>Bienvenido al Sistema de Control de Asistencia</h1>

      <div className={styles.contentContainer}>
        <div className={styles.listContainer}>
          <ListaCurso />  
        </div>
        <div className={styles.scannerContainer}>
          <Scanner />
          {/* <MyQRCode/> */}
        </div>
      </div>

      <Email />
      <Guardar />
    </div>
    </div>
    
  );
};

export default ScannerComponent;
