import { Route, Routes,} from 'react-router';
import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './contenedores/Login';
import Dashboard from './contenedores/Dashboard/Dashboard.jsx';
import ModificarCliente from './contenedores/Clientes/Modificar';
import Perfil from './contenedores/Perfil';
import Series from './contenedores/Series';
import Nav from './componentes/Nav';
import DashGrafos from './contenedores/Dashboard/DashboardGrafos';
import DashModelo from './contenedores/Dashboard/DashboardModelo';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Informes from './contenedores/Informe/informes/src/components/Informes/Informes';
import GrafoComunidadesSolo from './componentes/Graficos/GrafoComunidadesSolo';
import { Navigate } from 'react-router-dom';
import Error404 from './contenedores/404/index.jsx';
import { loginSuccess } from './redux/actions';





const theme = {
  background: '#f5f8fb',
  fontFamily: 'sans-serif',
  headerBgColor: '#00284e',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00284e',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

function App() {
  const user = useSelector((state) => state.user);

  const clientes = useSelector(state => state.clientes);
  const usuarios = useSelector(state => state.usuarios);
  const roles = useSelector(state => state.roles)
  const dispatch = useDispatch()

  useEffect(()=>{

  },[user])
 

  useEffect(() => {
    // Verificar si hay usuario y contraseña almacenados en el localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
   // Si se encuentran almacenados, realizar el inicio de sesión automáticamente
   if (storedUsername === "analistas" ||storedPassword === "qsnvzla" && storedPassword === "qsn123" || storedPassword === "qsnvzla2023") {
    const user = {
      username: storedUsername,
      roles: ['user'],
    };
    dispatch(loginSuccess(user));
  }
    
   
  }, [dispatch]);
  
  return (
    
    <div className="App">  
    <ThemeProvider theme={theme}>
      {/* <ChatBot steps={steps} floating placeholder="Escribe aquí tu mensaje..."   /> */}
    </ThemeProvider>

    {/* <Routes>
        <Route path="/" element={<Login />} />
        <PrivateRoute path="/informes" element={<Informes />} />
        <PrivateRoute path="/dashboard/*" element={<DashboardContainer />} />
    </Routes> */}
    
    <Routes> 

        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        {user && (
          <>
          <Route
            path="/dashboard/*"
            element={
              <>
                <DashboardContainer />
              </>
            }
          />
          <Route path="/informes" element={<Informes />} />
          </>
        )}
        <Route path="*" element={<Login />} />
      </Routes>

       {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/informes" element={<Informes />} />
        <Route
          path="/dashboard/*"
          element={
            <DashboardContainer />
          }
        />
      </Routes> */}
    </div>
  );
}

function DashboardContainer() {
 
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/grafos" element={<DashGrafos />} />
        <Route path="/grafoComunidades" element={<GrafoComunidadesSolo />} />
         <Route path="/modificarcliente" element={<ModificarCliente />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/series" element={<Series />} />
        <Route path="/Atributos" element={<DashModelo />} />
        <Route path="/Clima social" element={<DashModelo />} />
        <Route path="/Continuidad y cambio" element={<DashModelo />} />
        <Route path="/Emociones Básicas (Plutchik)" element={<DashModelo />} />
        <Route path="/Preocupaciones" element={<DashModelo />} />
        <Route path="/Red motivacional del voto" element={<DashModelo />} />
        <Route path="/Sentimientos" element={<DashModelo />} />
        
      </Routes>
     
    </>
  );
}

export default App;
