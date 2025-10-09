//esto es para generar un codigo QR

import React from 'react';

import QRCode from 'react-qr-code';
const datos={
  "dni":"46504163",
  "firstName":"Jihec Dustin",
  "lastName":"Puyo Zavala"
}
    
const jsonData = JSON.stringify(datos);


const MyQRCode = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>QR Prueba de ingreso de datos</h1>
      <QRCode
        value={jsonData}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
};
export default MyQRCode;