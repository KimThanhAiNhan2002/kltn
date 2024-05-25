import React, { useState, useEffect } from 'react';
import { addSouvenir } from '../../../api/souvenirsApi';
import { getTouristSpots } from '../../../api/touristSpotsApi';
import "./Souvenir.css";

const AddSouvenir = ({ setCurrentView, touristSpotId }) => {
  const [souvenir, setSouvenir] = useState({
    name: '',
    price: '',
    description: '',
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
      await addSouvenir(souvenir.touristSpotId, souvenir);
      setCurrentView('list-souvenir');
      alert('Đã thêm quà lưu niệm thành công');
    } catch (error) {
      console.error('Lỗi khi thêm quà lưu niệm:', error);
      alert('Có lỗi xảy ra khi thêm quà lưu niệm');
    }
  };

  return (
    <div className="souvenir-form">
      <h2>Thêm Quà Lưu Niệm</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="touristSpotId"
          value={souvenir.touristSpotId}
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddSouvenir;
