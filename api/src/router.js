const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).send({ response: "Server is up and running." });
});

module.exports = router;
