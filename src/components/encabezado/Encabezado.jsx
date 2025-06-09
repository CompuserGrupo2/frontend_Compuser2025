import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import logocompuser from "/Mouse_Compuser.png";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importación de íconos de Bootstrap
import "../../App.css"; // Estilos personalizados de la aplicación

const Encabezado = () => {
  // Estado para controlar el colapso del menú lateral
  const [estaColapsado, setEstaColapsado] = useState(false);
  
  // Hook para manejar la navegación entre rutas
  const navegar = useNavigate();
  
  // Hook para obtener la ubicación actual de la ruta
  const ubicacion = useLocation();

  // Validación del estado de autenticación con localStorage
  const estaLogueado = !!localStorage.getItem("usuario") && !!localStorage.getItem("contraseña");

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setEstaColapsado(false); // Cierra el menú lateral
    localStorage.removeItem("usuario"); // Elimina el usuario de localStorage
    localStorage.removeItem("contraseña"); // Elimina la contraseña de localStorage
    navegar("/"); // Redirige a la página principal
  };

  // Función para alternar el estado del menú lateral
  const alternarColapso = () => setEstaColapsado(!estaColapsado);

  // Función genérica de navegación
  const navegarA = (ruta) => {
    navegar(ruta); // Navega a la ruta especificada
    setEstaColapsado(false); // Cierra el menú lateral
  };

  return (
    // Barra de navegación fija en la parte superior
    <Navbar expand="sm" fixed="top" className="color-navbar">
      <Container>
        {/* Logo y nombre de la ferretería */}
        <Navbar.Brand
          onClick={() => navegarA("/inicio")}
          className="text-white"
          style={{ cursor: "pointer" }}
        >
          <strong>Compuser</strong>
          <img alt="" src={logocompuser} width="40" height="35" className="d-inline-block align-top" />{" "}
        </Navbar.Brand>

        {/* Botón para alternar el menú lateral en pantallas pequeñas */}
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-sm"
          onClick={alternarColapso}
        />

        {/* Menú lateral (Offcanvas) */}
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
          show={estaColapsado}
          onHide={() => setEstaColapsado(false)}
        >
          {/* Encabezado del menú lateral */}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-sm"
              className={estaColapsado ? "color-texto-marca" : "text-white"}
            >
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>

          {/* Cuerpo del menú lateral */}
          <Offcanvas.Body>
            {/* Navegación */}
            <Nav className="justify-content-end flex-grow-1 pe-3">

              {estaLogueado ? (
                <>

                  {/* Opción de navegación a Inicio */}

                  <Nav.Link
                    onClick={() => navegarA("/inicio")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                    <strong>Inicio</strong>
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => navegarA("/usuario")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                    <strong>Usuarios</strong>
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => navegarA("/clientes")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                    <strong>Clientes</strong>
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => navegarA("/equipos")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                    <strong>Equipos Computarizados</strong>
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => navegarA("/empleados")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    {estaColapsado ? <i className="bi-house-door-fill me-2"></i> : null}
                    <strong>Empleados</strong>
                  </Nav.Link>

                  <NavDropdown 
                    title={
                      <span>
                        {estaColapsado && <i className="bi-bag-heart-fill me-2"></i>}
                        Servicios
                      </span>
                    }
                    id="basic-nav-dropdown"  
                    className={estaColapsado ? "titulo-negro" : "titulo-blanco"}
                  >
                    <NavDropdown.Item
                      onClick={() => navegarA("/servicios")}
                      className="text-black"
                    >
                      {estaColapsado ? <i className="bi-box2-heart-fill me-2"></i> : null}
                      <strong>Gestión de servicios</strong>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className="text-black"
                      onClick={() => navegarA("/catalogo")}
                    >
                      {estaColapsado ? <i className="bi-bookmarks-fill me-2"></i> : null}
                      <strong>Catalogo de servicios</strong>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className="text-black"
                      onClick={() => navegarA("/calificaciones")}
                    >
                      {estaColapsado ? <i className="bi-bookmarks-fill me-2"></i> : null}
                      <strong>Control de calificaciones</strong>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown 
                    title={
                      <span>
                        {estaColapsado && <i className="bi-bag-heart-fill me-2"></i>}
                        Operaciones
                      </span>
                    }
                    id="basic-nav-dropdown"  
                    className={estaColapsado ? "titulo-negro" : "titulo-blanco"}
                  >
                    <NavDropdown.Item
                      onClick={() => navegarA("/diagnosticos")}
                      className="text-black"
                    >
                      {estaColapsado ? <i className="bi-box2-heart-fill me-2"></i> : null}
                      <strong>Gestión de Diagnósticos</strong>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className="text-black"
                      onClick={() => navegarA("/recepciones")}
                    >
                      {estaColapsado ? <i className="bi-bookmarks-fill me-2"></i> : null}
                      <strong>Control de recepciones</strong>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className="text-black"
                      onClick={() => navegarA("/entregas")}
                    >
                      {estaColapsado ? <i className="bi-bookmarks-fill me-2"></i> : null}
                      <strong>Control de entregas</strong>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown 
                    title={
                      <span>
                        {estaColapsado && <i className="bi-bag-heart-fill me-2"></i>}
                        Gráficos
                      </span>
                    }
                    id="basic-nav-dropdown"  
                    className={estaColapsado ? "titulo-negro" : "titulo-blanco"}
                  >
                    <NavDropdown.Item
                      onClick={() => navegarA("/estadisticas")}
                      className="text-black"
                    >
                      {estaColapsado ? <i className="bi-box2-heart-fill me-2"></i> : null}
                      <strong>Estadísticas</strong>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      className="text-black"
                      onClick={() => navegarA("/dashboard")}
                    >
                      {estaColapsado ? <i className="bi-bookmarks-fill me-2"></i> : null}
                      <strong>Dashboard</strong>
                    </NavDropdown.Item>

                  </NavDropdown>

                </>
              ) : (
                //Opción visible solo si el usuario no esta logueado
                <Nav.Link
                  onClick={() => navegarA("/")}
                  className={estaColapsado ? "text-black" : "text-white"}
                >
                  <i className="bi-box-arrow-in-right me-2"></i>
                  <strong>Iniciar Sesión</strong>
                </Nav.Link>
              )}

              {/* Lógica condicional para mostrar Cerrar Sesión o Iniciar Sesión */}
              {estaLogueado ? (
                // Opción de cerrar sesión
                <Nav.Link
                  onClick={cerrarSesion}
                  className={estaColapsado ? "text-black" : "text-white"}
                >
                  Cerrar Sesión
                </Nav.Link>
              ) : (
                ubicacion.pathname === "/" && (
                  // Opción de iniciar sesión (solo en la ruta raíz)
                  <Nav.Link
                    onClick={() => navegarA("/")}
                    className={estaColapsado ? "text-black" : "text-white"}
                  >
                    <br />
                  </Nav.Link>
                )
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;