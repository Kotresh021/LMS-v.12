// import nodemailer from 'nodemailer';

// const sendEmail = async (options) => {
//     // 1. Log OTP to console (Always your backup!)
//     console.log("📨 ATTEMPTING EMAIL TO:", options.email);
//     console.log("🔑 MESSAGE CONTENT (OTP/LINK):", options.message);

//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,              // ✅ Use Port 587 (Standard for Cloud)
//             secure: false,          // ✅ Must be false for port 587
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             },
//             tls: {
//                 rejectUnauthorized: false // ✅ Bypass strict SSL checks
//             },
//             family: 4,              // ✅ FORCE IPv4 (Crucial Fix for Render Timeouts)
//             connectionTimeout: 10000 // 10 seconds max wait
//         });

//         const mailOptions = {
//             from: `"GPTK Library" <${process.env.EMAIL_USER}>`,
//             to: options.email,
//             subject: options.subject,
//             text: options.message,
//             html: options.html || options.message
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log("✅ Email Sent Successfully! ID:", info.messageId);

//     } catch (error) {
//         // Log the error but DO NOT crash the server
//         console.error("❌ EMAIL FAILED (Network/Auth Error):", error.message);

//         // Return false so the app continues running even if email fails
//         return false;
//     }
// };

// export default sendEmail;

import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Log OTP to console (Backup plan)
    console.log("📨 ATTEMPTING EMAIL TO:", options.email);
    console.log("🔑 MESSAGE CONTENT (OTP/LINK):", options.message);

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',  // ✅ Brevo's SMTP Server
            port: 587,                     // ✅ Standard Port for Brevo
            secure: false,                 // ✅ False for port 587 (uses STARTTLS)
            auth: {
                user: process.env.EMAIL_USER, // Your Brevo Login Email
                pass: process.env.EMAIL_PASS  // Your Brevo SMTP Key
            }
        });

        const mailOptions = {
            from: `"GPTK Library" <${process.env.EMAIL_USER}>`, // Must match verified sender in Brevo
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html || options.message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent Successfully! ID:", info.messageId);

    } catch (error) {
        console.error("❌ EMAIL FAILED (Brevo Error):", error.message);
        // Don't crash the app, just return false
        return false;
    }
};

export default sendEmail;