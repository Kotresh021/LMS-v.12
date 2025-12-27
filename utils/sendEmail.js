import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        // 1. Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000, // 10 seconds timeout
            socketTimeout: 15000, // 15 seconds socket timeout
        });

        // 2. Verify connection
        await transporter.verify();
        console.log('✅ Email server connection verified');

        // 3. Send Email
        const mailOptions = {
            from: `"PolyLibrary" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);

        return info;

    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        throw new Error(`Email failed: ${error.message}`);
    }
};

export default sendEmail;