import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";


// user registration
export const register = async (req, res) => {
  try {
    // console.log( req.body ); // this is the body of the request (the data that we are sending to the server from the client)
    const { name, email, password } = req.body;

    //valiation
    if(!name){
        return res.status(400).send("Name is required");
    }
    if(!password || password.length < 6){
        return res.status(400).send("Password is required and must be at least 6 characters");
    }
    let userExist = await User.findOne({ email }).exec();
    if(userExist){
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
    return res.json({ok: true});

  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again");
  }
};
