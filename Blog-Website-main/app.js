const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const https = require("https");
const _ = require("lodash"); //used to lowercase complete string and ignore special symbols
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
connectionString = process.env.CONNECTIONSTRING;
mongoose.connect(connectionString, { useNewUrlParser: true });

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus elit tempor, ultricies nunc quis, eleifend odio. Suspendisse a diam aliquam ipsum cursus lacinia. Donec ullamcorper enim iaculis, consequat felis quis, aliquet elit. Pellentesque congue enim ut dictum ornare. Cras sit amet turpis sit amet nunc consectetur ultrices. Proin egestas felis ut lectus sollicitudin imperdiet. Nam eleifend semper leo nec euismod. Phasellus tincidunt mi vel aliquet aliquet. Nunc ornare eros pulvinar, condimentum odio quis, molestie diam. Maecenas ac odio id neque interdum consectetur sed eu magna. Fusce ipsum purus, faucibus a tristique ut, malesuada sit amet urna.";
const contactStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus elit tempor, ultricies nunc quis, eleifend odio. Suspendisse a diam aliquam ipsum cursus lacinia. Donec ullamcorper enim iaculis, consequat felis quis, aliquet elit. Pellentesque congue enim ut dictum ornare. Cras sit amet turpis sit amet nunc consectetur ultrices. Proin egestas felis ut lectus sollicitudin imperdiet. Nam eleifend semper leo nec euismod. Phasellus tincidunt mi vel aliquet aliquet. Nunc ornare eros pulvinar, condimentum odio quis, molestie diam. Maecenas ac odio id neque interdum consectetur sed eu magna. Fusce ipsum purus, faucibus a tristique ut, malesuada sit amet urna.";
const aboutStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus elit tempor, ultricies nunc quis, eleifend odio. Suspendisse a diam aliquam ipsum cursus lacinia. Donec ullamcorper enim iaculis, consequat felis quis, aliquet elit. Pellentesque congue enim ut dictum ornare. Cras sit amet turpis sit amet nunc consectetur ultrices. Proin egestas felis ut lectus sollicitudin imperdiet. Nam eleifend semper leo nec euismod. Phasellus tincidunt mi vel aliquet aliquet. Nunc ornare eros pulvinar, condimentum odio quis, molestie diam. Maecenas ac odio id neque interdum consectetur sed eu magna. Fusce ipsum purus, faucibus a tristique ut, malesuada sit amet urna.";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

// const posts = [];

app.get("/", function (req, res) {
  Blog.find(function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts,
      });
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutStartingContent: aboutStartingContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactStartingContent: contactStartingContent });
});

app.get("/compose", function (req, res) {
  res.render("compose", {});
});

app.post("/home", function (req, res) {
  res.redirect("/compose");
});

app.post("/compose", function (req, res) {
  const post = new Blog({
    title: req.body.blogTitle,
    content: req.body.blogContent,
  });

  post.save();

  res.redirect("/");
});

app.get("/:postId", function (req, res) {
  let postLink = req.params.postId;
  Blog.find(function (err, posts) {
    if (err) {
      console.log(err);
    } else {
      let postContent;
      posts.forEach(function (post) {
        if (_.lowerCase(post.title) === _.lowerCase(postLink)) {
          postContent = post.content;
        }
      });
      res.render("blog", {
        blogTitle: postLink,
        blogContent: postContent,
      });
    }
  });
});

app.listen(port, function () {
  console.log("server is started at port 3000");
});
