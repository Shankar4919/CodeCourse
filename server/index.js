require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

const app = express();

mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("** Database Connected **");
}).catch(err=>{
  console.log("** Database Connection Error **", err);
})

app.use(cors());
app.use(express.json());

// const dbUrl =
//   "mongodb+srv://shankar:" +
//   process.env.MONGO_PASSWORD +
//   "@cluster0.utdn1ci.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(dbUrl, { useNewUrlParser: true });



app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
