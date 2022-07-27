const express = require("express");
const router = express.Router();
const Alien = require("../models/alien");

router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.send("Error", +err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id); //we are geeting id in url thats why req.param
    res.json(alien);
  } catch (err) {
    res.send("Error", +err);
  }
});
router.post("/save", async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });
  try {
    const a1 = await alien.save();
    // res.json(a1);
    const result = {
      status: 201,
      data: a1,
      msg: "Created!",
    };
    res.json(result);
  } catch (err) {
    res.send("Error", err);
  }
});
router.patch("/update/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    if (req.body.name) {
      alien.name = req.body.name;
    }
    if (req.body.sub) {
      alien.sub = req.body.sub;
    }
    if (req.body.tech) {
      alien.tech = req.body.tech;
    }
    const a1 = await alien.save();
    const result = {
      status: 200,
      data: a1,
      msg: "Updated!",
    };
    res.json(result);
  } catch (err) {
    res.send("Error", +err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    console.log(alien);
    const a1 = await alien.remove();
    //res.json(a1);
    const result = {
      status: 200,
      data: a1,
      msg: "Deleted!",
    };
    res.json(result);
  } catch (err) {
    res.send("Error");
  }
});
module.exports = router;
