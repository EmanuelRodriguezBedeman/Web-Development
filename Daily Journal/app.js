const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Logger = require("nodemon/lib/utils/log");
const _ = require('lodash'); // to use _.lowerCase() (see doc)


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        newEntries: posts
    });
});

app.get("/about", function (req, res) {
    res.render("about", {
        aboutContent: aboutContent
    });
});

app.get("/contact", function (req, res) {
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get("/compose", function (req, res) {
    res.render("compose", {});
});

app.get("/posts/:postName", function(req, res) {

    // Variable to hold the user requested post (URL)
    let reqPage = _.lowerCase(req.params.postName);
   
    posts.forEach(function(post) {

        // Variable to hold the title of the current iteration post
        let savedTitle = _.lowerCase(post.title);

        // Print both post to keep better tracking on them
        console.log("Requested Title: " + reqPage);
        console.log("Saved Titles: " + savedTitle);

        // if statement to check if the post are equal
        // if they are, the post page is rendered
        if (reqPage === savedTitle) {
            console.log("Its a Match! Rendering the page...");
            res.render("post", {
                postContent: post
            });
        } else {
            console.log("It's NOT a Match!");
        };
        
        // division bar for each iteration
        console.log("------------------");
    });
});

app.post("/compose", function (req, res) {

    const post = {
        title: req.body.newTitle,
        content: req.body.newText
    };

    posts.push(post);

    res.redirect("/");
})

app.listen(3000, function () {
    console.log(`Server started on http://localhost:${3000}\n`);
});