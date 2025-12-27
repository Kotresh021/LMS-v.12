import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Log OTP to console (Always your backup!)
    console.log("📨 ATTEMPTING EMAIL TO:", options.email);
    console.log("🔑 MESSAGE CONTENT (OTP/LINK):", options.message);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // 👈 Let Nodemailer handle host/port automatically
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // 👈 Keep this to bypass SSL errors
            }
        });

        const mailOptions = {
            from: `"GPTK Library" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent Successfully! ID:", info.messageId);

    } catch (error) {
        // Log the error but DO NOT crash the server
        console.error("❌ EMAIL FAILED (Google blocked connection):", error.message);
        return false;
    }
};

export default sendEmail;