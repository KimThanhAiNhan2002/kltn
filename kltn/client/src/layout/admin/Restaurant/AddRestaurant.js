import React, { useState, useEffect } from 'react';
import { addRestaurant } from '../../../api/restaurantApi';
import { getTouristSpots } from '../../../api/touristSpotsApi';
import "./Restaurant.css";

const AddRestaurant = ({ setCurrentView, touristSpotId }) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    price: '',
    address: '',
    phone_number: '',
    description: '',
    image: '',
    google_map: '',
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
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setRestaurant({
          ...restaurant,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setRestaurant({
        ...restaurant,
        image: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRestaurant(restaurant.touristSpotId, restaurant);
      setCurrentView('list-restaurant');
      alert('Đã thêm nhà hàng thành công');
    } catch (error) {
      console.error('Lỗi khi thêm nhà hàng:', error);
      alert('Có lỗi xảy ra khi thêm nhà hàng');
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
              <h6 className="fs-17 fw-semi-bold mb-0">Add Restaurant</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Chọn Địa Điểm Du Lịch</label>
                    <select
                      className="form-select"
                      name="touristSpotId"
                      value={restaurant.touristSpotId}
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
                    <label className="required fw-medium mb-2">Tên Nhà Hàng</label>
                    <input type="text" className="form-control" name="name" value={restaurant.name} placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Giá</label>
                    <input type="text" className="form-control" name="price" value={restaurant.price} placeholder="Giá" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Mô Tả</label>
                    <textarea className="form-control" name="description" rows="7" onChange={handleChange} placeholder="Please enter up to 4000 characters."></textarea>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Hình Ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                    {imagePreview && <img src={imagePreview} alt="Preview" />}
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Địa Chỉ</label>
                    <input type="text" className="form-control" name="address" value={restaurant.address} placeholder="Địa chỉ" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Số Điện Thoại</label>
                    <input type="text" className="form-control" name="phone_number" value={restaurant.phone_number} placeholder="Số điện thoại" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Google Map</label>
                    <input type="text" className="form-control" name="google_map" value={restaurant.google_map} placeholder="Google Map" onChange={handleChange} required />
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

export default AddRestaurant;
