import nodemailer from "nodemailer";
import sinon from "sinon";
import EmailServiceObj from "./EmailService";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { table } from "console";

describe.skip("Email service", () => {
  const message = {
    from: `"OTT platform" test@test.com`,
    to: "test@test.com",
    subject: "login otp ott platform",
    text: "Your OTP is",
    html: `OTP for ott platform is <b>1221</b>
          `,
  };
  it("", () => {
    //Arrange
    //Act
    //Assert
  });
  //   it("", async () => {
  //     const transporterMock: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = sinon.stub(
  //       nodemailer,
  //       "createTransport"
  //     );
  //     sinon.stub(transporterMock, "sendMail").resolves();
  //     const response = await EmailServiceObj.sendEmail("test@test.com", "1212");
  //     console.log(response);
  //   });
});
