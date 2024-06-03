import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './Map.module.css';

const Map = () => {
  const [spots, setSpots] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(106.660172);
  const [lat] = useState(10.762622);
  const [zoom] = useState(6);
  const [mouseLng, setMouseLng] = useState(null);
  const [mouseLat, setMouseLat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [message, setMessage] = useState('');
  const markers = useRef([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2ltdGhhbmhhaW5oYW4iLCJhIjoiY2x3eW9jOXZpMW9ibDJrcTdqMzA2dnBlZCJ9.zyoMd3TkGIgLZECrYfa2uQ';

    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('mousemove', (e) => {
      setMouseLng(e.lngLat.lng.toFixed(4));
      setMouseLat(e.lngLat.lat.toFixed(4));
    });

    const fetchTouristSpots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/touristSpots/tourist-spots'); // API endpoint để lấy tọa độ của các địa điểm
        setSpots(response.data);
        console.log(response.data); // In dữ liệu trả về từ server vào console để kiểm tra
      } catch (error) {
        console.error('Error fetching tourist spots:', error);
      }
    };

    fetchTouristSpots();

    // Cleanup map when component unmounts
    return () => {
      if (map.current) map.current.remove();
    };
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current || spots.length === 0) return; // Wait until the map is initialized and spots are loaded

    console.log('Adding markers');
    // Remove old markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    spots.forEach(spot => {
      const { google_map, image, accommodations, restaurants } = spot;

      // Chuyển đổi tọa độ từ chuỗi google_map thành mảng [longitude, latitude]
      let spotCoordinates;
      try {
        spotCoordinates = JSON.parse(google_map);
      } catch (error) {
        console.error(`Error parsing coordinates for spot: ${spot.name}`, error);
      }

      // Kiểm tra nếu longitude và latitude tồn tại và là số hợp lệ
      if (spotCoordinates && spotCoordinates.length === 2 && !isNaN(spotCoordinates[0]) && !isNaN(spotCoordinates[1])) {
        const marker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat(spotCoordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<div style="text-align:center;"><img src="${image}" alt="${spot.name}" style="width:50px;height:50px;"/><p>${spot.name}</p></div>`)) // Thêm popup với ảnh
          .addTo(map.current);
        markers.current.push(marker);
      } else {
        console.warn(`Invalid coordinates for spot: ${spot.name}`, spot);
      }

      // Thêm markers cho accommodations
      accommodations.forEach(accommodation => {
        let accommodationCoordinates;
        try {
          accommodationCoordinates = JSON.parse(accommodation.google_map);
        } catch (error) {
          console.error(`Error parsing coordinates for accommodation: ${accommodation.name}`, error);
        }

        if (accommodationCoordinates && accommodationCoordinates.length === 2 && !isNaN(accommodationCoordinates[0]) && !isNaN(accommodationCoordinates[1])) {
          const marker = new mapboxgl.Marker({ color: 'blue' })
            .setLngLat(accommodationCoordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<div style="text-align:center;"><img src="${accommodation.image}" alt="${accommodation.name}" style="width:50px;height:50px;"/><p>${accommodation.name}</p></div>`)) // Thêm popup với ảnh
            .addTo(map.current);
          markers.current.push(marker);
        } else {
          console.warn(`Invalid coordinates for accommodation: ${accommodation.name}`, accommodation);
        }
      });

      // Thêm markers cho restaurants
      restaurants.forEach(restaurant => {
        let restaurantCoordinates;
        try {
          restaurantCoordinates = JSON.parse(restaurant.google_map);
        } catch (error) {
          console.error(`Error parsing coordinates for restaurant: ${restaurant.name}`, error);
        }

        if (restaurantCoordinates && restaurantCoordinates.length === 2 && !isNaN(restaurantCoordinates[0]) && !isNaN(restaurantCoordinates[1])) {
          const marker = new mapboxgl.Marker({ color: 'green' })
            .setLngLat(restaurantCoordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<div style="text-align:center;"><img src="${restaurant.image}" alt="${restaurant.name}" style="width:50px;height:50px;"/><p>${restaurant.name}</p></div>`)) // Thêm popup với ảnh
            .addTo(map.current);
          markers.current.push(marker);
        } else {
          console.warn(`Invalid coordinates for restaurant: ${restaurant.name}`, restaurant);
        }
      });
    });
  }, [spots]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setMessage('Hãy nhập địa điểm hoặc tọa độ bạn muốn tìm kiếm');
      return;
    }

    setMessage('');
    try {
      let data = [];
      if (searchBy === 'name') {
        const response = await axios.get(`http://localhost:5000/api/touristSpots/search?query=${searchTerm}`);
        data = response.data;
      } else if (searchBy === 'coordinates') {
        const [lng, lat] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
        if (isNaN(lng) || isNaN(lat)) {
          setMessage('Tọa độ không hợp lệ. Vui lòng nhập lại.');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/touristSpots/searchByCoordinates?lng=${lng}&lat=${lat}`);
        data = response.data;
        if (data.length > 0) {
          map.current.flyTo({ center: [lng, lat], zoom: 14 });
        }
      }

      if (data.length === 0) {
        setMessage('Địa điểm bạn tìm kiếm đang được cập nhật');
      } else {
        setMessage('');
        setSpots(data);
      }
    } catch (error) {
      console.error('Error searching tourist spots:', error);
      setMessage('Đã xảy ra lỗi khi tìm kiếm, vui lòng thử lại sau');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.searchBar}>
        <form onSubmit={handleSearch} className="border-0 card d-flex flex-md-row position-relative search-wrapper">
          <div className="align-items-center d-flex search-field w-100">
            <div className="svg-icon">
              <AiOutlineSearch size={24} />
            </div>
            <input
              style={{ width: '250px' }} className="form-control search-input"
              placeholder={`Tìm kiếm địa điểm theo ${searchBy === 'name' ? 'tên' : 'tọa độ'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="vertical-divider"></div>
          <div className="align-items-center d-flex search-field w-100">
            <div className="svg-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </div>
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              style={{ width: '250px' }} className="form-select search-select-field"
            >
              <option value="name">Tìm kiếm theo tên địa điểm</option>
              <option value="coordinates">Tìm kiếm theo tọa độ</option>
            </select>
          </div>
          <input
            type="submit"
            value="Tìm kiếm"
            className="btn btn-primary rounded-5 mt-3 mt-md-0"
          />
        </form>
      </div>
      {message && <p className={styles.message}>{message}</p>}
      <div ref={mapContainer} id="mapcanvas" style={{ height: '500px' }}></div>
      {mouseLng && mouseLat && (
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}>
          <strong>Longitude:</strong> {mouseLng}, <strong>Latitude:</strong> {mouseLat}
        </div>
      )}
    </div>
  );
};

export default Map;
