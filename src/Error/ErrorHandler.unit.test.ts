import ErrorHandlerObj from "./ErrorHandler";
describe("Error handler", () => {
  it("should return 401 if Invalid Email error message is received", () => {
    //Arrange
    const receivedMessage = "Invalid Email";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("Invalid Email");
    expect(response.erroCode).toBe(401);
  });

  it("should return 401 if Invalid User error message is received", () => {
    //Arrange
    const receivedMessage = "Invalid User";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("Invalid User");
    expect(response.erroCode).toBe(401);
  });

  it("should return 401 if Unauthorized access error message is received", () => {
    //Arrange
    const receivedMessage = "Unauthorized access";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("Unauthorized access");
    expect(response.erroCode).toBe(401);
  });

  it("should return 500 if is annonymous error message is received", () => {
    //Arrange
    const receivedMessage = "annonymous error";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("Internal Server Error");
    expect(response.erroCode).toBe(500);
  });

  it("should return 404 if otp expire error is thrown", () => {
    //Arrange
    const receivedMessage = "otp expired";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("otp expired");
    expect(response.erroCode).toBe(404);
  });

  it("should return 404 if otp expire error is thrown", () => {
    //Arrange
    const receivedMessage = "invalid otp";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("invalid otp");
    expect(response.erroCode).toBe(404);
  });

  it("should return 404 if otp expire error is thrown", () => {
    //Arrange
    const receivedMessage = "plan already active";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("plan already active");
    expect(response.erroCode).toBe(200);
  });

  it("should return 404 if otp expire error is thrown", () => {
    //Arrange
    const receivedMessage = "invalid plan";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("invalid plan");
    expect(response.erroCode).toBe(404);
  });

  it("should return 401 if otp expire error is thrown", () => {
    //Arrange
    const receivedMessage = "upgrade to premium";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("upgrade to premium");
    expect(response.erroCode).toBe(401);
  });
  it("should return 400 for bad request", () => {
    //Arrange
    const receivedMessage = "bad request";
    //Act
    const response = new ErrorHandlerObj(receivedMessage);
    //Assert
    expect(response.errorMessage).toBe("bad request");
    expect(response.erroCode).toBe(400);
  });
});
