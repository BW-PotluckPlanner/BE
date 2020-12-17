const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../data/dbConfig.js');
const restrict = require("../../middleware/restricted-endpoint")

const router = require('express').Router();

const Users = require('../auth/auth-model')

const checkForUser = async (req, res, next) => {
  try {
    let username = req.body.username;
    if (username) {
      const user = await Users.findBy(username);
      if (user) { req.userExists = true; req.user = user }
      else { req.userExists = false; }
      console.log("this is user: ", user)
      next();
    }
    else {
      res.status(400).json({message: "error: you must provide a username"})
    }
  }
  catch (error) {
    throw error;
  }
}

router.get("/", restrict, (req, res) => {
  Users.find()
        .then(users => {
              res.json(users);
        })
        .catch(err => res.send(err));
});

router.post('/register', checkForUser, async (req, res) => {
  
  if (req.userExists) {
    res.status(400).json({ message: "username taken" })
  } else {
    let {username, password } = req.body;
      if (!username && !password ) {
        res.status(401).json({ error: "username and password required"});
      } else {
        try {
          const rounds = process.env.BCRYPT_ROUNDS;
          const hash = bcryptjs.hashSync(password, rounds)
          const saved = { username, password: hash }
          const addUser = await Users.add(saved)
          const name = await Users.findBy(username)
          const token = jwt.sign({ username }, process.env.JWT_SECRET, {expiresIn: '1d'})
          res.status(201).json({ Welcome: name, token: token })
        } catch (err) {
          console.log(err)
        }
      }
    } 
});


 router.post('/login', checkForUser, async (req,res) => {
    let { username, password } = req.body

    try {
      if (req.userExists) {
        console.log("USER EXISTS:", req.userExists)
        const user = await Users.findBy(username)
        console.log("This is Log IN user: ", user)

        if (username && password) {
          if (bcryptjs.compareSync(password, req.user.password)) {
            const token = jwt.sign({ username: user.username}, process.env.JWT_SECRET, { expiresIn: '1d'})
            res.status(200).json({ message: `welcome, ${req.user.username}`, token })
          } else {
            res.status(401).json({ message: "invalid credentials" })
          }
        } else {
          res.status(400).json({ message: "username and password required"})
        }  
      }  else {
        res.status(400).json({message: "failed to log in: user does not exist"})
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'invalid credentials'})
    }
})


 
module.exports = router;
