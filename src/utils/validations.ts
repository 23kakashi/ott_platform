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
      title: joi.string().required().length(1),
      release_date: joi.date().required(),
      rating: joi.number().required().min(0).max(10),
      language: joi.string().required().length(1),
      plan: joi.string().required().length(4),
      url: joi.string().required(),
      actors: joi.array().required().length(1),
      directors: joi.array().required().length(1),
      geners: joi.array().required().length(1),
    });
    return schema;
  }
}

const ValidationsObj = new Validations();
export default ValidationsObj;
