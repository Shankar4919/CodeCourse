import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

// user registration
export const register = async (req, res) => {
  try {
    // console.log( req.body ); // this is the body of the request (the data that we are sending to the server from the client)
    const { name, email, password } = req.body;

    //valiation
    if (!name) {
      return res.status(400).send("Name is required");
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and must be at least 6 characters");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.status(400).send("Email already exists");
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //register user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again");
  }
};

// user login
export const login = async (req, res) => {
  try {
    // console.log(req.body);

    const { email, password } = req.body;

    //validation
    if (!email) {
      return res.status(400).send("Email is required");
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and must be at least 6 characters");
    }

    //find user by email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("User not found");
    }

    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send("Invalid password");
    }

    //create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // return user and token to client, exclude hashed password
    user.password = undefined;
    //send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      //secure:true, // only works on https
    });

    //send user as json response to client
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again");
  }
};

// user logout
export const logout = async (req, res) => {
  try {
    // console.log(req.body);
    res.clearCookie("token");
    return res.json({ message: " Logout Success " });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again");
  }
};

//current user/ verified users
export const currentUser = async (req, res) => {
  // console.log(req.body);
  try {
   
    const user = await User.findById(req.user).exec();
    // console.log("User are", user);
    return res.json({ok:true});
  } catch (err) {
    console.log(err);
  }
};



