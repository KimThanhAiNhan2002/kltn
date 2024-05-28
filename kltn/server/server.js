import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initRouter from './src/routes/index.js';
import { connect } from './src/config/connectDB.js';

dotenv.config();

const app = express();

// Kết nối cơ sở dữ liệu MongoDB
connect();

// Cấu hình CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Tăng giới hạn kích thước payload
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Khởi tạo các route khác
initRouter(app);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
