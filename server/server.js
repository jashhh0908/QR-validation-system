import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import connectDB from './config/connectDB.js';
import csvRoutes from './routes/csvRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use('/csv', csvRoutes);
async function StartServer() {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

StartServer();