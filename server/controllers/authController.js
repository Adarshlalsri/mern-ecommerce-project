import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

//Register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//Post Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "Email is not registered",
      });
    }
    // password match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Paswword",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// forgot password

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    //validations
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!answer) return res.status(400).send({ message: "Answer is required" });
    if (!newPassword)
      return res.status(400).send({ message: "New password is required" });

    // Find user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    //  Hash new password
    const hashed = await hashPassword(newPassword);

    //  Update password
    await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });

    // Success response
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// test Controller
export const testController = (req, res) => {
  res.send("protexted routes");
};

//update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Find the user by ID
    const user = await userModel.findById(req.user._id);

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 chracter long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        email: email || user.email,
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

//orders
// 🟢 Get Orders (User Specific)
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "name description price") // ✅ fixed
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error in getOrdersController:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching user orders",
      error: error.message,
    });
  }
};

//All orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo") // ✅ fixed
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error in getAllOrdersController:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching all orders",
      error: error.message,
    });
  }
};

//orderStatusController
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating orders",
      error: error.message,
    });
  }
};
