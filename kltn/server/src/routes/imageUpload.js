import express from 'express';
import multer from 'multer';

const router = express.Router();

// Cấu hình Multer cho việc lưu trữ file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint cho việc tải lên hình ảnh
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    // Lưu file hoặc xử lý file ở đây
    const file = req.file;

    // Trả về URL của hình ảnh hoặc một thông tin nào đó
    res.json({ imageUrl: `data:${file.mimetype};base64,${file.buffer.toString('base64')}` });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
