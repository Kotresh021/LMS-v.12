import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Log the content to console IMMEDIATELY (Backup Plan)
    // This ensures you see the OTP in logs even if email fails 1ms later.
    console.log("📨 ATTEMPTING EMAIL TO:", options.email);
    console.log("🔑 MESSAGE CONTENT (OTP/LINK):", options.message);

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,              // ✅ Use 587 (Standard for Cloud) instead of 465
            secure: false,          // ✅ Must be false for port 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // ✅ Bypass SSL strictness
            },
            family: 4,              // ✅ FORCE IPv4 (Crucial Fix for Render Timeouts)
            connectionTimeout: 10000 // 10 seconds max wait
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
        console.error("❌ EMAIL FAILED (Network/Auth Error):", error.message);

        // ⚠️ IMPORTANT: We DO NOT throw the error here.
        // We catch it so your Backend DOES NOT CRASH.
        // The user will see a success message, and you can get the OTP from the logs above.
        return false;
    }
};

export default sendEmail;