const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res) {
    const driverProps = req.body;

    // const driver = new Driver(driverProps);
    // driver.save().then(driver => res.send(driver));
    Driver.create(driverProps).then(driver => res.send(driver));
  }
};
