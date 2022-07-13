import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
  getToken: req => req.cookies.token,
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
  

});
