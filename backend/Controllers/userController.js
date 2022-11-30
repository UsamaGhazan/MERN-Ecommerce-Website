import User from '../Models/UserModel.js';
import generateToken from '../utils/generateTokens.js';
import asyncHandler from 'express-async-handler'; //to avoid try catch
import { StatusCodes } from 'http-status-codes';
//Auth user and get token
//Public Route
//login koi b kr sakta hy jiska email aur password store hy database mein is leye ye public route hy
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //same as {email:email}...email sy user find kr rahy
  //userModel k andr method banaya hy jismein ye value pass kr rahy hein
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), //Step 2: We are sending token to frontend
    });
  } else {
    //Agr user present ni hy
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error('Invalid email or password');
  }
});

//Register a new user
//Public Route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; //ye 3no chezein hum user sy lena chahty hein
  const userExists = await User.findOne({ email }); //agr user pehly hi exist karta hy
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //create user
  const user = await User.create({ name, email, password });
  console.log(user);

  //if user is created
  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), //registration k bad authenticate karna chahty hein user kos
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Invalid user data');
  }
});

//Get User Profile
//Private Route
//User apni profile sirf logged in honay k bad dekh sakta hy na k har koi access kar ly is leye ye private route hy
const getUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const user = await User.findById(req.user._id); //will give current logged in user
  //agr user hy
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('User not found');
  }
});

//Update User Profile
//Private Route
const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const user = await User.findById(req.user._id); //will give current logged in user
  if (user) {
    user.name = req.body.name || user.name; //agr req.body.name mein ni hy to mtlb k user ny name update nai kea is leye wo purana wala hi rakh dea
    user.email = req.body.email || user.email;
    //Agr password hy to ye karo... agr password modify ho to userModel mein jo pre function hy wo run hoga aur uski waja sy password b automatically encrypt hojayega
    if (req.body.password) {
      user.password = req.body.password;
    }

    //pehly information ko save kary ga phir response send kary ga
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id), //Step 2: We are sending token to frontend
    });
  } else {
    res.status(StaticRange.NOT_FOUND);
    throw new Error('User not found');
  }
});

//Get All Users
//Private Route/Admin
const getUsers = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const users = await User.find({}); //will give all users
  res.json(users);
});

//Delete User
//Private Route/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.statusCode.NOT_FOUND;
    throw new Error('User not found');
  }
});

//Get User By Id
//Private Route/Admin
const getUserById = asyncHandler(async (req, res) => {
  // console.log(req.user);
  //password ni chaiye frontend pr is lye usy nikal dea
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.statusCode.NOT_FOUND;
    throw new Error('User not found');
  }
});

//Update User
//Private Route/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name; //agr req.body.name mein ni hy to mtlb k user ny name update nai kea is leye wo purana wala hi rakh dea
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    //pehly information ko save kary ga phir response send kary ga
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(StaticRange.NOT_FOUND);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
