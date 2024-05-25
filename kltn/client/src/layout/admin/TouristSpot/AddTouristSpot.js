import React, { useState } from 'react';
import { createTouristSpot } from '../../../api/touristSpotsApi';
import './TouristSpot.css';

const AddTouristSpot = ({ setCurrentView }) => {
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
      await createTouristSpot(formData);
      alert('Đã thêm địa điểm du lịch thành công');
      setCurrentView('list');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi thêm địa điểm du lịch');
    }
  };

  return (
    <div class="body-content">
      <form onSubmit={handleSubmit}>
      <div class="decoration blur-2"></div>
      <div class="decoration blur-3"></div>
      <div class="container-xxl">
        <div class="card mb-4">
          <div class="card-header position-relative">
            <h6 class="fs-17 fw-semi-bold mb-0">Basic Informations</h6>
          </div>
          <div class="card-body">
            <div class="row g-4">
              <div class="col-sm-6">

                <div class="">
                  <label class="required fw-medium mb-2">Địa Điểm</label>
                  <input type="text" class="form-control" name="name" placeholder="Tên" onChange={handleChange} required="" />
                </div>

              </div>
              <div class="col-sm-6">

                <div class="">
                  <label class="required fw-medium mb-2">Category</label>
                  <select class="form-select" name="category" onChange={handleChange}>
                    <option value="Category">Category</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Event">Event</option>
                    <option value="Adrenaline">Adrenaline</option>
                  </select>
                </div>

              </div>
              <div class="col-sm-12">

                <div class="">
                  <label class="required fw-medium mb-2">Description</label>
                  <textarea class="form-control" name="description" rows="7" onChange={handleChange} placeholder="Please enter up to 4000 characters."></textarea>
                </div>

              </div>

              <div class="col-sm-12">

                <div class="">
                  <label class="required fw-medium mb-2">Địa chỉ</label>
                  <input type="text" class="form-control" name="address" placeholder="Địa chỉ" onChange={handleChange} required="" />
                </div>

              </div>
              <div class="col-sm-12">

                <div class="">
                  <label class="required fw-medium mb-2">Google Map</label>
                  <input type="text" class="form-control" name="google_map" placeholder="Google Map" onChange={handleChange} required="" />
                </div>

              </div>
              <div class="col-sm-12">

                <div class="">
                  <input type="file" accept="image/*" onChange={handleImageChange} required />
                  {imagePreview && <img src={imagePreview} alt="Preview" />}
                </div>

              </div>
              <div class="text-center">
                <button  type="submit" class="btn btn-primary-soft"><i class="fa fa-plus me-2"></i>Add New</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default AddTouristSpot;
