const Potluck = require('../api/potluck/potluck-model.js')

module.exports = async function validatePotluckOwner(req, res, next) {
  const { userId } = req.params;

  const user_id = {userId}

  const role = await Potluck.getAdminRole(user_id);
  console.log(role)

  if (role !== 1) {
    res.status(404).json({ message: "Admin only" });
  } else {
    role_id = 1;
    next();
  }
};