import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './TouristSpotDetail.module.css';

const TouristSpotDetail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/touristSpots/tourist-spots/${id}`);
        const data = await response.json();
        setSpot(data);
      } catch (error) {
        console.error('Error fetching the tourist spot details:', error);
      }
    };
    fetchSpot();
  }, [id]);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  const checkOverflow = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  const Description = ({ content }) => {
    const [showMore, setShowMore] = useState(false);
    const contentRef = React.createRef();

    useEffect(() => {
      if (contentRef.current && checkOverflow(contentRef.current)) {
        setShowMore(true);
      }
    }, [contentRef]);

    return (
      <p className={styles.description}>
        Mô tả: <span className={styles.ellipsis} ref={contentRef}>{content}</span>
        {showMore && <button className={styles.moreBtn} onClick={() => openModal(content)}>Xem thêm</button>}
      </p>
    );
  };

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{spot.name}</h1>
      <img src={spot.image} alt={spot.name} className={styles.resultImage} />
      <p className={styles.description}>Mô tả: {spot.description}</p>
      <p className={styles.address}>Địa chỉ: {spot.address}</p>
      <p className={styles.category}>Loại hình: {spot.category}</p>
      <a href={spot.google_map} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>Xem trên Google Maps</a>

      <h2 className={styles.sectionTitle}>Khách sạn</h2>
      <div className={styles.grid}>
        {spot.accommodations.length > 0 ? (
          spot.accommodations.map((accommodation, index) => (
            <div key={index} className={styles.card}>
              <img src={accommodation.image} alt={accommodation.name} className={styles.resultImage} />
              <h3>{accommodation.name}</h3>
              <Description content={accommodation.description} />
              <p>Giá: {accommodation.price}</p>
              <p>Địa chỉ: {accommodation.address}</p>
              <p>Số điện thoại: {accommodation.phone_number}</p>
              <a href={accommodation.google_map} target="_blank" rel="noopener noreferrer">Xem trên Google Maps</a>
            </div>
          ))
        ) : (
          <p>Khách sạn của địa điểm đang cập nhật</p>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Nhà hàng</h2>
      <div className={styles.grid}>
        {spot.restaurants.length > 0 ? (
          spot.restaurants.map((restaurant, index) => (
            <div key={index} className={styles.card}>
              <img src={restaurant.image} alt={restaurant.name} className={styles.resultImage} />
              <h3>{restaurant.name}</h3>
              <Description content={restaurant.description} />
              <p>Giá: {restaurant.price}</p>
              <p>Địa chỉ: {restaurant.address}</p>
              <p>Số điện thoại: {restaurant.phone_number}</p>
              <a href={restaurant.google_map} target="_blank" rel="noopener noreferrer">Xem trên Google Maps</a>
            </div>
          ))
        ) : (
          <p>Nhà hàng của địa điểm đang cập nhật</p>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Đặc sản</h2>
      <div className={styles.grid}>
        {spot.specialties.length > 0 ? (
          spot.specialties.map((specialty, index) => (
            <div key={index} className={styles.card}>
              <img src={specialty.image} alt={specialty.name} className={styles.resultImage} />
              <h3>{specialty.name}</h3>
              <Description content={specialty.description} />
              <p>Giá: {specialty.price}</p>
              <p>Xuất xứ: {specialty.origin}</p>
              <p>Hạn sử dụng: {specialty.expired}</p>
            </div>
          ))
        ) : (
          <p>Đặc sản của địa điểm đang cập nhật</p>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Dịch vụ</h2>
      <div className={styles.grid}>
        {spot.services.length > 0 ? (
          spot.services.map((service, index) => (
            <div key={index} className={styles.card}>
              <img src={service.image} alt={service.name} className={styles.resultImage} />
              <h3>{service.name}</h3>
              <Description content={service.description} />
              <p>Giá: {service.price}</p>
            </div>
          ))
        ) : (
          <p>Dịch vụ của địa điểm đang cập nhật</p>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Quà lưu niệm</h2>
      <div className={styles.grid}>
        {spot.souvenirs.length > 0 ? (
          spot.souvenirs.map((souvenir, index) => (
            <div key={index} className={styles.card}>
              <img src={souvenir.image} alt={souvenir.name} className={styles.resultImage} />
              <h3>{souvenir.name}</h3>
              <Description content={souvenir.description} />
              <p>Giá: {souvenir.price}</p>
            </div>
          ))
        ) : (
          <p>Quà lưu niệm của địa điểm đang cập nhật</p>
        )}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristSpotDetail;
