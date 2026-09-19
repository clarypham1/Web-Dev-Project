//const User = require("../models/userModel.js");
import User from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({

      message: "Could not getAllUsers",
      error: error.message
    })
  } 
  
};


const createUser = async (req, res) => { 
  try {
    const { email, name, username, password } = req.body;
    const newUser = await User.create({ email, name, username, password });

    //then we senddd to postman/fe
    res.status(201).json(newUser);
  }
  catch (error){
    res.status(400).json({
      message: "Could not createUser",
      error: error.message
    })
  }
};


/*    if (newUser) {
    res.status(201).json(newUser);    // i don't think this error part is necessary but will leave it for now
  } else {
    res.status(500).json({ message: "Failed to create user" });
  }*/

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
  catch (error) {
    res.status(400).json({
      message: "Could not getUserById",
      error: error.message
    })
  }
  
};

const updateUser = async (req, res) => {
  
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    
    //findbyidandupdate is mongooses own function
    const updatedUser = await User.findByIdAndUpdate(
    userId,
    updatedData,
    {
      new: true,
      runValidators: true
    }
    );

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  catch (error) {
    res.status(400).json({
      message: "Could not updateUser",
      error: error.message
    })
  }
  
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    //once again mongoose built-in function:
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) { //if (we found and deleted user)
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
    }

    catch (error) {
      res.status(400).json({
      message: "Could not deleteUser",
      error: error.message
    })
    }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
