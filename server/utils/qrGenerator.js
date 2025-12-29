import qr from 'qrcode';
import fs from 'fs';
import sharp from 'sharp';
import dotenv from 'dotenv';
import cloudinary from './cloudinary.js';

dotenv.config();
const generateandUploadQRCode = async (data, fileName) => {
    try {
        const baseURL = process.env.NODE_ENV === 'production' 
            ? process.env.DOMAIN
            : `${process.env.URL}:${process.env.PORT}`;
            
        const qrData = `${baseURL}/csv/verify/${data.token}`;
        const qrBuffer = await qr.toBuffer(qrData, {
        type: "png",
        width: 500,
        margin: 2,
        });

        const textSVG = Buffer.from(`
        <svg width="500" height="60">
            <style>
            .token {
                font-size: 36px;
                font-weight: bold;
                text-anchor: middle;
                fill: #000;
                font-family: Arial, sans-serif;
            }
            </style>
            <text x="50%" y="50%" class="token" dominant-baseline="middle">${data.token}</text>
        </svg>
        `);

        const combinedBuffer = await sharp({
        create: {
            width: 500,
            height: 560,
            channels: 4,
            background: "#da7878ff",
        },
        })
        .composite([
            { input: qrBuffer, top: 0, left: 0 },
            { input: textSVG, top: 500, left: 0 },
        ])
        .png()
        .toBuffer();

        const tempPath = `./public/temp/${fileName}.png`;
        fs.writeFileSync(tempPath, combinedBuffer);

        const upload = await cloudinary.uploader.upload(tempPath, {
        folder: "qrcodes",
        public_id: fileName,
        overwrite: true,
        });

        fs.unlinkSync(tempPath);

        return upload.secure_url;
  } catch (error) {
    console.error("QR generation failed:", error);
    throw error;
  }
}

export { generateandUploadQRCode };