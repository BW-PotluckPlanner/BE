const Potluck = require('../api/potluck/potluck-model.js')

module.exports = function validatePotluckOwner(req, res, next) {
  const { userId } = req.params;
    
  Potluck.getAdminRole(userId)
    .then((user) =>{
        console.log(user)
    if (user.role_id !== 1) {
        res.status(404).json({ message: "Admin only" });
    } else {
        user.role_id = 1;
        next();
    }
})
};