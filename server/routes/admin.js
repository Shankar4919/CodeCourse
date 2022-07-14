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


const {
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
} = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({
        email: email
    });
    if (!admin) {
        return res.status(401).json({
            error: "Admin not found"
        });
    }
    bcrypt.compare(password, admin.password, async (err, result) => {
        if (err) {
            return res.status(401).json({
                error: "Password incorrect"
            });
        }
        if (result) {
            const token = jwt.sign({
                id: admin._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
            return res.status(200).json({
                adminToken: token,
            });
        }
        else {
            return res.status(401).json({
                error: "Password incorrect"
            });
        }
    });
});


router.post("/verifyToken",async (req, res) => {
    const { adminToken } = req.body;
    try{
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (admin) {
            return res.status(200).json({
                admin: admin
            });
        }
        else {
            return res.status(401).json({
                error: "Admin not found"
            });
        }
    }
    catch(err){
        return res.status(401).json({
            error: "Invalid token"
        });
    }
});


router.post("/trackDelete", async (req, res) => {
    const { id } = req.body;
    const track = await Track.findById(id);
    if (!track) {
        return res.status(404).json({
            error: "Track not found"
        });
    }
    await cloudinary.uploader.destroy(track.cloudinaryId);
    await Track.findByIdAndDelete(id);
    await Course.updateMany({}, {$pull: {tracks: id}});
    const tracks = await Track.find({});
    return res.status(200).json({
        tracks: tracks
    });
});


router.get("/tracks", async (req, res) => {
    const tracks = await Track.find({});
    return res.status(200).json({
        tracks: tracks
    });
});


router.get("/track/:id", async (req, res) => {
    const { id } = req.params;
    const track = await Track.findById(id);
    if (!track) {
        return res.status(404).json({
            error: "Track not found"
        });
    }
    return res.status(200).json({
        track: track
    });
});

router.put("/track/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    const track = await Track.findById(id);
    if (!track) {
        return res.status(404).json({
            error: "Track not found"
        });
    }
    const { name, description, image } = req.body;
    if(image !== track.image){
        await cloudinary.uploader.destroy(track.cloudinaryId);
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;
        await Track.findByIdAndUpdate(id, {
            name,
            description,
            image: imageUrl,
            cloudinaryId: result.public_id
        });
    }
    else{
        await Track.findByIdAndUpdate(id, {
            name,
            description,
            image
        });
    }
    return res.status(200).json({
        "message": "Track updated successfully"
    });
});


router.post("/addTrack", upload.single("image"), async (req, res) => {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Internal server error"
            });
        }
        const { name, description } = req.body;
        const track = await Track.create({
            name,
            description,
            image: result.secure_url,
            cloudinaryId: result.public_id
        });
        return res.status(201).json({
            track: track
        });
    });
});




module.exports = router;