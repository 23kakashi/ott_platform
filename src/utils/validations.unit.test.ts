import ValidationsObj from "./validations";

describe("validate email", () => {
  it("should return true if email is valid", () => {
    //Arrage
    const email = "test@test.com";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(true);
  });

  it("should return false if email does not has @", () => {
    //Arrage
    const email = "testtest.com";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });

  it("should return false if email does not has . followed by @", () => {
    //Arrage
    const email = "test@testcom";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });

  it("should return false if email has more than 3 char after .", () => {
    //Arrage
    const email = "test@test.coma";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });

  it("should return false if email has less than 2 char after .", () => {
    //Arrage
    const email = "test@test.c";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });

  it("should return false if email has less than 2 char between @ and .", () => {
    //Arrage
    const email = "test@t.com";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });

  it("should return false if email has less than 2 char before @", () => {
    //Arrage
    const email = "t@test.com";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });
  it("should return false if email has more than 1 .", () => {
    //Arrage
    const email = "t@test.com.";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });
  it("should return false if email has more than 1 @", () => {
    //Arrage
    const email = "t@te@st.com.";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });
  it("should return false if email has any special symbol othen that @ and .", () => {
    //Arrage
    const email = "test@te#st.com";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });
  it("should return false if email has othen that . followed by @", () => {
    //Arrage
    const email = "test.test@com";
    //Act
    const response = ValidationsObj.validateEmail(email);
    //Assert
    expect(response).toBe(false);
  });
});
