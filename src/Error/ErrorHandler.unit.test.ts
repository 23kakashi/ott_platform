import ErrorHandlerObj from "./ErrorHandler";
describe("Error handler", () => {
  it("should return 401 if Invalid Email error message is received", () => {
    //Arrange
    const receivedMessage = "Invalid Email";
    //Act
    const response = ErrorHandlerObj.handleError(receivedMessage);
    //Assert
    expect(response.message).toBe("Invalid Email");
    expect(response.status).toBe(401);
  });

  it("should return 401 if Invalid User error message is received", () => {
    //Arrange
    const receivedMessage = "Invalid User";
    //Act
    const response = ErrorHandlerObj.handleError(receivedMessage);
    //Assert
    expect(response.message).toBe("Invalid User");
    expect(response.status).toBe(401);
  });

  it("should return 401 if Unauthorized access error message is received", () => {
    //Arrange
    const receivedMessage = "Unauthorized access";
    //Act
    const response = ErrorHandlerObj.handleError(receivedMessage);
    //Assert
    expect(response.message).toBe("Unauthorized access");
    expect(response.status).toBe(401);
  });

  it("should return 500 if is annonymous error message is received", () => {
    //Arrange
    const receivedMessage = "annonymous error";
    //Act
    const response = ErrorHandlerObj.handleError(receivedMessage);
    //Assert
    expect(response.message).toBe("Internal Server Error");
    expect(response.status).toBe(500);
  });
});
