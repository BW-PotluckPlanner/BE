const Potluck = require('../api/potluck/potluck-model.js')

module.exports = async function validatePotluckOwner(req, res, next) {
  const { userId } = req.params;

  const user_id = {userId}
    console.log(user_id)
  const role = await Potluck.getAdminRole(user_id);
  if (role.role_id !== 1) {
    res.status(404).json({ message: "Admin only" });
  } else {
    req.potluck_members.role_id = 1;
    next();
  }
};