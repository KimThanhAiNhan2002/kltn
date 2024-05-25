import React, { useState, useEffect } from 'react';
import { addSpecialty } from '../../../api/specialtiesApi';
import { getTouristSpots } from '../../../api/touristSpotsApi';
import "./Specialty.css";

const AddSpecialty = ({ setCurrentView, touristSpotId }) => {
  const [specialty, setSpecialty] = useState({
    name: '',
    price: '',
    description: '',
    origin: '',
    expired: '',
    image: '',
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
    setSpecialty({ ...specialty, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSpecialty({
          ...specialty,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setSpecialty({
        ...specialty,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSpecialty(specialty.touristSpotId, specialty);
      setCurrentView('list-specialty');
      alert('Đã thêm đặc sản thành công');
    } catch (error) {
      console.error('Lỗi khi thêm đặc sản:', error);
      alert('Có lỗi xảy ra khi thêm đặc sản');
    }
  };

  return (
    <div className="specialty-form">
      <h2>Thêm Đặc Sản</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="touristSpotId"
          value={specialty.touristSpotId}
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
          value={specialty.name}
          onChange={handleChange}
          placeholder="Tên"
          required
        />
        <input
          type="text"
          name="price"
          value={specialty.price}
          onChange={handleChange}
          placeholder="Giá"
          required
        />
        <textarea
          name="description"
          value={specialty.description}
          onChange={handleChange}
          placeholder="Mô tả"
          required
        />
        <input
          type="text"
          name="origin"
          value={specialty.origin}
          onChange={handleChange}
          placeholder="Xuất xứ"
          required
        />
        <input
          type="text"
          name="expired"
          value={specialty.expired}
          onChange={handleChange}
          placeholder="Hạn sử dụng"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {imagePreview && <img src={imagePreview} alt="Xem trước hình ảnh" />}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddSpecialty;
