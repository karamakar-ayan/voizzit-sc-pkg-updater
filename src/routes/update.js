const express = require("express");
const { updatePackages } = require("../aptRunner");
const logger = require("../logger");

const router = express.Router();

router.post("/update", async (req, res) => {
  try {
    const { pkgs } = req.body;
    logger.info("Updating pkgs:", pkgs);

    const output = await updatePackages(pkgs);

    res.json({ success: true, output });
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;