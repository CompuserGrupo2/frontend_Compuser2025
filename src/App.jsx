import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Usuarios from "./views/Usuarios";
import Inicio from "./views/Inicio";
import Servicios from "./views/Servicios";
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Empleados from "./views/Empleados";
import Diagnosticos from "./views/Diagnosticos";
import Equipos from "./views/Equipos";
import Entregas from "./views/Entregas";
import Recepciones from "./views/Recepciones";
import CatalogoServicios from "./views/CatalogoServicios";
import Estadisticas from "./views/Estadisticas";
import Dashboard from "./views/Dashboard";
import RutaProtegida from "./components/rutas/RutaProtegida";
import PiePagina from "./components/infopie/PiePagina";
import ControlCalificaciones from "./views/ControlCalificaciones";

import './App.css';

const App = () => {
  return (
    <Router>

      <div className="app-wrapper">

        <Encabezado />
        <main className="margen-superior-main content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuario" element={<RutaProtegida vista={<Usuarios />} />} />
          <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />
          <Route path="/servicios" element={<RutaProtegida vista={<Servicios />} />} />
          <Route path="/clientes" element={<RutaProtegida vista={<Clientes />} />} />
          <Route path="/empleados" element={<RutaProtegida vista={<Empleados />} />} />
          <Route path="/diagnosticos" element={<RutaProtegida vista={<Diagnosticos />} />} />
          <Route path="/equipos" element={<RutaProtegida vista={<Equipos />} />} />
          <Route path="/entregas" element={<RutaProtegida vista={<Entregas />} />} />
          <Route path="/recepciones" element={<RutaProtegida vista={<Recepciones />} />} />
          <Route path="/catalogo" element={<RutaProtegida vista={<CatalogoServicios />} />} />
          <Route path="/dashboard" element={<RutaProtegida vista={<Dashboard />} />} />
          <Route path="/estadisticas" element={<RutaProtegida vista={<Estadisticas />} />} />
          <Route path="/calificaciones" element={<RutaProtegida vista={<ControlCalificaciones />} />} />
        </Routes>
        </main>
        <PiePagina />
      </div>
    </Router>
  );
};

export default App;