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
    <div className="body-content">
      <form onSubmit={handleSubmit}>
        <div className="decoration blur-2"></div>
        <div className="decoration blur-3"></div>
        <div className="container-xxl">
          <div className="card mb-4">
            <div className="card-header position-relative">
              <h6 className="fs-17 fw-semi-bold mb-0">Chỉnh sửa Dịch Vụ</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Tên Dịch Vụ</label>
                    <input type="text" className="form-control" name="name" value={service.name} placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Giá</label>
                    <input type="text" className="form-control" name="price" value={service.price} placeholder="Giá" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Mô Tả</label>
                    <textarea className="form-control" name="description" rows="7" value={service.description} onChange={handleChange} placeholder="Please enter up to 4000 characters."></textarea>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Hình Ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" />}
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

export default EditService;
