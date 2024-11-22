import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="#">kPOS</a>
      <button className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNavDropdown" 
              aria-controls="navbarNavDropdown" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`} to="/productos">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/ventas' ? 'active' : ''}`} to="/ventas">Ventas</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/compras' ? 'active' : ''}`} to="/compras">Compras</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Configuración
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;