const Potluck = require("../api/potluck/potluck-model.js");

module.exports = function validatePotluckId(req, res, next) {
  const { id } = req.params;
  Potluck.findById(id)
    .then((potluck) => {
      if (potluck) {
        req.potluck = potluck;
        next();
      } else {
        res.status(404).json({ message: `potluck ${id} not found.` });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: `Failed to get potluck ${id} from database.`,
        error: err,
      })
    );
};