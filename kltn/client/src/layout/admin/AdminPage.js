import React, { useState, useEffect } from 'react';
import TouristSpotList from '../admin/TouristSpot/TouristSpotList';
import AddTouristSpot from '../admin/TouristSpot/AddTouristSpot';
import EditTouristSpot from '../admin/TouristSpot/EditTouristSpot';
import AccommodationList from '../admin/Accommodation/AccommodationList';
import AddAccommodation from '../admin/Accommodation/AddAccommodation';
import EditAccommodation from '../admin/Accommodation/EditAccommodation';
import RestaurantList from '../admin/Restaurant/RestaurantList';
import AddRestaurant from '../admin/Restaurant/AddRestaurant';
import EditRestaurant from '../admin/Restaurant/EditRestaurant';
import SpecialtyList from '../admin/Specialty/SpecialtyList';
import AddSpecialty from '../admin/Specialty/AddSpecialty';
import EditSpecialty from '../admin/Specialty/EditSpecialty';
import ServiceList from '../admin/Service/ServiceList';
import AddService from '../admin/Service/AddService';
import EditService from '../admin/Service/EditService';
import SouvenirList from '../admin/Souvenir/SouvenirList';
import AddSouvenir from '../admin/Souvenir/AddSouvenir';
import EditSouvenir from '../admin/Souvenir/EditSouvenir';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState('list'); // State để quản lý hiển thị các phần
  const [editId, setEditId] = useState(null); // State để lưu ID của đối tượng cần chỉnh sửa
  const [touristSpotId, setTouristSpotId] = useState(null); // State để lưu ID của TouristSpot

  useEffect(() => {
    const scripts = [
      "/assets_admin/plugins/jQuery/jquery.min.js",
      "/assets_admin/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "/assets_admin/plugins/metisMenu/metisMenu.min.js",
      "/assets_admin/plugins/perfect-scrollbar/perfect-scrollbar.min.js",
      "/assets_admin/plugins/toastr/toastr.min.js",
      "/assets_admin/plugins/datatables/jquery.dataTables.min.js",
      "/assets_admin/plugins/datatables/dataTables.bootstrap5.min.js",
      "/assets_admin/plugins/apexcharts/apexcharts.min.js",
      "/assets_admin/plugins/jquery.counterup/jquery.waypoints.min.js",
      "/assets_admin/plugins/jquery.counterup/jquery.counterup.min.js",
      "/assets_admin/dist/js/app.min.js",
      "/assets_admin/dist/js/dashboard.js"
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });

    return () => {
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'list':
        return <TouristSpotList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add':
        return <AddTouristSpot setCurrentView={setCurrentView} />;
      case 'edit':
        return <EditTouristSpot setCurrentView={setCurrentView} editId={editId} />;
      case 'list-accommodation':
        return <AccommodationList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-accommodation':
        return <AddAccommodation setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-accommodation':
        return <EditAccommodation setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-restaurant':
        return <RestaurantList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-restaurant':
        return <AddRestaurant setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-restaurant':
        return <EditRestaurant setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-specialty':
        return <SpecialtyList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-specialty':
        return <AddSpecialty setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-specialty':
        return <EditSpecialty setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-service':
        return <ServiceList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-service':
        return <AddService setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-service':
        return <EditService setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      case 'list-souvenir':
        return <SouvenirList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
      case 'add-souvenir':
        return <AddSouvenir setCurrentView={setCurrentView} touristSpotId={touristSpotId} />;
      case 'edit-souvenir':
        return <EditSouvenir setCurrentView={setCurrentView} editId={editId} touristSpotId={touristSpotId} />;
      default:
        return <TouristSpotList setCurrentView={setCurrentView} setEditId={setEditId} setTouristSpotId={setTouristSpotId} />;
    }
  };

  return (
    <div>
      <div className="page-loader page-loader-active">
        <div className="page-loader-content">
          <div className="page-loader-logo">
            <img src="/assets/dist/img/logo.png" alt="Logo" />
          </div>
          <div className="page-loader-progress">
            <div className="page-loader-bar"></div>
            <div className="page-loader-percent">0%</div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <nav className="sidebar">
          <div className="sidebar-header">
            <button style={{background:'none', border:'none'}} className="sidebar-brand" onClick={() => setCurrentView('list')}>
              <img className="sidebar-brand_icon" src="/assets/dist/img/mini-logo.png" alt="" />
              <span className="sidebar-brand_text">List<span>On</span></span>
            </button>
          </div>
          <div className="sidebar-body">
            <nav className="sidebar-nav">
              <ul className="metismenu">
                <li className="nav-label">
                  <span className="nav-label_text">Main Menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots nav-label_ellipsis m-auto" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                  </svg>
                </li>
                <li className="mm-active">
                  <button onClick={() => setCurrentView('list')} className="btn btn-link">
                  <i class="fa-solid fa-map-location-dot"></i>
                    <span className="ms-2">Địa Điểm Du Lịch</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setTouristSpotId('663b1a94256965034909de66'); // Cập nhật với ID chính xác
                    setCurrentView('list-accommodation');
                  }} className="btn btn-link">
                    <i class="fa-solid fa-bed"></i>
                    <span className="ms-2">Nơi Lưu Trú</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setTouristSpotId('663b1a94256965034909de66'); // Cập nhật với ID chính xác
                    setCurrentView('list-restaurant');
                  }} className="btn btn-link">
                    <i class="fa-solid fa-utensils"></i>
                    <span className="ms-2">Nhà Hàng</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setTouristSpotId('663b1a94256965034909de66'); // Cập nhật với ID chính xác
                    setCurrentView('list-specialty');
                  }} className="btn btn-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                      <path d="M8.6.522a1 1 0 0 0-1.2 0l-6 4.5A1 1 0 0 0 1 6.77V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.77a1 1 0 0 0-.4-.748l-6-4.5zM8 1.634L13.26 5.5H2.74L8 1.634zM2 14V6.5h12V14H2z"/>
                    </svg>
                    <span className="ms-2">Đặc Sản</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setTouristSpotId('663b1a94256965034909de66'); // Cập nhật với ID chính xác
                    setCurrentView('list-service');
                  }} className="btn btn-link">
                    <i class="fa-solid fa-headset"></i>
                    <span className="ms-2">Dịch Vụ</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setTouristSpotId('663b1a94256965034909de66'); // Cập nhật với ID chính xác
                    setCurrentView('list-souvenir');
                  }} className="btn btn-link">
                    <i class="fa-solid fa-gift"></i>
                    <span className="ms-2">Quà Lưu Niệm</span>
                  </button>
                </li>
                <li className="nav-label">
                  <span className="nav-label_text">Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-three-dots nav-label_ellipsis m-auto" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                  </svg>
                </li>
                <li>
                  <a href="../sign-up.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                      <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
                    </svg>
                    <span className="ms-2">Support</span>
                  </a>
                </li>
                <li>
                  <a href="../sign-in.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                      <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
                    <span className="ms-2">Logout</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
        <div className="content-wrapper">
        <div className="main-content">
               
                <nav className="navbar-custom-menu navbar navbar-expand-xl m-0 navbar-transfarent">
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar-collapse" aria-expanded="true" aria-label="Toggle navigation"><span></span> <span></span></button>
                      
                        <form className="search" action="#" method="get">
                            <div className="search__inner">
                                <input type="text" class="search__text" placeholder="Search (Ctrl+/)"/>
                                <svg data-sa-action="search-close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search search__helper" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                                <span className="search-shortcode">(Ctrl+/)</span>
                            </div>
                        </form>
                       
                        
                    </div>
                    <div className="navbar-icon d-flex">
                        <ul className="navbar-nav flex-row align-items-center">
                            <li className="nav-item">
                                <a className="nav-link" href="#" id="btnFullscreen">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </a>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link dark-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
                                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                                    </svg>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button class="nav-link light-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                    </svg>
                                </button>
                            </li>
                            <li className="nav-item dropdown user-menu user-menu-custom">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="profile-element d-flex align-items-center flex-shrink-0 p-0 text-start">
                                        <div className="avatar online">
                                            <img src="assets/dist/img/avatar/01.jpg" class="img-fluid rounded-circle" alt=""/>
                                        </div>
                                        <div className="profile-text">
                                            <h6 className="m-0 fw-medium fs-14">Naeem Khan</h6>
                                            <span>example@gmail.com</span>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-header d-sm-none">
                                        <a href="#" class="header-arrow"><i class="icon ion-md-arrow-back"></i></a>
                                    </div>
                                    <div className="user-header">
                                        <div className="img-user">
                                            <img src="assets/dist/img/avatar/01.jpg" alt=""/>
                                        </div>
                                        <h6>Naeem Khan</h6>
                                        <span>example@gmail.com</span>
                                    </div>
                                    <a href="profile.html" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                        </svg>
                                        My Profile</a>
                                    <a href="profile.html" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                        </svg>
                                        Edit Profile</a>
                                    <a href="#" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5" />
                                            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                                        </svg>
                                        Activity Logs</a>
                                    <a href="setting-app.html" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                        </svg>
                                        Account Settings</a>
                                    <a href="../sign-in.html" class="dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                        </svg>
                                        Sign Out</a>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars fs-18"></i>
                    </button>
                </nav>
          
            {renderView()}
        
          <footer className="footer-content">
            <div className="align-items-center d-flex footer-text gap-3 justify-content-between">
              <div className="copy">© 2022 ListOn - All Rights Reserved</div>
              <div className="credit">Developed by: <a href="/">ListOn</a> 🌺💚</div>
            </div>
          </footer>
          <div className="overlay"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminPage;
