const express = require('express');
const dbConfig = require('../../data/dbConfig.js');

const Invite = require('./invite-model')

const router = express.Router()


router.get("/:code", (req, res) => {
    const { code } = req.params;

    Invite.findByCode(code)
      .then((invite) => {
        if (invite.isValid === false) {
          console.log("INVALID");
          res.status(406).json({ message: "Code is INVALID", potluck_id: -1 });
        } else {
          res.status(200).json({ potluck_id: invite.potluck_id });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: `Could not find invite code ${code}.`, error: err })
      );
  });

module.exports = router