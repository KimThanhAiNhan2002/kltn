import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchBy, setSearchBy] = useState('name');
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
      const endpoint = searchBy === 'name' ? 'search' : 'searchByAddress';
      const response = await fetch(`http://localhost:5000/api/touristSpots/${endpoint}?query=${searchTerm}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
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
        <video className={styles.video} src='assets/beachVid.mp4' autoPlay loop muted />
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>First Class Travel</h1>
          <h2 className='py-4'>Top 1% Locations Worldwide</h2>
          <form onSubmit={handleSearch} className="border-0 card d-flex flex-md-row position-relative search-wrapper">
            <div className="align-items-center d-flex search-field w-100">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
              <input
               style={{width:'250px'}} className="form-control search-input"
               placeholder={`Tìm kiếm địa điểm theo ${searchBy === 'name' ? 'tên' : 'địa chỉ'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="vertical-divider"></div>
            <div className="align-items-center d-flex search-field w-100">
              <div className="svg-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                style={{width:'250px'}} className="form-select search-select-field"
              >
                <option value="name">Tìm kiếm theo tên địa điểm</option>
                <option value="address">Tìm kiếm theo địa chỉ</option>
              </select>
            </div>
            <input
              type="submit"
              value="Tìm kiếm"
              className="btn btn-primary rounded-5 mt-3 mt-md-0"
            />
            <AiOutlineSearch />
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
