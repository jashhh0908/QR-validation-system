import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    service: "gmail",
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

const mail = async (to, subject, html) => {
    try {
        const receiver = ({
            from: `Admin <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        })

        const info = await transporter.sendMail(receiver);
        console.log("Email sent: ", receiver.to);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

export default mail;
