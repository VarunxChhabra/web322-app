/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Varun Chhabra Student ID: 170279210 Date: 05 Feb 2023
*
*  Cyclic Web App URL: https://tan-giraffe-vest.cyclic.app
*
*  GitHub Repository URL: https://github.com/VarunxChhabra/web322-app
*
********************************************************************************/ 

var express = require("express");
var path = require("path");
var app = express();
const { initialize, getAllPosts, getPublishedPosts, getCategories } = require("./blog-service.js");
var posts = require("./data/posts.json");
var categories = require("./data/categories.json");

app.use(express.static("public"));

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function (req, res) {
  res.redirect("/about");
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/blog", function (req, res) {
  getPublishedPosts().then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send("Error reading data");
  })
});

app.get("/posts", function (req, res) {
  getAllPosts().then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send("Error reading data");
  })
});

app.get("/categories", function (req, res) {
  getCategories().then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send("Error reading data");
  })
});

app.use((req, res) => {
    res.status(404).send("Error 404. Page not found");
});

initialize().then(() => {
  app.listen(HTTP_PORT, onHttpStart);
})
.catch((err) => {
    res.send("Error reading data")
})