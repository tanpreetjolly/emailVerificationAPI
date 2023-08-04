const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) {
    return res
      .status(400)
      .json({ message: "Invalid request. Missing userId or token." });
  }

  const secret = userId + process.env.JWT_SECRET_KEY;
  try {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(404).json({ message: "Invalid Request" });
      } else {
        return res.status(200).json({ message: "User is verified." });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error occurred while verifying",
    });
  }
};

module.exports = verifyToken;
