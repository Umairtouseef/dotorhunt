const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../../modals/User");
const { sanitizeUser, sendMail } = require("../../services/common");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const createUser = async (req, res, next) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async (err, hashedPassword) => {
        if (err) return next(errorResponse("Error hashing password", 500));

        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizeUser(doc), (err) => {
          if (err) return next(errorResponse("Login failed", 400));

          const token = jwt.sign(
            sanitizeUser(doc),
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );

          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          });

          successResponse(
            res,
            "User registered successfully",
            { id: doc.id, role: doc.role },
            201
          );
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = req.user;
    const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .json(
        successResponse(res, "Login successful", {
          id: user.id,
          role: user.role,
        })
      );
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .cookie("jwt", null, { expires: new Date(Date.now()), httpOnly: true })
      .status(200)
      .json(successResponse("Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    if (req.user) {
      res.json(successResponse(res, "User authenticated", req.user));
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
};

const resetPasswordRequest = async (req, res, next) => {
  try {
    console.log("req.body1");

    const { email } = req.body;
    console.log("req.body");
    const user = await User.findOne({ email });

    if (!user) return next(errorResponse("User not found", 400));

    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    const resetPageLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
    const subject = "Reset Password Request";
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to reset your password.</p>`;

    await sendMail({ to: email, subject, html });

    res.json(successResponse(res, "Password reset link sent successfully"));
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;
    const user = await User.findOne({ email, resetPasswordToken: token });

    if (!user) return next(errorResponse("Invalid token or email", 400));

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async (err, hashedPassword) => {
        if (err) return next(errorResponse("Error hashing password", 500));

        user.password = hashedPassword;
        user.salt = salt;
        user.resetPasswordToken = null;
        await user.save();

        const subject = "Password Successfully Reset";
        const html = `<p>Your password has been reset successfully.</p>`;
        await sendMail({ to: email, subject, html });

        res.json(successResponse(res, "Password reset successfully"));
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  logout,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
};
