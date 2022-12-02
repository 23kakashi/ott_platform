export const validateEmail = (email: string) => {
  const regex =
    /^\w[a-z0-9]+([\.-]?\w[a-z0-9]+)*@\w[a-z0-9]+([\.-]?\w+)*(\.\w[a-z]{1,2})+$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
};
