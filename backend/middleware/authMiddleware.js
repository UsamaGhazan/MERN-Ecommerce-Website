import jwt from 'jsonwebtoken'; //Step 3: Validate the token
import AsyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
//Is user logged in?
const protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; //Bearer ko remove karny k leye
      const verify = jwt.verify(token, process.env.JWT_SECRET); //Token ko yahan decode kea hy... humari secret key ko anay walay token k sath match kea hy...aur decode hokar verify hoa hy aur sath mein id b mili hy
      //   console.log(verify)
      //req.user mein is verified user ko dal rahy hein is leye ab isy sab private routes ki access mil jaeygi
      req.user = await User.findById(verify.id).select('-password'); //wapis client ki taraf to ni bhej rahy ye lekin phir b password ki zaroorat nai hy...user naam ka object bana kar usmein ye bhej rhay
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

//Is User Admin?
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error('Not authorized as an Admin');
  }
};

export { protect, admin };
