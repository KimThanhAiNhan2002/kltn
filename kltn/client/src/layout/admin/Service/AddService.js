import React, { useState, useEffect } from 'react';
import { addService } from '../../../api/servicesApi';
import { getTouristSpots } from '../../../api/touristSpotsApi';
import "./Service.css";

const AddService = ({ setCurrentView, touristSpotId }) => {
  const [service, setService] = useState({
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
      await addService(service.touristSpotId, service);
      setCurrentView('list-service');
      alert('Đã thêm dịch vụ thành công');
    } catch (error) {
      console.error('Lỗi khi thêm dịch vụ:', error);
      alert('Có lỗi xảy ra khi thêm dịch vụ');
    }
  };

  return (
    <div className="service-form">
      <h2>Thêm Dịch Vụ</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="touristSpotId"
          value={service.touristSpotId}
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddService;
