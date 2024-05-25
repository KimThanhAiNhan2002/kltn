import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setMessage('Hãy nhập địa điểm bạn muốn tìm kiếm');
      setSearchResults([]);
      return;
    }
    setMessage('');
    try {
      const response = await fetch(`http://localhost:5000/api/touristSpots/search?query=${searchTerm}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data); // Kiểm tra dữ liệu trả về từ API
      if (data.length === 0) {
        setMessage('Địa điểm bạn tìm kiếm đang được cập nhật');
      } else {
        setMessage('');
      }
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching tourist spots:', error);
      setMessage('Đã xảy ra lỗi khi tìm kiếm, vui lòng thử lại sau');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroHeader}>
        <video
          className={styles.video}
          src='assets/beachVid.mp4'
          autoPlay
          loop
          muted
        />
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>First Class Travel</h1>
          <h2 className='py-4'>Top 1% Locations Worldwide</h2>
          <form className={styles.form} onSubmit={handleSearch}>
            <input
              className={styles.input}
              type='text'
              placeholder='Search Destinations'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.button} type='submit'>
              <AiOutlineSearch size={20} className='icon' style={{ color: '#ffffff' }} />
            </button>
          </form>
        </div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.resultsContainer}>
        {searchResults.length > 0 && (
          <div className={styles.resultsGrid}>
            {searchResults.map((spot) => (
              <Link to={`/touristSpots/${spot._id}`} key={spot._id} className={styles.resultItem}>
                <img src={spot.image} alt={spot.name} className={styles.resultImage} />
                <h3>{spot.name}</h3>
                <p>{spot.address}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
