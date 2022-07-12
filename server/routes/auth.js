import express from "express";

const router =  express.Router();

import { register, login, logout } from "../controller/auth";

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

module.exports = router;

