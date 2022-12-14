import jwt from "jsonwebtoken";

class JwtToken {
  public signJwtToken(role: string, userid: string) {
    return jwt.sign({ role: role, userid: userid }, "eiuof978weruyiuwef79438rferi23", { expiresIn: "1d" });
  }

  public verifyJwtToken(token: string) {
    return jwt.verify(token, "eiuof978weruyiuwef79438rferi23");
  }
}

const JwtTokenObj = new JwtToken();
export default JwtTokenObj;
