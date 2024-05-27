import React, { useState } from 'react';
import { createTouristSpot } from '../../../api/touristSpotsApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      description: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTouristSpot(formData);
      alert('Đã thêm địa điểm du lịch thành công');
      setCurrentView('list');
    } catch (error) {
      console.error('Failed to create tourist spot', error);
      alert('Có lỗi xảy ra khi thêm địa điểm du lịch');
    }
  };

  // Hàm upload adapter
  const CustomUploadAdapter = (loader) => {
    return {
      upload: () => {
        return loader.file
          .then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);

            fetch('http://localhost:5000/api/image/upload', { // Đường dẫn đến API upload
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(result => {
                resolve({
                  default: result.imageUrl
                });
              })
              .catch(error => {
                reject(error);
              });
          }));
      }
    };
  };

  // Hàm thêm adapter cho editor
  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return CustomUploadAdapter(loader);
    };
  }

  return (
    <div className="body-content">
      <form onSubmit={handleSubmit}>
        <div className="decoration blur-2"></div>
        <div className="decoration blur-3"></div>
        <div className="container-xxl">
          <div className="card mb-4">
            <div className="card-header position-relative">
              <h6 className="fs-17 fw-semi-bold mb-0">Basic Informations</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Địa Điểm</label>
                    <input type="text" className="form-control" name="name" placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Category</label>
                    <select className="form-select" name="category" onChange={handleChange}>
                      <option value="Category">Category</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Event">Event</option>
                      <option value="Adrenaline">Adrenaline</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Description</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.description}
                      onChange={handleDescriptionChange}
                      config={{
                        extraPlugins: [MyCustomUploadAdapterPlugin],
                        simpleUpload: {
                          uploadUrl: 'http://localhost:5000/api/image/upload', 
                          headers: { }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                    {imagePreview && <img src={imagePreview} alt="Preview" />}
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Địa chỉ</label>
                    <input type="text" className="form-control" name="address" placeholder="Địa chỉ" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Google Map</label>
                    <input type="text" className="form-control" name="google_map" placeholder="Google Map" onChange={handleChange} required />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary-soft"><i className="fa fa-plus me-2"></i>Add New</button>
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
