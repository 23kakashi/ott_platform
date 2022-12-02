export const generateOtp = (): string => {
  const otp: number = Math.floor(Math.random() * 9000) + 1000;

  return otp.toString();
};
