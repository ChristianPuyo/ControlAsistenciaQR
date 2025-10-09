import React, { useState,useContext,useEffect } from 'react';

import { DataContext,SET_USERS } from '../Context2/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de importar tu archivo CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

const apiUrl = process.env.REACT_APP_API_URL; 

const SignInForm = () => {
  const { state  , dispatch  } = useContext(DataContext);
  const { users } = state;

  const [formData, setFormData] = useState({
    users: '',
    contraseña: ''
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      // Encontrar el usuario por el campo user
      const user = users.find(u => u.users === formData.users);
  
      if (user && user.contraseña === formData.contraseña) {
        // Usuario y contraseña coinciden
        navigate('/Home');
      } else {
        // Usuario no encontrado o contraseña incorrecta
        Swal.fire('Error!', 'Usuario o contraseña incorrectos.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Hubo un problema al iniciar sesión.', 'error');
    }
  };
  

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Iniciar sesión</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input 
          type="text" 
          placeholder="Username" 
          name="users"
          value={formData.users}
          onChange={handleChange} 
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input 
          type="password" 
          placeholder="Password" 
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange} 
        />
      </div>
      <input type="submit" value="Iniciar sesión" className="btn solid" />
    </form>
  );
};

const SignUpForm = () => {
  const { state  , dispatch  } = useContext(DataContext);
  const [formData, setFormData] = useState({
    users: '',
    contraseña: '',
    adminCode: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClickRegistrarUsuario = async (e) => {
    e.preventDefault();
  
    const validAdminCode = "1234"; // Código de administrador
  
    if (formData.adminCode !== validAdminCode) {
      Swal.fire('Error!', 'Código de administrador incorrecto.', 'error');
      return;
    }
  
    const { adminCode, ...userData } = formData;
  
    try {
      await axios.post(apiUrl+'/Users', userData);
  
      const response = await axios.get(apiUrl+'/Users'); // Actualiza la lista de usuarios
      dispatch({ type: SET_USERS, payload: response.data });
  
      Swal.fire('Registrado!', 'Usuario registrado con éxito!', 'success');
  
    } catch (error) {
      Swal.fire('Error!', 'Hubo un problema al registrar el usuario.', 'error');
    }
  };
  

  return (
    <form className="sign-up-form" onSubmit={handleClickRegistrarUsuario}>
      <h2 className="title">Crear cuenta de Administrador</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          name="users"
          value={formData.users}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="CodigoAdmin"
          name="adminCode"
          value={formData.adminCode}
          onChange={handleChange}
        />
      </div>
      <input type="submit" className="btn" value="Registrar" />
    </form>
  );
};

const PanelContent = ({ title, description, buttonText, onClick }) => (
  <div className="content">
    <h3>{title}</h3>
    <p>{description}</p>
    <button className="btn transparent" onClick={onClick}>
      {buttonText}
    </button>
  </div>
);

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <PanelContent
            title="¿Aún no estas registrado?"
            description="Crea tu cuenta con un usuario y contraseña para iniciar sesión"
            buttonText="Crear cuenta"
            onClick={() => setIsSignUpMode(true)}
          />
          <img src="img/log del area png1.png" className="image" alt="" id="logo" />
        </div>
        <div className="panel right-panel">
          <PanelContent
            title="¿Ya estas registrado?"
            description="Inicia sesión con tu usuario y contraseña para acceder al sistema"
            buttonText="Iniciar sesión"
            onClick={() => setIsSignUpMode(false)}
          />
          <img src="img/log del area png1.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
