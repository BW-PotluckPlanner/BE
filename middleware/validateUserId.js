const User = require("../api/auth/auth-model");

module.exports = function validateUserId(req, res, next) {
  const id = req.userId
  console.log(id)
  User.findById(id)
    .then((user) => {
      if (user) {
        req.users = user;
        next();
      } else {
        res.status(404).json({ message: `user ${id} not found.` });
      }
    })
};