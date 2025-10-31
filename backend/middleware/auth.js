import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // ✅ safer place to store it
    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.json({
      success: false,
      message: "Error verifying token",
      error: error.message,
    });
  }
};

export default authMiddleware;
