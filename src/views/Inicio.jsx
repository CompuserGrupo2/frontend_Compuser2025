import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import logocompuser from "/Logo_Compuser.png";
import Proposito from "../components/inicio/Proposito";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);



  return (
    <Container className="center-text">
      <h1>¡Bienvenido, {nombreUsuario}!</h1>
      <img alt="" src={logocompuser} width="700" height="200" className="center"/>{" "}
      <Proposito />
    </Container>
  );
};

export default Inicio;