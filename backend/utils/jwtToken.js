export const sendToken = (user, statusCode, res, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d", // Token is valid for 7 days
  });

  const options = {
    httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript (for security)
    secure: process.env.NODE_ENV === "production", // Cookie is secure in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site handling
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};
