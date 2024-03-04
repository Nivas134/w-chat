const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SSH_SECRET = "use_secrect_key";
let TOKEN = null;
const { ObjectId } = mongoose.Types;

// Middleware to verify JWT token for Authenticated routes.

// create token
const createJsonToken = async (req, res, next) => {
  console.log("from create Jsontoken", req.body.email);
  TOKEN = jwt.sign({ data: req.body.email }, SSH_SECRET, {
    expiresIn: "1h",
  });
  // return token;
  next();
};

const verifyToken = async (req, res, next) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const token = await req.header("Authorization");
  const user = await req.header("user");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = jwt.verify(token, SSH_SECRET);
    console.log(
      "TOKENNNNNNNN-------",
      user,
      decodedToken,
      decodedToken.exp - currentTime,
      "currentTime",
      currentTime,
      "exp time",
      decodedToken.exp
    );
    if (req.user === decodedToken.user && currentTime >= decodedToken.iat) {
      next();
      console.log("HIIIIIII");
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token or Token Expired" });
  }
};

// TODO createJsonToken
router
  .post("/create", createJsonToken, async (req, res, next) => {
    const newUser = new User(req.body);
    // await newUser.friends.push(new ObjectId("655f7c08105da596194e6221"));
    newUser
      .save()
      .then((data) => {
        // newUser.friends.push(new ObjectId("655f7c08105da596194e6221"));
        console.log("New User Created" + data);
        console.log("New user created", TOKEN);
        res.status(200).json({ user: data, token: TOKEN });
      })
      .catch((err) => {
        console.log("Something went wrong while creating new user" + err);
        res
          .status(400)
          .json("Something went wrong while creating new user" + err);
      });
  })

  .get("/", verifyToken, async (req, res, next) => {
    // EXAMPLE populate
    // const popul = await User.findOne({ email: "tyson@gmail.com" })
    //   .populate({ path: "friends", select: "name email password" })
    //   .exec();
    // console.log("POPULATE ---------", popul);
    User.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send("No users found" + err);
      });
  });

// router.get("/", (req, res, next) => {
//   res.json({ message: "Users Home page" });
// });

router.post("/login", createJsonToken, async (req, res, next) => {
  // const currentTimeStamp = Math.floor(Date.now() / 1000);
  const query = User.where({ email: req.body.email });
  query.findOne().then((user) => {
    console.log("User Found", user);
    if (user) {
      res.status(200).json({ user, token: TOKEN });
      console.log("TOKEN---", TOKEN);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  });
});

module.exports = router;
