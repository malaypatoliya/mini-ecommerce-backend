const { verifyJwt } = require("../utils/jwt");

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const authToken = authHeader.split(" ")[1];

    const decoded = verifyJwt(authToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  isAuth,
};
