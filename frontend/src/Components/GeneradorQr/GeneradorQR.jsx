import React, { useEffect, useContext, useState } from 'react';
import { DataContext, SET_STUDENTS } from '../Context2/Context';
import axios from 'axios';
import Header from '../../Views/Header/Header';
import QRCode from 'react-qr-code';
import styles from './GeneradorQR.module.css'; 
import Email from '../ReporteAutomatico/Email';

const apiUrl = process.env.REACT_APP_API_URL; 

const GenerarQR = () => {
    const { state, dispatch } = useContext(DataContext);
    const { students } = state;
    
    const [studentSelect, setStudentSelect] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStudents = await axios.get(apiUrl+'/Student');
                dispatch({ type: SET_STUDENTS, payload: responseStudents.data });
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const selectedStudent = students.find(student => student.idEstudiante === parseInt(selectedId));
        console.log(selectedStudent)
        
            
        const jsonData = JSON.stringify(selectedStudent);

        setStudentSelect(jsonData);
        
        console.log(jsonData)
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = students.filter(student => 
        `${student.lastName} ${student.firstName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className={styles.header}>
        <Header />
        </div>
        <div className={styles.container}>
           
            <div className={styles.searchContainer}>
                <label htmlFor="search">Buscar Estudiante:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Buscar por nombre o apellido"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.selectContainer}>
                <label htmlFor="selectStudent">Seleccionar Estudiante:</label>
                <select
                    id="selectStudent"
                    onChange={handleSelectChange}
                    className={styles.selectInput}
                >
                    <option value="">Seleccione un estudiante</option>
                    {filteredStudents.map((student) => (
                        <option key={student.idEstudiante} value={student.idEstudiante}>
                            {student.lastName} {student.firstName}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.qrCodeContainer}>
                {studentSelect && (
                    <div>
                        
                        <QRCode value={studentSelect} className={styles.qrCode} />
                    </div>
                )}
            </div>
            <Email/> {/*sirve para enviar los correos automaticamente */}
        </div>

        
        </div>
        
    );
};

export default GenerarQR;


