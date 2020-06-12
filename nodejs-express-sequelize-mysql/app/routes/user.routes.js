module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);

    // Retrieve all Tutorials sorted desc by email
    router.get("/email", users.sortE);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);

    // Retrieve a single user by email
    //router.get("/:email", users.findByEmail);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };