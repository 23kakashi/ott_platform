import nodemailer from "nodemailer";
import { responceType } from "../../types/api_response.types";
import { log } from "../logger";

export const sendEmail = async (
  email: string,
  otp: string
): Promise<responceType> => {
  try {
    await nodemailerConnection(email, otp);
    log.info(`email sent to ${email}`);
    return {
      status: 200,
      error: false,
      message: "email sent",
    };
  } catch (error) {
    log.error(`nodemailer failed to send email to ${email}`);
    return {
      status: 404,
      error: true,
      message: "email request failed",
    };
  }
};

export const nodemailerConnection = async (email: string, otp: string) => {
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

  return await transporter.sendMail(message);
};
