// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
      <div class="container">
        <a class="navbar-brand m-0" href="index.html">
          <img class="logo-white" src="assets/images/logo-white.png" alt=""/>
            <img class="logo-dark" src="assets/images/logo.png" alt=""/>
            </a>
            <div class="d-flex order-lg-2">

              <a href="signin.html" class="d-flex align-items-center justify-content-center p-0 btn-user position-relative" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="Favourite">
                <i class="fa-solid fa-heart"></i>
                <span class="align-items-center bg-primary d-flex end-0 fs-11 justify-content-center nav-count position-absolute rounded-circle text-white">0</span>
              </a>

              <a href="sign-in.html" class="d-flex align-items-center justify-content-center p-0 btn-user" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="Sign In">
                <i class="fa-solid fa-user-plus"></i>
              </a>

              <button type="button" id="themeToggleBtn" class="align-items-center bg-transparent border-0 btn-user d-flex justify-content-center p-0">
                <i class="fa-solid fa-moon"></i>
              </button>

              <a href="add-listing.html" class="btn btn-primary d-none d-sm-flex fw-medium gap-2 hstack rounded-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <div class="vr d-none d-sm-inline-block"></div>
                <span class="d-none d-sm-inline-block">Add Listing</span>
              </a>

              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span id="nav-icon" class="">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" aria-current="page" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    Home
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="index.html">Home (Main)</a></li>
                    <li><a class="dropdown-item" href="home-classic.html">Home (Classic)</a></li>
                    <li><a class="dropdown-item" href="home-rounded.html">Home (Rounded)</a></li>
                    <li><a class="dropdown-item" href="home-map.html">Home (Map)</a></li>
                    <li><a class="dropdown-item" href="home-grid.html">Home (Grid)</a></li>
                    <li><a class="dropdown-item" href="home-waves.html">Home (Waves)</a></li>
                    <li><a class="dropdown-item" href="home-car.html">Home (Car)&nbsp;<span class="badge text-bg-primary fw-semibold">New</span></a></li>
                    <li><a class="dropdown-item" href="home-restaurant.html">Home (Restaurant)&nbsp;<span class="badge text-bg-primary fw-semibold">New</span></a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle material-ripple" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="typcn typcn-weather-stormy top-menu-icon"></i>Dashboard
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="dashboard/dashboard.html">Dashboard</a></li>
                    <li><a class="dropdown-item" href="dashboard/bookings.html">Bookings</a></li>
                    <li><a class="dropdown-item" href="dashboard/messages.html">Message</a></li>
                    <li><a class="dropdown-item" href="dashboard/wallet.html">Wallet</a></li>
                    <li><a class="dropdown-item" href="dashboard/profile.html">Edit Profile</a></li>
                    <li><a class="dropdown-item" href="dashboard/add-listing.html">Add listing</a></li>
                    <li><a class="dropdown-item" href="dashboard/my-listing.html">My listing</a></li>
                    <li><a class="dropdown-item" href="dashboard/bookings.html">Bookings</a></li>
                    <li><a class="dropdown-item" href="dashboard/reviews.html">Reviews</a></li>
                    <li><a class="dropdown-item" href="dashboard/bookmark.html">Bookmark</a></li>
                    <li><a class="dropdown-item" href="dashboard/setting-app.html">Settings</a></li>
                    <li><a class="dropdown-item" href="dashboard/invoice.html">Invoice</a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    Listing
                  </a>
                  <ul class="dropdown-menu">
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">List View</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="listings-list-left.html">Left Sidebar</a></li>
                        <li><a class="dropdown-item" href="listings-list-right.html">Right Sidebar</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Grid View 1</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="listings-grid-1-left.html">Left Sidebar</a></li>
                        <li><a class="dropdown-item" href="listings-grid-1-right.html">Right Sidebar</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Grid View 2</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="listings-grid-2-left.html">Left Sidebar</a></li>
                        <li><a class="dropdown-item" href="listings-grid-2-right.html">Right Sidebar</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Half Map + Sidebar</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="listings-map.html">Half Map List</a></li>
                        <li><a class="dropdown-item" href="listings-map-car.html">Half Map List (Car)&nbsp;<span class="badge text-bg-primary fw-semibold">New</span></a></li>
                        <li><a class="dropdown-item" href="listings-map-grid-1.html">Half Map Grid 1</a></li>
                        <li><a class="dropdown-item" href="listings-map-grid-2.html">Half Map Grid 2</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Listing Details</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="listing-details.html">Listing Details 1</a></li>
                        <li><a class="dropdown-item" href="listing-details-2.html">Listing Details 2</a></li>
                        <li><a class="dropdown-item" href="listing-details-car.html">Listing Details Car <span class="badge text-bg-primary fw-semibold">New</span></a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="listings-map-grid-1.html">Explore</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    Template
                  </a>
                  <ul class="dropdown-menu">
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">About</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="about.html">About us 1</a></li>
                        <li><a class="dropdown-item" href="about-2.html">About us 2</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Agent</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="agent.html">Agent</a></li>
                        <li><a class="dropdown-item active" href="agent-details.html">Agent Details</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="blog.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="blog.html">Blog</a></li>
                        <li><a class="dropdown-item" href="blog-details.html">Blog Standard</a></li>
                        <li><a class="dropdown-item" href="blog-post-galary.html">Blog Galary</a></li>
                        <li><a class="dropdown-item" href="blog-post-video.html">Blog Video</a></li>
                        <li><a class="dropdown-item" href="blog-post-audio.html">Blog Audio</a></li>
                        <li><a class="dropdown-item" href="blog-archive.html">Blog Archive</a></li>
                      </ul>
                    </li>
                    <li><a class="dropdown-item" href="add-listing.html">Add Listing</a></li>
                    <li><a class="dropdown-item" href="submit-rider.html">Submit Rider</a></li>
                    <li><a class="dropdown-item" href="contact.html">Contact</a></li>
                    <li><a class="dropdown-item" href="pricing.html">Pricing</a></li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Authentication</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="sign-in.html">Sign In</a></li>
                        <li><a class="dropdown-item" href="sign-up.html">Sign Up</a></li>
                        <li><a class="dropdown-item" href="forgot-password.html">Forgot Password</a></li>
                        <li><a class="dropdown-item" href="two-factor-auth.html">Two factor authentication</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Specialty</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="404.html">404 Page</a></li>
                      </ul>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="dropdown-item dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Help Center</a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="faq.html">Faq Page</a></li>
                        <li><a class="dropdown-item" href="terms-conditions.html">Terms & Conditions</a></li>
                      </ul>
                    </li>
                    <li><a class="dropdown-item" href="style-guide.html">Style Guide</a></li>
                  </ul>
                </li>
              </ul>
              <div class="d-sm-none">

                <a href="signin.html" class="btn btn-primary d-flex gap-2 hstack justify-content-center rounded-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
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
