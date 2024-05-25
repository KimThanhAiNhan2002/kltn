import { TouristSpot } from '../model/touristSpot'; // Import model TouristSpot

// Controller function để lấy tất cả dữ liệu địa điểm du lịch
const getAllTouristSpots = async (req, res) => {
  try {
    const touristSpots = await TouristSpot.find();
    res.status(200).json(touristSpots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để lấy dữ liệu địa điểm du lịch theo ID
const getTouristSpotById = async (req, res) => {
  const { id } = req.params;
  try {
    const touristSpot = await TouristSpot.findById(id);
    if (!touristSpot) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm du lịch' });
    }
    res.status(200).json(touristSpot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để tạo mới một địa điểm du lịch
const createTouristSpot = async (req, res) => {
  const touristSpot = req.body;
  try {
    const createdTouristSpot = await TouristSpot.create(touristSpot);
    res.status(201).json(createdTouristSpot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để cập nhật thông tin của một địa điểm du lịch theo ID
const updateTouristSpotById = async (req, res) => {
  const { id } = req.params;
  const updatedTouristSpot = req.body;
  try {
    const result = await TouristSpot.findByIdAndUpdate(id, updatedTouristSpot, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm du lịch để cập nhật' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function để xóa một địa điểm du lịch theo ID
const deleteTouristSpotById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await TouristSpot.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm du lịch để xóa' });
    }
    res.status(200).json({ message: 'Đã xóa địa điểm du lịch thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchTouristSpots = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await TouristSpot.find({
      name: { $regex: query, $options: 'i' }
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllTouristSpots,
  getTouristSpotById,
  createTouristSpot,
  updateTouristSpotById,
  deleteTouristSpotById,
  searchTouristSpots
};