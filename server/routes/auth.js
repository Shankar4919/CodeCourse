import express from "express";

const router =  express.Router();

//middleware
import { requireSignin } from "../middlewares";

import { register, login, logout, currentUser } from "../controller/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;

