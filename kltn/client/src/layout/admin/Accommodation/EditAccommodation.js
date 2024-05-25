import React, { useState, useEffect, useCallback } from 'react';
import { getAccommodationById, updateAccommodation } from '../../../api/accommodationsApi';
import "./Accommdation.css";

const EditAccommodation = ({ setCurrentView, editId, touristSpotId }) => {
  const [accommodation, setAccommodation] = useState({
    name: '',
    price: '',
    address: '',
    phone_number: '',
    description: '',
    image: '',
    google_map: '' // Add google_map here
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchAccommodation = useCallback(async () => {
    try {
      const data = await getAccommodationById(editId);
      setAccommodation(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
    } catch (error) {
      console.error('Lỗi khi lấy thông tin nơi lưu trú:', error);
    }
  }, [editId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchAccommodation();
    }
  }, [fetchAccommodation, touristSpotId, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodation({ ...accommodation, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setAccommodation({
          ...accommodation,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setAccommodation({
        ...accommodation,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccommodation(touristSpotId, editId, accommodation);
      alert('Đã cập nhật nơi lưu trú thành công');
      setCurrentView('list-accommodation');
    } catch (error) {
      console.error('Lỗi khi cập nhật nơi lưu trú:', error);
      alert('Có lỗi xảy ra khi cập nhật nơi lưu trú');
    }
  };

  return (
    <div className="accommodation-form">
      <h2>Chỉnh sửa Nơi Lưu Trú</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={accommodation.name}
          onChange={handleChange}
          placeholder="Tên"
          required
        />
        <input
          type="text"
          name="price"
          value={accommodation.price}
          onChange={handleChange}
          placeholder="Giá"
          required
        />
        <input
          type="text"
          name="address"
          value={accommodation.address}
          onChange={handleChange}
          placeholder="Địa chỉ"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={accommodation.phone_number}
          onChange={handleChange}
          placeholder="Số điện thoại"
          required
        />
        <textarea
          name="description"
          value={accommodation.description}
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
          value={accommodation.google_map}
          onChange={handleChange}
          placeholder="Google Map"
          required
        />
        <button type="submit">Lưu Thay Đổi</button>
      </form>
    </div>
  );
};

export default EditAccommodation;
