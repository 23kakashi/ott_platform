export const validateEmail = (email: string) => {
  const regex =
    /^\w[a-z0-9]+([\.-]?\w[a-z0-9]+)*@\w[a-z0-9]+([\.-]?\w+)*(\.\w[a-z]{1,2})+$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export const validateOtp = (otp: string): boolean => {
  if (otp.length !== 4) {
    return false;
  }
  return true;
};

export const validateDate = (date: Date): boolean => {
  const now = new Date();
  const target = new Date(date);
  if (target <= now) {
    return true;
  }
  return false;
};
