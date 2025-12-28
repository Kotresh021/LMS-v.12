import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Create Transporter (Using Brevo SMTP)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports like 587
        auth: {
            user: process.env.SMTP_EMAIL, // Your Brevo Login Email
            pass: process.env.SMTP_PASSWORD // Your Brevo SMTP Key
        }
    });

    // 2. Define Email Options
    const mailOptions = {
        from: `"PolyLibrary" <${process.env.SMTP_EMAIL}>`, // Sender address
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html || options.message
    };

    // 3. Send Email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
