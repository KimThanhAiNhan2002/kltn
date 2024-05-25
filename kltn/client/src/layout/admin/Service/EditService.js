import React, { useState, useEffect, useCallback } from 'react';
import { getServiceById, updateService } from '../../../api/servicesApi';
import "./Service.css";

const EditService = ({ setCurrentView, editId, touristSpotId }) => {
  const [service, setService] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchService = useCallback(async () => {
    try {
      const data = await getServiceById(editId);
      setService(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
    } catch (error) {
      console.error('Lỗi khi lấy thông tin dịch vụ:', error);
    }
  }, [editId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchService();
    }
  }, [fetchService, touristSpotId, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setService({
          ...service,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setService({
        ...service,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(touristSpotId, editId, service);
      alert('Đã cập nhật dịch vụ thành công');
      setCurrentView('list-service');
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ:', error);
      alert('Có lỗi xảy ra khi cập nhật dịch vụ');
    }
  };

  return (
    <div className="service-form">
      <h2>Chỉnh sửa Dịch Vụ</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={service.name}
          onChange={handleChange}
          placeholder="Tên"
          required
        />
        <input
          type="text"
          name="price"
          value={service.price}
          onChange={handleChange}
          placeholder="Giá"
          required
        />
        <textarea
          name="description"
          value={service.description}
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
        <button type="submit">Lưu Thay Đổi</button>
      </form>
    </div>
  );
};

export default EditService;
