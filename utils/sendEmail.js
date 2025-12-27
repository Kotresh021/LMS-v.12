import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        // Create Transporter with explicit settings
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,       // Use 465 for Secure (SSL)
            secure: true,    // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            // Specific timeout settings to prevent "hanging forever"
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000,
            socketTimeout: 10000
        });

        const mailOptions = {
            from: `"GPTK Library" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: %s", info.messageId);

    } catch (error) {
        console.error("❌ EMAIL ERROR DETAILS:", error.message);
        // We throw the error so the controller knows it failed
        throw new Error("Email sending failed");
    }
};

export default sendEmail;