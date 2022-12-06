import { checkPassword, encryptPassword } from "./encyption";

describe("encryption", () => {
  it("should generate hash", async () => {
    //Arrange
    const password = "1232";
    //Act
    const hash = await encryptPassword(password);
    //Assert
    expect(hash).toBeDefined();
    expect(typeof hash).toBe("string");
    expect(hash).toHaveLength(101);
  });

  it("should return true is hash is varified", async () => {
    //Arrange
    const password = "2876";
    const hash =
      "$argon2id$v=19$m=65536,t=3,p=4$Y31T2xq0VLLWzohuGiiBbg$HfF+YpQyhMAu1E14aC5LQE9ro9DfRr/XySBNwaE5RB4";
    //Act
    let result = await checkPassword(hash, password);
    //Assert
    expect(result).toBe(true);
  });

  it("should return false is hash is not varified", async () => {
    //Arrange
    const password = "2873";
    const hash =
      "$argon2id$v=19$m=65536,t=3,p=4$Y31T2xq0VLLWzohuGiiBbg$HfF+YpQyhMAu1E14aC5LQE9ro9DfRr/XySBNwaE5RB4";
    //Act
    let result = await checkPassword(hash, password);
    //Assert
    expect(result).toBe(false);
  });
});
