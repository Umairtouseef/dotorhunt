const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");
const { sanitizeUser } = require("../../services/common");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const createUser = async (req, res, next) => {
  try {
    const { email, password, ...rest } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "Email already in use", 400);
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return next(new Error("Internal server error"));
        }

        try {
          const user = new User({
            email,
            password: hashedPassword,
            salt,
            ...rest,
          });
          const savedUser = await user.save();

          return successResponse(res, "User created successfully", {
            id: savedUser.id,
            role: savedUser.role,
          });
        } catch (saveError) {
          console.error("Error saving user:", saveError);
          return next(new Error("Error saving user to the database"));
        }
      }
    );
  } catch (err) {
    console.error("Error creating user:", err);
    return next(new Error("Bad request"));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    
    const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    req.login(user, { session: true }, (err) => {
      if (err) {
        console.error("Error creating session:", err);
        return next(new Error("Login failed"));
      }

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      return successResponse(res, "Login successful", {
        id: user.id,
        role: user.role,
        token,
      });
    });
  } catch (error) {
    console.error("Login failed:", error);
    return next(new Error("Login failed"));
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .cookie("jwt", null, { expires: new Date(Date.now()), httpOnly: true })
      .status(200)
      .send("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
    return next(new Error("Logout failed"));
  }
};

const checkAuth = async (req, res, next) => {
  try {
    if (req.user) {
      return successResponse(res, "User authenticated", req.user);
    }
    return errorResponse(res, "Unauthorized", 401);
  } catch (error) {
    console.error("Error checking authentication:", error);
    return next(new Error("Authentication error"));
  }
};

module.exports = {
  createUser,
  loginUser,
  logout,
  checkAuth,
};
