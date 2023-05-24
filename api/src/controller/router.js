const router = require("express").Router();

const deployDate = new Date();
router.get("/", (req, res) => {
  return res.status(200).send({ response: "Server is up and running", deployDate });
});

module.exports = router;
