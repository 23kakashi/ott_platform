import request from "supertest";
import sinon from "sinon";
import * as userquery from "../../database/user.query";
import * as movie from "../../service/addMovie.service";
import app from "../../app";

describe.skip("create new movie api POST(/admin/create)", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("should return status 200 is movie is added to databse", async () => {
    //Arrange
    const expectedStatus = 200;
    const expectedResponse = {
      error: false,
      message: "success",
    };
    //Act
    const response = await request(app)
      .post("/admin/create")
      .send({
        title: "Avengers",
        release_date: "2014-10-22",
        rating: "9.2",
        language: "English",
        actors: ["Marlee Sacker", "Charmion Wreford", "Sheela Clingoe"],
        directos: ["Connie Porkiss", "Adriaens Klimkowski"],
        geners: ["Action", "Adventure", "Fantasy"],
      });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should return status 500 if api throw an error", async () => {
    //Arrange
    const expectedStatus = 500;
    const expectedResponse = {
      error: true,
      message: "internal server error",
    };
    sinon.stub(movie, "createNewMovie").throws(new Error());
    //Act
    const response = await request(app)
      .post("/admin/create")
      .send({
        title: "Avengers",
        release_date: "2014-10-22",
        rating: "9.2",
        language: "English",
        actors: ["Marlee Sacker", "Charmion Wreford", "Sheela Clingoe"],
        directos: ["Connie Porkiss", "Adriaens Klimkowski"],
        geners: ["Action", "Adventure", "Fantasy"],
      });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should return invalid release date if date is from future", async () => {
    //Arrange
    const expectedStatus = 400;
    const expectedResponse = {
      error: true,
      message: "invalid release date",
    };
    //Act
    const response = await request(app)
      .post("/admin/create")
      .send({
        title: "Avengers",
        release_date: "2044-10-22",
        rating: "9.2",
        language: "English",
        actors: ["Marlee Sacker", "Charmion Wreford", "Sheela Clingoe"],
        directos: ["Connie Porkiss", "Adriaens Klimkowski"],
        geners: ["Action", "Adventure", "Fantasy"],
      });
    //Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedResponse);
  });
});
