const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require('lodash');

const app = express();
let port = 3000;

app.listen(process.env.PORT || port, function() {
    console.log("Server started succesfully");
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

// for catching errors
main().catch(err => console.log(err));

// connect to MongoDB by specifying the server port
// if the database doesn't exist, it is created.
async function main() {
    await mongoose.connect('mongodb+srv://<user>:<password>@cluster0.lsmku.mongodb.net/todolistDB');
};

// create a SCHEMA that sets out the fields each document will have and their datatypes
// for each field, inside the brackets, is the validation function that the field has.
const itemsSChema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "ERROR: Please check data entry, no name specified!"]
    },
});

// Creates the model using the schema created before:
const Item = new mongoose.model("Item", itemsSChema);

// Standard documents for the DB:
const item1 = new Item({
    name: "Welcome to your Todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "← Hit this to delete an item."
});

// Constant with all this default items
const defaultItems = [item1, item2, item3];

// CUSTOM ITEMS DB:

// custom items schema:
const listSchema = {
    name: String,
    items: [itemsSChema]
};

// custom items model:
const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {

    const day = date.getDate();

    Item.find(function (err, items) {
        if (err) {
            console.log(err);
        }

        if (items.length === 0) {
            // Adds the default items to the DB:
            Item.insertMany(defaultItems, function (err, docs) {
                if (err) {
                    console.log(err);
                    console.log(docs);
                } else {
                    res.redirect("/");
                }
            });
        } else {
            res.render("list", {
                listTitle: day,
                newListItems: items
            });
        }
    })
});

app.get("/:CustomList", function (req, res) {

    // Variable to hold the requested list:
    let CustomListName = _.capitalize(req.params.CustomList);

    List.findOne({name: CustomListName}, function (err, foundList) {
        if (err) {
            console.log(err);
        } else {
            // Check if the custom list exists:
            if (!foundList) {
                // Creates the custom list: 
                const list = new List({
                    name: CustomListName,
                    items: defaultItems
                })

                list.save();

                res.redirect("/" + CustomListName);

            } else {
                // Show an existing list
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            }
        }
    });
});

// Post request to add another item into the DB:
app.post("/", function (req, res) {

    // Get the name of the item from the input named newItem
    const itemName = req.body.newItem;

    // Get the Title of the list
    const listName = req.body.list;

    // Insert the item name into the DB
    const newItem = new Item({
        name: itemName
    });

    // Gets the day
    const day = date.getDate();

    if (listName === day) {
        // Save it
        newItem.save();

        // Redirect to the same page to refresh it and show the new item
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function (err, foundList) {
            foundList.items.push(newItem);
            foundList.save();

            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", function (req, res) {

    // Saves the item id into a const
    const checkedItemId = req.body.checkbox;

    // Saves the name of the list:
    const listName = req.body.listName;

    // Gets the day
    const day = date.getDate();

    if (listName === day) {

        // Finds the item by it's ID and deletes it
        Item.findByIdAndRemove(checkedItemId, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({
                name: listName
            }, {
                $pull: {
                    items: {
                        _id: checkedItemId
                    }
                }
            },
            function (err, foundList) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/" + listName);
                }
            });
    }
});

// For the about page request
app.get("/about", function (req, res) {
    res.render("about");
});

// To stop the request for a favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());
