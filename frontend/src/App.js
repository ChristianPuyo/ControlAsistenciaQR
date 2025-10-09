// App.js
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScannerComponent from './Views/Scanner';
import EmailForm from './Components/Email/Enviar';
import { DataProvider } from './Components/Context2/Context';
import RegistrarEstudiantes from './Components/Form/Student';
import RegistrarCursos from './Components/Form/Cursos';
import RegistrarDocentes from './Components/Form/Docentes';

import GenerarQR from './Components/GeneradorQr/GeneradorQR';
import Login from './Components/Login/Login';

import CursoComponent from './Components/IngresarDatos/Cursos';
import AsistenciaComponent from './Components/IngresarDatos/Asistencias';
import Rstudent from './Components/IngresarDatos/Student';
import Docentes from './Components/IngresarDatos/Docentes';

import UpdateStudent from './Components/UpdateStudent/UpdateStudent';
import UpdateCourses from './Components/UpdateCourses/UpdateCourses';
import UpdateTeacher from './Components/UpdateTeachers/UpdateTeachers'; 
const RegistrarDatos = () => {
  return (
    <div>
      <CursoComponent />
      <AsistenciaComponent />
      <Rstudent />
      <Docentes />
    </div>
  );
}

function App() {
  return (
    <div >
      <DataProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} />
        
          <Route path="/Home" element={<ScannerComponent />} />
          
          <Route path="/Reporte" element={<EmailForm />} />
          
          {/* Rutas para los formularios */}
          <Route path="/Student" element={<RegistrarEstudiantes/>} />
          <Route path="/Cursos" element={<RegistrarCursos/>} />
          <Route path="/Docentes" element={<RegistrarDocentes/>} />
          <Route path="/GenerarQr" element={<GenerarQR/>} />

          <Route path="/Student/:id" element={<UpdateStudent/>} />
          <Route path="/Cursos/:id" element={<UpdateCourses/>} />
          <Route path="/Docentes/:id" element={<UpdateTeacher/>} />


          {/* esto es solo para ingresar datos de manera rapida */}
          <Route path="/Registrar" element={<RegistrarDatos />} />
        </Routes>
      </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
