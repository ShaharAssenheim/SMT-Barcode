const express = require("express");
const router = express.Router();
const Scans = require("../models/Scans");

//Getting all Scans.
router.get("/", async (req, res) => {
  try {
    const scans = await Scans.find();
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one Scan
router.get("/:id", getScan, (req, res) => {
  res.json(res.scans);
});

//Creating Scan
router.post("/", async (req, res) => {
  let UserScan = { ...req.body };
  var d = new Date();
  d = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  
  const scan = new Scans({
    userName: UserScan.userName,
    Send_Date: d,
    Line: UserScan.Line,
  });

  try {
    const newScan = await scan.save();
    res.status(201).json(newScan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update one
router.patch("/:id", getScan, (req, res) => {});

//Update delete
router.delete("/:id", getScan, (req, res) => {});

//middelware
async function getScan(req, res, next) {
  let scan;
  try {
    scan = await Scans.findById(req.params.id);
    if (scan == null)
      return res.status(404).json({ message: "cannot find result" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.scan = scan;
  next();
}

module.exports = router;
