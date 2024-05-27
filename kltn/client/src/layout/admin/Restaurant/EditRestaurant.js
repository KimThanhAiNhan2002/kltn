import React, { useState, useEffect, useCallback } from 'react';
import { getRestaurantById, updateRestaurant } from '../../../api/restaurantApi';
import "./Restaurant.css";

const EditRestaurant = ({ setCurrentView, editId, touristSpotId }) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    price: '',
    address: '',
    phone_number: '',
    description: '',
    image: '',
    google_map: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchRestaurant = useCallback(async () => {
    try {
      const data = await getRestaurantById(editId);
      setRestaurant(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
    } catch (error) {
      console.error('Lỗi khi lấy thông tin nhà hàng:', error);
    }
  }, [editId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchRestaurant();
    }
  }, [fetchRestaurant, touristSpotId, editId]);

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
      await updateRestaurant(touristSpotId, editId, restaurant);
      alert('Đã cập nhật nhà hàng thành công');
      setCurrentView('list-restaurant');
    } catch (error) {
      console.error('Lỗi khi cập nhật nhà hàng:', error);
      alert('Có lỗi xảy ra khi cập nhật nhà hàng');
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
              <h6 className="fs-17 fw-semi-bold mb-0">Chỉnh Sửa Nhà Hàng</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
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
                    <textarea className="form-control" name="description" rows="7" value={restaurant.description} onChange={handleChange} placeholder="Please enter up to 4000 characters."></textarea>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Hình Ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
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
                  <button type="submit" className="btn btn-primary-soft"><i className="fa fa-save me-2"></i>Lưu Thay Đổi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRestaurant;
