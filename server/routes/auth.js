import express from "express";

const router =  express.Router();

import { register } from "../controller/auth";

router.get("/register", register);

module.exports = router;

