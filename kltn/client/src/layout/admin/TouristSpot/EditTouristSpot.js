import React, { useEffect, useState } from 'react';
import { getTouristSpotById, updateTouristSpot } from '../../../api/touristSpotsApi';
import './TouristSpot.css';

const EditTouristSpot = ({ setCurrentView, editId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    image: '',
    category: '',
    google_map: '',
    accommodations: [],
    restaurants: [],
    specialties: [],
    services: [],
    souvenirs: []
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTouristSpotById(editId);
        setFormData(data);
        setImagePreview(data.image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFormData({
        ...formData,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTouristSpot(editId, formData);
      alert('Đã cập nhật địa điểm du lịch thành công');
      setCurrentView('list');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi cập nhật địa điểm du lịch');
    }
  };

  return (
    <div className="tourist-spot-form">
      <h2>Chỉnh Sửa Địa Điểm Du Lịch</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <input name="address" value={formData.address} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" />}
        <input name="category" value={formData.category} onChange={handleChange} required />
        <input name="google_map" value={formData.google_map} onChange={handleChange} required />
        {/* Thêm các trường accommodations, restaurants, specialties, services, souvenirs tương tự */}
        <button type="submit">Cập Nhật</button>
      </form>
    </div>
  );
};

export default EditTouristSpot;
