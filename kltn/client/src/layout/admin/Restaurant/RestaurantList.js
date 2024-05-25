import React, { useState, useEffect } from 'react';
import { getAllRestaurants, deleteRestaurant } from '../../../api/restaurantApi';
import { getTouristSpotById } from '../../../api/touristSpotsApi'; // Import API để lấy thông tin địa điểm du lịch
import "./Restaurant.css";

const RestaurantList = ({ setCurrentView, setEditId, setTouristSpotId }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [touristSpots, setTouristSpots] = useState({}); // State để lưu thông tin địa điểm du lịch

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);

        // Lấy thông tin địa điểm du lịch cho từng nhà hàng
        const spotPromises = data.map(restaurant => getTouristSpotById(restaurant.touristSpotId));
        const spotsData = await Promise.all(spotPromises);
        const spots = spotsData.reduce((acc, spot) => {
          acc[spot._id] = spot;
          return acc;
        }, {});
        setTouristSpots(spots);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (touristSpotId, restaurantId) => {
    try {
      await deleteRestaurant(touristSpotId, restaurantId);
      setRestaurants(restaurants.filter(res => res._id !== restaurantId));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleEdit = (touristSpotId, restaurantId) => {
    setTouristSpotId(touristSpotId);
    setEditId(restaurantId);
    setCurrentView('edit-restaurant');
  };

  return (
    <div>
      <h2>Nhà Hàng</h2>
      <button onClick={() => setCurrentView('add-restaurant')}>Thêm Nhà Hàng</button>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <div className="restaurant-content">
              <img src={restaurant.image} alt={restaurant.name} style={{ width: '100px' }} />
              <div>
                <h3>{restaurant.name}</h3>
                <p>Giá: {restaurant.price}</p>
                <p>Địa chỉ: {restaurant.address}</p>
                <p>Số điện thoại: {restaurant.phone_number}</p>
                <p>Mô tả: {restaurant.description}</p>
                {touristSpots[restaurant.touristSpotId] && (
                  <p>Địa điểm du lịch: {touristSpots[restaurant.touristSpotId].name}</p>
                )}
              </div>
            </div>
            <div className="button-container">
              <button onClick={() => handleEdit(restaurant.touristSpotId, restaurant._id)}>Chỉnh sửa</button>
              <button className="delete-button" onClick={() => handleDelete(restaurant.touristSpotId, restaurant._id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
