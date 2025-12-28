import QRCode from "qrcode";
import sharp from "sharp";
import fs from "fs";

const generateQRCodeWithText = async (data, token) => {
  try {
    const qrBuffer = await QRCode.toBuffer(JSON.stringify(data), {
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
        <text x="50%" y="50%" class="token" dominant-baseline="middle">${token}</text>
      </svg>
    `);

    const finalImage = await sharp({
      create: {
        width: 500,
        height: 560,
        channels: 4,
        background: "lightcoral",
      },
    })
      .composite([
        { input: qrBuffer, top: 0, left: 0 },
        { input: textSVG, top: 500, left: 0 },
      ])
      .png()
      .toBuffer();

    const outputPath = `./temp/qr_with_token.png`;
    fs.writeFileSync(outputPath, finalImage);
    console.log(`✅ QR code with token saved as ${outputPath}`);    
  } catch (error) {
    console.error("QR Code generation failed:", error);
  }
};

const data = {
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
};
const token = "A7X9P";

generateQRCodeWithText(data, token);
