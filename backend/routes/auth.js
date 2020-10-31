const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
  addBookValidation,
} = require("../validation");

const Author = require("../models/Author");
const Book = require("../models/Book");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const emailExists = await Author.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists in the database");
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  const author = new Author({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    age: req.body.age,
    contactnumber: req.body.contactnumber,
  });   

  try {
    const savedUser = await author.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await Author.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  res.send(user._id);
});

router.post("/addbooks", async (req, res) => {
  const { error } = addBookValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    userId: req.body.userId,
    publishedYear: req.body.publishedYear,
    description: req.body.description,
    category: req.body.category,
    totalChapters: req.body.totalChapters,
    chapters: req.body.chapters,
  });

  try {
    const savedUser = await book.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getbooks", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
