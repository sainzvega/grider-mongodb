const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const Driver = mongoose.model("driver");

describe("Driver Controller", () => {
  it("Posts to api/driver and creates a new driver", done => {
    Driver.count().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.count().then(newCount => {
            assert(newCount === count + 1);
            done();
          });
        });
    });
  });
});
