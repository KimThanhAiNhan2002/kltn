import React, { useState, useEffect, useCallback } from 'react';
import { getSpecialtyById, updateSpecialty } from '../../../api/specialtiesApi';
import "./Specialty.css";

const EditSpecialty = ({ setCurrentView, editId, touristSpotId }) => {
  const [specialty, setSpecialty] = useState({
    name: '',
    price: '',
    description: '',
    origin: '',
    expired: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchSpecialty = useCallback(async () => {
    try {
      const data = await getSpecialtyById(editId);
      setSpecialty(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đặc sản:', error);
    }
  }, [editId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchSpecialty();
    }
  }, [fetchSpecialty, touristSpotId, editId]);

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
      await updateSpecialty(touristSpotId, editId, specialty);
      alert('Đã cập nhật đặc sản thành công');
      setCurrentView('list-specialty');
    } catch (error) {
      console.error('Lỗi khi cập nhật đặc sản:', error);
      alert('Có lỗi xảy ra khi cập nhật đặc sản');
    }
  };

  return (
    <div className="specialty-form">
      <h2>Chỉnh sửa Đặc Sản</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Lưu Thay Đổi</button>
      </form>
    </div>
  );
};

export default EditSpecialty;
