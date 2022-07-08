import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true, //remove whitespace
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, // can't have duplicate emails
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  picture: {
    type: String,
    default: "./avatar.png",
  },
  role: {
    type: [String],
    default: ["Suscriber"],
    enum: ["Suscriber", "Instructor", "Admin"], // with enum we have to choose atleast one of the roles
  },
  stripe_account_id: "",
  stripe_seller: {},
  stripeSession:{},
},
{ timestamps: true }       // this will automatically create createdAt and updatedAt fields
);

export default mongoose.model("User", userSchema);

// now we can use the 'User' to easily interact with the mongoDB database
