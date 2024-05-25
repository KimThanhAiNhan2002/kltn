// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <Link className="navbar-brand m-0" to="/">
          <img className="logo-white" src="/assets/images/logo-white.png" alt="" />
          <img className="logo-dark" src="/assets/images/logo.png" alt="" />
        </Link>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle active" to="/" aria-current="page" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                Home
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/">Home (Main)</Link></li>
                <li><Link className="dropdown-item" to="/home-classic">Home (Classic)</Link></li>
                <li><Link className="dropdown-item active" to="/home-rounded">Home (Rounded)</Link></li>
                <li><Link className="dropdown-item" to="/home-map">Home (Map)</Link></li>
                <li><Link className="dropdown-item" to="/home-grid">Home (Grid)</Link></li>
                <li><Link className="dropdown-item" to="/home-waves">Home (Waves)</Link></li>
                <li><Link className="dropdown-item" to="/home-car">Home (Car)&nbsp;<span className="badge text-bg-primary fw-semibold">New</span></Link></li>
                <li><Link className="dropdown-item" to="/home-restaurant">Home (Restaurant)&nbsp;<span className="badge text-bg-primary fw-semibold">New</span></Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
