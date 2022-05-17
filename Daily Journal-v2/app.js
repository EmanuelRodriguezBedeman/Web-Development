const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Logger = require("nodemon/lib/utils/log");
const _ = require('lodash'); // to use _.lowerCase() (see doc)
const mongoose = require("mongoose"); // require the mongoose package

let port = 3000;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.listen(process.env.PORT || 3000, function () {
    console.log(`The server launched in http://localhost:3000`);
});

// for catching errors
main().catch(err => console.log(err));

// connect to MongoDB by specifying the server port
// if the database doesn't exist, it is created.
async function main() {
    await mongoose.connect('mongodb+srv://<admin>:<password>@cluster0.lsmku.mongodb.net/PostsDB');
};

// Creates the schema of the DB
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "ERROR: Title entry is empty, please fill it."]
    },
    content: String
});

// Creates a new model for the DB
const Post = new mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {

    Post.find(function(err, post) {
        if (err) {
            console.log(err);
        } else {
            // Renders the page with the content of the DB
            res.render("home", {
                startingContent: homeStartingContent,
                newEntries: post
            });
        }
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

// Routing of /compose
app.route("/compose")

    .get(function (req, res) {
        res.render("compose", {});
    })

    .post(function (req, res) {

        let newTitle = req.body.newTitle
        let newContent = req.body.newText
    
        const newPost = new Post({
            title: newTitle,
            content: newContent
        });
    
        newPost.save(function(err){
            if (!err) {
                res.redirect("/");
            };
        });
    });
    
app.get("/posts/:postId", function(req, res) {

    // Variable to hold the user requested post (URL)
    let postID = req.params.postId;

    Post.findOne({_id: postID}, function(err, post) {

        if (err) {
            console.log(err);
        } else {
            res.render("post", {postInfo: post})
        }
    });
});

app.post("/delete", function (req, res) {

    entryID = req.body.deleteButton;

    Post.findByIdAndRemove(entryID,function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });

});

// To stop the request for a favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get("/favicon.ico", function (req, res) {
    res.send("working");
});
