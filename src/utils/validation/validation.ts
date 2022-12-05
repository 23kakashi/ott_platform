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

export const validateDate = (date: string): boolean => {
  var regexDate = /^\d{4}-\d{2}-\d{2}$/;
  if (regexDate.test(date)) {
    const now = new Date();
    const target = new Date(date);
    console.log(now, target);
    if (target.getFullYear() < now.getFullYear()) {
      console.log(now.getFullYear(), target.getFullYear());
      return true;
    } else if (target.getFullYear() === now.getFullYear()) {
      if (target.getMonth() < now.getMonth()) {
        console.log(now.getMonth(), target.getMonth());
        return true;
      }
    } else if (target.getMonth() === now.getMonth()) {
      if (target.getDate() <= now.getDate()) {
        console.log(now.getDate(), target.getDate());
        return true;
      }
    }
  }
  return false;
};
