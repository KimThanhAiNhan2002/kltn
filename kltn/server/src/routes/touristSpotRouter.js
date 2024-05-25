import express from 'express';
import {
  getAllTouristSpots,
  getTouristSpotById,
  createTouristSpot,
  updateTouristSpotById,
  deleteTouristSpotById,
  searchTouristSpots
} from '../controllers/touristSpotController';

const router = express.Router();

// Route để tìm kiếm địa điểm du lịch theo tên
router.get('/search', searchTouristSpots);

// Các route khác...
router.get('/tourist-spots', getAllTouristSpots);
router.get('/tourist-spots/:id', getTouristSpotById);
router.post('/tourist-spots', createTouristSpot);
router.put('/tourist-spots/:id', updateTouristSpotById);
router.delete('/tourist-spots/:id', deleteTouristSpotById);

export default router;
