const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Database/user_model.js");

//SIGNUP
router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check("password", "Password should be of length 6 or more").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { firstName, lastName, email, password, roles } = req?.body;
    try {
      //Check for error
      const errors = validationResult(req);

      //Create a json for errors if there are any
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      //Check for the user in the database
      const checkEmail = await User.findOne({ email: email });
      if (checkEmail) {
        return res.status(400).send("Email already exists");
      } else {
        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 1);

        // Creating an new user
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          role: roles,
          email: email,
          password: hashedPassword,
        });

        //Saving the user
        const newUser = await user.save();
        const { role, _id } = newUser;

        //create a token
        const token = jwt.sign(
          { email, firstName, lastName, role: role, id: _id },
          process.env.SECRET_KEY,
          {
            expiresIn: 360000,
          }
        );

        res.json({
          token,
        });
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email: email });
  if (!validUser) {
    return res.status(400).send("Please signup first");
  } else {
    const { firstName, lastName, role, isActive, _id } = validUser;
    //Checking for the same password
    const isMatch = await bcrypt.compare(password, validUser.password);

    if (!isMatch) {
      return res.status(400).send("Invalid Password");
    } else {
      const token = jwt.sign(
        {
          email,
          firstName,
          lastName,
          role,
          isActive,
          id:_id
        },
        process.env.SECRET_KEY,
        {
          expiresIn: 360000,
        }
      );

      res.json({
        token,
      });
    }
  }
});

module.exports = router;
