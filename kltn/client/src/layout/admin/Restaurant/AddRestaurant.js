import React, { useState, useEffect } from 'react';
import { addRestaurant } from '../../../api/restaurantApi';
import { getTouristSpots } from '../../../api/touristSpotsApi';
import "./Restaurant.css";

const AddRestaurant = ({ setCurrentView, touristSpotId }) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    price: '',
    address: '',
    phone_number: '',
    description: '',
    image: '',
    google_map: '', // Add google_map here
    touristSpotId: touristSpotId || ''
  });
  const [touristSpots, setTouristSpots] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchTouristSpots = async () => {
      try {
        const data = await getTouristSpots();
        setTouristSpots(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách địa điểm du lịch:', error);
      }
    };

    fetchTouristSpots();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setRestaurant({
          ...restaurant,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setRestaurant({
        ...restaurant,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRestaurant(restaurant.touristSpotId, restaurant);
      setCurrentView('list-restaurant');
      alert('Đã thêm nhà hàng thành công');
    } catch (error) {
      console.error('Lỗi khi thêm nhà hàng:', error);
      alert('Có lỗi xảy ra khi thêm nhà hàng');
    }
  };

  return (
    <div className="restaurant-form">
      <h2>Thêm Nhà Hàng</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="touristSpotId"
          value={restaurant.touristSpotId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Chọn Địa Điểm Du Lịch</option>
          {touristSpots.map((spot) => (
            <option key={spot._id} value={spot._id}>{spot.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          value={restaurant.name}
          onChange={handleChange}
          placeholder="Tên"
          required
        />
        <input
          type="text"
          name="price"
          value={restaurant.price}
          onChange={handleChange}
          placeholder="Giá"
          required
        />
        <input
          type="text"
          name="address"
          value={restaurant.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={restaurant.phone_number}
          onChange={handleChange}
          placeholder="Số điện thoại"
          required
        />
        <textarea
          name="description"
          value={restaurant.description}
          onChange={handleChange}
          placeholder="Mô tả"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {imagePreview && <img src={imagePreview} alt="Xem trước hình ảnh" />}
        <input
          type="text"
          name="google_map"
          value={restaurant.google_map}
          onChange={handleChange}
          placeholder="Google Map"
          required
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
