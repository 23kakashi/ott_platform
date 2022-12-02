import nodemailer from "nodemailer";
import { log } from "./logger";

export const sendEmail = async (email: string, otp: string) => {
  try {
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
      subject: "Hello ✔",
      text: "Your OTP is",
      html: `OTP for ott platform is<b>${otp}</b>
          <p>This otp will expire after 10 min.</p>
          </br>
          <i>if you have not asked for the otp. please raise the issue</i>
          <p>ott platform</p>
      `,
    };

    await transporter.sendMail(message);
    log.info(`email sent to ${email}`);
  } catch (error) {
    log.error(`nodemailer failed to send email to ${email}`);
  }
};
