import React, { useState, useEffect } from 'react';
import { getAllSouvenirs, deleteSouvenir } from '../../../api/souvenirsApi';
import { getTouristSpotById } from '../../../api/touristSpotsApi'; // Import API để lấy thông tin địa điểm du lịch
import "./Souvenir.css";

const SouvenirList = ({ setCurrentView, setEditId, setTouristSpotId }) => {
  const [souvenirs, setSouvenirs] = useState([]);
  const [touristSpots, setTouristSpots] = useState({}); // State để lưu thông tin địa điểm du lịch

  useEffect(() => {
    const fetchSouvenirs = async () => {
      try {
        const data = await getAllSouvenirs();
        setSouvenirs(data);

        // Lấy thông tin địa điểm du lịch cho từng quà lưu niệm
        const spotPromises = data.map(souvenir => getTouristSpotById(souvenir.touristSpotId));
        const spotsData = await Promise.all(spotPromises);
        const spots = spotsData.reduce((acc, spot) => {
          acc[spot._id] = spot;
          return acc;
        }, {});
        setTouristSpots(spots);
      } catch (error) {
        console.error('Error fetching souvenirs:', error);
      }
    };

    fetchSouvenirs();
  }, []);

  const handleDelete = async (touristSpotId, souvenirId) => {
    try {
      await deleteSouvenir(touristSpotId, souvenirId);
      setSouvenirs(souvenirs.filter(souvenir => souvenir._id !== souvenirId));
    } catch (error) {
      console.error('Error deleting souvenir:', error);
    }
  };

  const handleEdit = (touristSpotId, souvenirId) => {
    setTouristSpotId(touristSpotId);
    setEditId(souvenirId);
    setCurrentView('edit-souvenir');
  };

  return (
    <div>
      <h2>Quà Lưu Niệm</h2>
      <button onClick={() => setCurrentView('add-souvenir')}>Thêm Quà Lưu Niệm</button>
      <ul className="souvenir-list">
        {souvenirs.map((souvenir) => (
          <li key={souvenir._id}>
            <div className="souvenir-content">
              <img src={souvenir.image} alt={souvenir.name} style={{ width: '100px' }} />
              <div>
                <h3>{souvenir.name}</h3>
                <p>Giá: {souvenir.price}</p>
                <p>Mô tả: {souvenir.description}</p>
                {touristSpots[souvenir.touristSpotId] && (
                  <p>Địa điểm du lịch: {touristSpots[souvenir.touristSpotId].name}</p>
                )}
              </div>
            </div>
            <div className="button-container">
              <button onClick={() => handleEdit(souvenir.touristSpotId, souvenir._id)}>Chỉnh sửa</button>
              <button className="delete-button" onClick={() => handleDelete(souvenir.touristSpotId, souvenir._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SouvenirList;
