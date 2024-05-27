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
    <div className="body-content">
      <form onSubmit={handleSubmit}>
        <div className="decoration blur-2"></div>
        <div className="decoration blur-3"></div>
        <div className="container-xxl">
          <div className="card mb-4">
            <div className="card-header position-relative">
              <h6 className="fs-17 fw-semi-bold mb-0">Thêm Đặc Sản</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Chọn Địa Điểm Du Lịch</label>
                    <select
                      className="form-select"
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
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Tên Đặc Sản</label>
                    <input type="text" className="form-control" name="name" placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Giá</label>
                    <input type="text" className="form-control" name="price" placeholder="Giá" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Mô Tả</label>
                    <textarea className="form-control" name="description" rows="7" onChange={handleChange} placeholder="Please enter up to 4000 characters."></textarea>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Xuất xứ</label>
                    <input type="text" className="form-control" name="origin" placeholder="Xuất xứ" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Hạn sử dụng</label>
                    <input type="text" className="form-control" name="expired" placeholder="Hạn sử dụng" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Hình Ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                    {imagePreview && <img src={imagePreview} alt="Xem trước hình ảnh" />}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary-soft"><i className="fa fa-plus me-2"></i>Thêm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSpecialty;
