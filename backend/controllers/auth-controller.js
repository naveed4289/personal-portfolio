const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const express = require("express");
const User = require("../models/user-model");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Home
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Registration Controller
const Register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    
    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create the new user
    const userCreated = await User.create({ username, email, password, phone });
    res.status(201).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      res.status(200).json({
        msg: "Login successfully",
        token: await user.generateToken(),
        userId: user._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

 

// User Data Controller
const user = async (req, res) => {
  try {
    const userData = req.user;
    // const userData = req.user || { username: 'Guest', role: 'Visitor' };
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSingleUser=async(req,res,next)=>{
  try {
      const id = req.params.id;
      const data=await User.findOne({_id:id},{password:0})
      return res.status(200).json({ data });
  } catch (error) {
      next(error);
  }
}
//most important code
// const updateUserById = async (req, res, next) => {
//   try {
//       const id = req.params.id;
//       const updateUserData = req.body;
//       const updatedData = await User.updateOne({ _id: id }, { $set: updateUserData });

//       if (updatedData.modifiedCount === 0) {
//           return res.status(404).json({ message: "User not found or no changes made" });
//       }

//       return res.status(200).json({ updatedData });
//   } catch (error) {
//       next(error);
//   }
// };

const updateUserById = async (req, res, next) => {
  try {
      const id = req.params.id;
      const { password, ...updateUserData } = req.body;

      
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

     
      if (password) {
          
          const hashedPassword = await bcrypt.hash(password, 10);
          updateUserData.password = hashedPassword;
      }

      
      const updatedUser = await User.findByIdAndUpdate(id, { $set: updateUserData }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found or no changes made' });
      }

      
      if (password) {
          const token = await updatedUser.generateToken();
          return res.status(200).json({ message: 'User updated successfully', token });
      }

      return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
      next(error);
  }
};



const forgotPassword= async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body; 
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);  // Fixed typo
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });  // Updating hashed password
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    return res.json({ message: "Invalid or expired token" });
  }
};

module.exports = { Register, Login, home, user, getSingleUser, updateUserById,forgotPassword,resetPassword };