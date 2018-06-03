const DriversController = require("../controllers/driversController");

module.exports = app => {  
  app.get("/api", DriversController.greeting);
  app.post("/api/drivers", DriversController.create);
  app.put("/api/drivers/:id", DriversController.update);
  app.delete("/api/drivers/:id", DriversController.delete);
};
