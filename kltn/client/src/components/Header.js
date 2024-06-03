// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav  class="navbar navbar-expand-lg navbar-light sticky-top">
  <div class="container">
    <a class="navbar-brand m-0" href="/">
      <img class="logo-white" src="assets/images/logo-white.png" alt=""/>
      <img class="logo-dark" src="assets/images/logo.png" alt=""/>
    </a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/home-map">Map</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Listing
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">List View</a></li>
            <li><a class="dropdown-item" href="#">Grid View 1</a></li>
            <li><a class="dropdown-item" href="#">Grid View 2</a></li>
            <li><a class="dropdown-item" href="#">Half Map + Sidebar</a></li>
            <li><a class="dropdown-item" href="#">Listing Details</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="listings-map-grid-1.html">Explore</a>
        </li>
      </ul>
      
      <div class="d-sm-none">
        <a href="signin.html" class="btn btn-primary d-flex gap-2 hstack justify-content-center rounded-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          <div class="vr d-none d-sm-inline-block"></div>
          <span>Add Listing</span>
        </a>
      </div>
    </div>
  </div>
</nav>

        );
};

        export default Header;
