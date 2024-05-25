import React, { useState, useEffect } from 'react';
import { getAllAccommodations, deleteAccommodation } from '../../../api/accommodationsApi';
import { getTouristSpotById } from '../../../api/touristSpotsApi'; // Import API để lấy thông tin địa điểm du lịch
import "./Accommdation.css";

const AccommodationList = ({ setCurrentView, setEditId, setTouristSpotId }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [touristSpots, setTouristSpots] = useState({}); // State để lưu thông tin địa điểm du lịch

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getAllAccommodations();
        setAccommodations(data);

        // Lấy thông tin địa điểm du lịch cho từng nơi lưu trú
        const spotPromises = data.map(accommodation => getTouristSpotById(accommodation.touristSpotId));
        const spotsData = await Promise.all(spotPromises);
        const spots = spotsData.reduce((acc, spot) => {
          acc[spot._id] = spot;
          return acc;
        }, {});
        setTouristSpots(spots);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      }
    };

    fetchAccommodations();
  }, []);

  const handleDelete = async (touristSpotId, accommodationId) => {
    try {
      await deleteAccommodation(touristSpotId, accommodationId);
      setAccommodations(accommodations.filter(acc => acc._id !== accommodationId));
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
  };

  const handleEdit = (touristSpotId, accommodationId) => {
    setTouristSpotId(touristSpotId);
    setEditId(accommodationId);
    setCurrentView('edit-accommodation');
  };

  return (
    <div>
      <h2>Nơi Lưu Trú</h2>
      <button onClick={() => setCurrentView('add-accommodation')}>Thêm Nơi Lưu Trú</button>
      <ul className="accommodation-list">
        {accommodations.map((accommodation) => (
          <li key={accommodation._id}>
            <div className="accommodation-content">
              <img src={accommodation.image} alt={accommodation.name} style={{ width: '100px' }} />
              <div>
                <h3>{accommodation.name}</h3>
                <p>Giá: {accommodation.price}</p>
                <p>Địa chỉ: {accommodation.address}</p>
                <p>Số điện thoại: {accommodation.phone_number}</p>
                <p>Mô tả: {accommodation.description}</p>
                {touristSpots[accommodation.touristSpotId] && (
                  <p>Địa điểm du lịch: {touristSpots[accommodation.touristSpotId].name}</p>
                )}
              </div>
            </div>
            <div className="button-container">
              <button onClick={() => handleEdit(accommodation.touristSpotId, accommodation._id)}>Chỉnh sửa</button>
              <button className="delete-button" onClick={() => handleDelete(accommodation.touristSpotId, accommodation._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationList;
