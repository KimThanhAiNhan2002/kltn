import React, { useState, useEffect } from 'react';
import { addAccommodation } from '../../../api/accommodationsApi';
import { getTouristSpots } from '../../../api/touristSpotsApi';
import "./Accommdation.css";

const AddAccommodation = ({ setCurrentView, touristSpotId }) => {
  const [accommodation, setAccommodation] = useState({
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
      await addAccommodation(accommodation.touristSpotId, accommodation);
      setCurrentView('list-accommodation');
      alert('Đã thêm nơi lưu trú thành công');
    } catch (error) {
      console.error('Lỗi khi thêm nơi lưu trú:', error);
      alert('Có lỗi xảy ra khi thêm nơi lưu trú');
    }
  };

  return (
    <div className="accommodation-form">
      <h2>Thêm Nơi Lưu Trú</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="touristSpotId"
          value={accommodation.touristSpotId}
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddAccommodation;
