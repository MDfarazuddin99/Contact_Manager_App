const express = require("express");
const { registeruser,loginuser,currentuser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register",registeruser);

router.post("/login",loginuser);

router.get("/current",validateToken,currentuser);

module.exports = router;