const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.access_token;
  console.log(token);
  const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
  console.log(verifiedUser);
  if (verifiedUser.role === "admin") next();
  else res.status(401).send("Unauthorized Access");
};
