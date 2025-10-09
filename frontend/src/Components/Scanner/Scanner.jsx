import React, { useContext, useState } from 'react';
import QrReader from 'react-qr-scanner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// Styles
import "./QrStyles.css";
import { DataContext, SET_SCAN_RESULT } from '../Context2/Context';

const MySwal = withReactContent(Swal);

const Scanner = () => {
  const { state, dispatch } = useContext(DataContext);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      dispatch({ type: SET_SCAN_RESULT, payload: data.text });
      // Stop scanning after a successful scan
      console.log("Information Scann:",data.text);
      
      // MySwal.fire({
      //   title: 'Scan Successful!',
      //   text: data.text,
      //   icon: 'success',
      //   timer: 5000,
      //   showConfirmButton: true,
      // });
    }
  };

  const handleError = (err) => {
    console.error(err);
    MySwal.fire({
      title: 'Error',
      text: 'An error occurred while scanning. Please try again.',
      icon: 'error',
      timer: 5000,
      showConfirmButton: true,
    });
    setIsScanning(false); // Stop scanning on error
  };

  const handleManualRestart = () => {
    setIsScanning(false); // Stop scanning to reset
    setTimeout(() => setIsScanning(true), 100); // Restart scanning after a short delay
  };

  const previewStyle = {
    height: 360,
    width: 420,
    margin: '0 auto', // Center the scanner
  };

  return (
    <div>
      <div className="qr-reader">
        {!isScanning ? (
          <div className="start-button-container">
            <button 
              className="start-button" 
              onClick={() => setIsScanning(true)}
              disabled={!state.selectedCurso} // Disable if no course is selected
            >
              {state.selectedCurso ? "Start Scanning" : "Please select a course"}
            </button>
          </div>
        ) : (
          <div>
            <QrReader
              delay={300}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
            <div className="start-button-container">
              <button className="stop-button" onClick={() => setIsScanning(false)}>
                Detener escaner
              </button>
              <button className="start-button" onClick={handleManualRestart}>
                Reiniciar escaner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner; 
