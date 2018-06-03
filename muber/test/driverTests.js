const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const Driver = mongoose.model("driver");

describe("Driver Controller", () => {
  it("POST to api/driver and creates a new driver", done => {
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

  it("Post to /api/drivers requires an email", done => {
    request(app)
      .post("/api/drivers")
      .send({})
      .end((err, res) => {
        assert(res.body.error);
        done();
      });
  });

  it("PUT to /api/drivers/id and updates a new driver", done => {
    const testDriver = new Driver({ email: "t@t.com", driving: false });

    testDriver.save().then(() => {
      request(app)
        .put(`/api/drivers/${testDriver._id}`)
        .send({ driving: true, email: "t2@t.com" })
        .end(() => {
          Driver.findById(testDriver._id).then(driver => {
            assert(driver.driving === true);
            assert(driver.email === "t2@t.com");
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers/id and removes a driver from collection", done => {
    const testDriver = new Driver({ email: "t@t.com", driving: false });

    testDriver.save().then(driver => {      
      request(app)
        .delete(`/api/drivers/${testDriver._id}`)
        .end(() => {
          Driver.findById(testDriver._id).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });
});
