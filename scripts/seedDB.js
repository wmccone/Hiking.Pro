const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Posts collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hikingpro");

const userSeed = [
  {
    username: "TheRock",
    email: "rock@therock.com",
    password: "password123",
    location: "Dallas",
    points: 40
  },
  {
    username: "SteveBuscemi",
    email: "steve@buscemi.com",
    password:"password123",
    location:"Chicago",
    points: 0
  },
  {
    username: "Yoda",
    email: "yoda@theforce.com",
    password: "123password",
    location: "Austin",
    points: 20
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });