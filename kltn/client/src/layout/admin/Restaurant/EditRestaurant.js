import React, { useState, useEffect, useCallback } from 'react';
import { getRestaurantById, updateRestaurant } from '../../../api/restaurantApi';
import "./Restaurant.css";

const EditRestaurant = ({ setCurrentView, editId, touristSpotId }) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    price: '',
    address: '',
    phone_number: '',
    description: '',
    image: '',
    google_map: '' // Add google_map here
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchRestaurant = useCallback(async () => {
    try {
      const data = await getRestaurantById(editId);
      setRestaurant(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
    } catch (error) {
      console.error('Lỗi khi lấy thông tin nhà hàng:', error);
    }
  }, [editId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchRestaurant();
    }
  }, [fetchRestaurant, touristSpotId, editId]);

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
      await updateRestaurant(touristSpotId, editId, restaurant);
      alert('Đã cập nhật nhà hàng thành công');
      setCurrentView('list-restaurant');
    } catch (error) {
      console.error('Lỗi khi cập nhật nhà hàng:', error);
      alert('Có lỗi xảy ra khi cập nhật nhà hàng');
    }
  };

  return (
    <div className="restaurant-form">
      <h2>Chỉnh sửa Nhà Hàng</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Lưu Thay Đổi</button>
      </form>
    </div>
  );
};

export default EditRestaurant;
