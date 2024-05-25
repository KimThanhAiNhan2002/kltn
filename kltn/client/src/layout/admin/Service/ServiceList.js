import React, { useState, useEffect } from 'react';
import { getAllServices, deleteService } from '../../../api/servicesApi';
import { getTouristSpotById } from '../../../api/touristSpotsApi'; // Import API để lấy thông tin địa điểm du lịch
import "./Service.css";

const ServiceList = ({ setCurrentView, setEditId, setTouristSpotId }) => {
  const [services, setServices] = useState([]);
  const [touristSpots, setTouristSpots] = useState({}); // State để lưu thông tin địa điểm du lịch

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);

        // Lấy thông tin địa điểm du lịch cho từng dịch vụ
        const spotPromises = data.map(service => getTouristSpotById(service.touristSpotId));
        const spotsData = await Promise.all(spotPromises);
        const spots = spotsData.reduce((acc, spot) => {
          acc[spot._id] = spot;
          return acc;
        }, {});
        setTouristSpots(spots);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (touristSpotId, serviceId) => {
    try {
      await deleteService(touristSpotId, serviceId);
      setServices(services.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (touristSpotId, serviceId) => {
    setTouristSpotId(touristSpotId);
    setEditId(serviceId);
    setCurrentView('edit-service');
  };

  return (
    <div>
      <h2>Dịch Vụ</h2>
      <button onClick={() => setCurrentView('add-service')}>Thêm Dịch Vụ</button>
      <ul className="service-list">
        {services.map((service) => (
          <li key={service._id}>
            <div className="service-content">
              <img src={service.image} alt={service.name} style={{ width: '100px' }} />
              <div>
                <h3>{service.name}</h3>
                <p>Giá: {service.price}</p>
                <p>Mô tả: {service.description}</p>
                {touristSpots[service.touristSpotId] && (
                  <p>Địa điểm du lịch: {touristSpots[service.touristSpotId].name}</p>
                )}
              </div>
            </div>
            <div className="button-container">
              <button onClick={() => handleEdit(service.touristSpotId, service._id)}>Chỉnh sửa</button>
              <button className="delete-button" onClick={() => handleDelete(service.touristSpotId, service._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
