const userService = require("../services/users.service");
const { signJwt } = require("../utils/jwt");
const {
  loginSchema,
  registerUserSchema,
} = require("../validators/auth.validator");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const data = {
      uuid: existingUser.uuid,
      email: existingUser.email,
    };

    const result = signJwt(data);

    return res.status(200).json({
      message: "Login successful",
      data: {
        uuid: existingUser?.uuid,
        name: existingUser?.name,
        email: existingUser?.email,
        auth_token: result,
      },
    });
  } catch (error) {
    console.log("Error in loginUser: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, name } = req.body;
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({
      email,
      password: hashedPassword,
      name,
    });
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error in registerUser: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
