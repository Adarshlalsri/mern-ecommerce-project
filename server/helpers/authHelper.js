import bcrypt from "bcrypt";

// 🔐 Hash password
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
  } catch (error) {
    console.log("Error in hashing password:", error);
    throw error;
  }
};

// 🔍 Compare password
export const comparePassword = async (enteredPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  } catch (error) {
    console.log("Error in comparing password:", error);
    return false;
  }
};
