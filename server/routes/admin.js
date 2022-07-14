const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Admin = require("../models/admin.model");
const Track = require("../models/track.model");
const Course = require("../models/course.model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);



const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: "Internal server error",
            });
        } else {
            try {
                const admin = await Admin.create({
                    name,
                    email,
                    password: hash
                });
                return res.status(201).json({
                    token: admin._id,
                });
            } catch (err) {
                return res.status(409).json({
                    error: "Email already exists"
                });
            }
        }
    });
});

module.exports = router;