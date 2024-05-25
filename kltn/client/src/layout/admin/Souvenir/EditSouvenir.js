import React, { useState, useEffect, useCallback } from 'react';
import { getSouvenirById, updateSouvenir } from '../../../api/souvenirsApi';
import "./Souvenir.css";

const EditSouvenir = ({ setCurrentView, editId, touristSpotId }) => {
  const [souvenir, setSouvenir] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchSouvenir = useCallback(async () => {
    try {
      const data = await getSouvenirById(touristSpotId, editId);
      setSouvenir(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
    } catch (error) {
      console.error('Lỗi khi lấy thông tin quà lưu niệm:', error);
    }
  }, [editId, touristSpotId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchSouvenir();
    }
  }, [fetchSouvenir, touristSpotId, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSouvenir({ ...souvenir, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSouvenir({
          ...souvenir,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setSouvenir({
        ...souvenir,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSouvenir(touristSpotId, editId, souvenir);
      alert('Đã cập nhật quà lưu niệm thành công');
      setCurrentView('list-souvenir');
    } catch (error) {
      console.error('Lỗi khi cập nhật quà lưu niệm:', error);
      alert('Có lỗi xảy ra khi cập nhật quà lưu niệm');
    }
  };

  return (
    <div className="souvenir-form">
      <h2>Chỉnh sửa Quà Lưu Niệm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={souvenir.name}
          onChange={handleChange}
          placeholder="Tên"
          required
        />
        <input
          type="text"
          name="price"
          value={souvenir.price}
          onChange={handleChange}
          placeholder="Giá"
          required
        />
        <textarea
          name="description"
          value={souvenir.description}
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

export default EditSouvenir;
