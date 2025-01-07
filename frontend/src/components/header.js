import React from "react";
import { Link } from "react-router-dom"; 
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">MiWallapop</Link>
        </div>

        {/* Navegación */}
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/ads">Anuncios</Link>
          <Link to="/favorites">Favoritos</Link>
          <Link to="/profile">Perfil</Link>
        </nav>

        {/* Botones de usuario */}
        <div className="user-actions">
          <Link to="/login" className="btn-login">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn-register">
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
