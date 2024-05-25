import React, { useState, useEffect } from 'react';
import { getAllSpecialties, deleteSpecialty } from '../../../api/specialtiesApi';
import { getTouristSpotById } from '../../../api/touristSpotsApi'; // Import API để lấy thông tin địa điểm du lịch
import "./Specialty.css";

const SpecialtyList = ({ setCurrentView, setEditId, setTouristSpotId }) => {
  const [specialties, setSpecialties] = useState([]);
  const [touristSpots, setTouristSpots] = useState({}); // State để lưu thông tin địa điểm du lịch

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getAllSpecialties();
        setSpecialties(data);

        // Lấy thông tin địa điểm du lịch cho từng đặc sản
        const spotPromises = data.map(specialty => getTouristSpotById(specialty.touristSpotId));
        const spotsData = await Promise.all(spotPromises);
        const spots = spotsData.reduce((acc, spot) => {
          acc[spot._id] = spot;
          return acc;
        }, {});
        setTouristSpots(spots);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleDelete = async (touristSpotId, specialtyId) => {
    try {
      await deleteSpecialty(touristSpotId, specialtyId);
      setSpecialties(specialties.filter(spe => spe._id !== specialtyId));
    } catch (error) {
      console.error('Error deleting specialty:', error);
    }
  };

  const handleEdit = (touristSpotId, specialtyId) => {
    setTouristSpotId(touristSpotId);
    setEditId(specialtyId);
    setCurrentView('edit-specialty');
  };

  return (
    <div>
      <h2>Đặc Sản</h2>
      <button onClick={() => setCurrentView('add-specialty')}>Thêm Đặc Sản</button>
      <ul className="specialty-list">
        {specialties.map((specialty) => (
          <li key={specialty._id}>
            <div className="specialty-content">
              <img src={specialty.image} alt={specialty.name} style={{ width: '100px' }} />
              <div>
                <h3>{specialty.name}</h3>
                <p>Giá: {specialty.price}</p>
                <p>Mô tả: {specialty.description}</p>
                <p>Xuất xứ: {specialty.origin}</p>
                <p>Hạn sử dụng: {specialty.expired}</p>
                {touristSpots[specialty.touristSpotId] && (
                  <p>Địa điểm du lịch: {touristSpots[specialty.touristSpotId].name}</p>
                )}
              </div>
            </div>
            <div className="button-container">
              <button onClick={() => handleEdit(specialty.touristSpotId, specialty._id)}>Chỉnh sửa</button>
              <button className="delete-button" onClick={() => handleDelete(specialty.touristSpotId, specialty._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialtyList;
