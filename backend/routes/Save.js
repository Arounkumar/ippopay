const express = require("express");
const router = express.Router();
const Model = require("../models/model");

router.post("/save", (req, res) => {
  console.log(req, req.body);
  const data = new Model({
    conditions: req.body.conditions,
    stepsRequired: req.body.stepsRequired,
  });

  saveData(data, res);
  //   res.send({ test: "test" });
});
module.exports = router;

async function saveData(data, res) {
  try {
    const dataToSave = await data.save();
    console.log("dataToSave--", dataToSave);
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
