import nodemailer from "nodemailer";

class EmailService {
  constructor() {}

  public async sendEmail(email: string, otp: string): Promise<void> {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });
    const message = {
      from: `"OTT platform" ${process.env.EMAIL}`,
      to: `${email}`,
      subject: "login otp ott platform",
      text: "Your OTP is",
      html: `OTP for ott platform is <b>${otp}</b>
            <p>This otp will expire after 10 min.</p>
            </br>
            <i>if you have not asked for the otp. please raise the issue</i>
            <p>ott platform</p>
        `,
    };

    await transporter.sendMail(message);
    return Promise.resolve();
  }
}

const EmailServiceObj = new EmailService();
export default EmailServiceObj;
