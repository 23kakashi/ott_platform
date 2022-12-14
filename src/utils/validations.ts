import joi from "joi";
class Validations {
  public validateEmail(email: string): boolean {
    const regex = /^\w[a-z0-9]+([.-]?\w[a-z0-9]+)*@\w[a-z0-9]+([.-]?\w+)*(\.\w[a-z]{1,2})+$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

  public validateMovieData() {
    const schema = joi.object({
      title: joi.string().required(),
      release_date: joi.string().required(),
      rating: joi.string().required(),
      language: joi.string().required(),
      plan: joi.string().required(),
      url: joi.string().required(),
      actors: joi.array().required(),
      directors: joi.array().required(),
      geners: joi.array().required(),
    });
    return schema;
  }
}

const ValidationsObj = new Validations();
export default ValidationsObj;
