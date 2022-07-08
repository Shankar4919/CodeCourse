import express from "express";

const router =  express.Router();

router.get("/register", (req, res) => {
    res.send("This is register page");
});

module.exports = router;

