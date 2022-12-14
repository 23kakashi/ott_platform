class Validations {
  public validateEmail(email: string): boolean {
    const regex = /^\w[a-z0-9]+([.-]?\w[a-z0-9]+)*@\w[a-z0-9]+([.-]?\w+)*(\.\w[a-z]{1,2})+$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }
}

const ValidationsObj = new Validations();
export default ValidationsObj;
