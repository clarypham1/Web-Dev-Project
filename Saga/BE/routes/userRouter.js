import express from "express";

const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // patchUser
} from "../controllers/userController";
 
// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.put("/:userId", updateUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);


// This could be used in change password 
// Update user using PATCH 
// router.patch('/:userId', patchUser)

export default router;


