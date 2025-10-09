import React, { createContext, useReducer,useEffect } from 'react';

const apiUrl = process.env.REACT_APP_API_URL; 

// Definir las acciones
const SET_SCAN_RESULT = 'SET_SCAN_RESULT';
const CLEAR_SCAN_RESULT = 'CLEAR_SCAN_RESULT';

const SET_CURSOS = 'SET_CURSOS';
const SET_DOCENTES = 'SET_DOCENTES';
const SET_ASISTENCIAS = 'SET_ASISTENCIAS';
const SET_STUDENTS = 'SET_STUDENTS';
const SET_CICLO = 'SET_CICLO';
const SET_USERS = 'SET_USERS';


const SET_LOADING = 'SET_LOADING';
const SET_SELECTED_CURSO = 'SET_SELECTED_CURSO';

// Estado inicial
const initialState = {
  scanResult: '',
  
  cursos: [],
  docentes: [],
  students: [],
  asistencias: [],
  ciclos:[],
  users: [],
  loading: true,
  selectedCurso: ""
};


// Reducer
const DataReducer = (state, action) => {
  switch (action.type) {
    case SET_SCAN_RESULT:
        return { ...state, scanResult: action.payload };
    
    case SET_CURSOS:
        return { ...state, cursos: action.payload };
    case SET_DOCENTES:
        return { ...state, docentes: action.payload };
    case SET_ASISTENCIAS:
        return { ...state, asistencias: action.payload };
    case SET_STUDENTS:
        return { ...state, students: action.payload };
    case SET_CICLO:
      return { ...state, ciclo: action.payload };
    case SET_USERS:
    return { ...state, users: action.payload };

    
    case SET_LOADING:
        return { ...state, loading: action.payload };
    
    case SET_SELECTED_CURSO:
        return { ...state, selectedCurso: action.payload };
    
    case CLEAR_SCAN_RESULT: // Nueva acción para limpiar el scanResult
        return { ...state, scanResult: '' };

    default:
        return state;
  }
};


// Crear el contexto
const DataContext = createContext();

// Proveedor del contexto
const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docentes, cursos, asistencias, students,ciclos,users] = await Promise.all([
          fetch(apiUrl+'/Docentes').then(res => res.json()),
          fetch(apiUrl+'/Cursos').then(res => res.json()),
          fetch(apiUrl+'/registroAsistencia').then(res => res.json()),
          fetch(apiUrl+'/Student').then(res => res.json()),
          fetch(apiUrl+'/Ciclo').then(res => res.json()),
          fetch(apiUrl+'/Users').then(res => res.json()),
        ]);

        dispatch({ type: SET_DOCENTES, payload: docentes });
        dispatch({ type: SET_CURSOS, payload: cursos });
        dispatch({ type: SET_ASISTENCIAS, payload: asistencias });
        dispatch({ type: SET_STUDENTS, payload: students });
        dispatch({ type: SET_CICLO, payload: ciclos });
        dispatch({ type: SET_USERS, payload: users });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export {
    DataContext,
    DataProvider,
  SET_SCAN_RESULT,
  
  SET_CURSOS,
  SET_DOCENTES,
  SET_STUDENTS,
  SET_ASISTENCIAS,
  SET_CICLO,
  SET_USERS,
  
  SET_LOADING,
  SET_SELECTED_CURSO,
  CLEAR_SCAN_RESULT
};
