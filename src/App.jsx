import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Servicios from "./views/Servicios";
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Empleados from "./views/Empleados";
import Diagnosticos from "./views/Diagnosticos";
import Equipos from "./views/Equipos";
import Entregas from "./views/Entregas";
import Recepciones from "./views/Recepciones";

import './App.css';

const App = () => {
  return (
    <Router>
      <main className="margen-superior-main">
      <Encabezado />
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/diagnosticos" element={<Diagnosticos />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/entregas" element={<Entregas />} />
        <Route path="/recepciones" element={<Recepciones />} />
      </Routes>
      </main>
    </Router>
  );
};

export default App;