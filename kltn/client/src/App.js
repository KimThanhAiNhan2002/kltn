import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Foodter';
import Home from './layout/user/Home/Home';
import Map from './layout/user/Map/Map';
import AdminPage from './layout/admin/AdminPage';
import AddTouristSpot from './layout/admin/TouristSpot/AddTouristSpot';
import EditTouristSpot from './layout/admin/TouristSpot/EditTouristSpot';
import TouristSpotList from './layout/admin/TouristSpot/TouristSpotList';
import AccommodationList from './layout/admin/Accommodation/AccommodationList';
import AddAccommodation from './layout/admin/Accommodation/AddAccommodation';
import EditAccommodation from './layout/admin/Accommodation/EditAccommodation';
import TouristSpotDetail from './layout/user/TouristSpotDetail/TouristSpotDetail'; // Import the new component

const App = () => {
  const isNotAdminPage = window.location.pathname !== '/admin' && !window.location.pathname.startsWith('/admin/');

  return (
    <Router>
      {isNotAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-map" element={<Map />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/admin/add-tourist-spot" element={<AddTouristSpot />} />
        <Route path="/admin/edit-tourist-spot/:id" element={<EditTouristSpot />} />
        <Route path="/admin/tourist-spot-list" element={<TouristSpotList />} />
        <Route path="/admin/add-accommodation" element={<AddAccommodation />} />
        <Route path="/admin/edit-accommodation/:touristSpotId/:id" element={<EditAccommodation />} />
        <Route path="/admin/accommodation-list/:touristSpotId" element={<AccommodationList />} />
        <Route path="/touristSpots/:id" element={<TouristSpotDetail />} /> {/* New route */}
      </Routes>
      {isNotAdminPage && <Footer />}
    </Router>
  );
};

export default App;
