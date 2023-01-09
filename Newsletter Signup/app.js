// Requiring mailchimp's module
// Install the npm module 
// npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Use the .env file
require("dotenv").config()
const MAILCHIMP_KEY = process.env.MAILCHIMP_KEY
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER

// Sets the static folder (see app.get comment)
app.use(express.static("public"));

// Fetches the data from the Website
app.use(bodyParser.urlencoded({
    extended: true
}));

// Makes the server listens to a port
app.listen(process.env.PORT || port, function () {
    console.log(`The server launched in http://localhost:${port}`);
});

// Get the request to the server and respond
// This file by itself won't work, because it requires static files (css and images)
// That's why we use express to get those static files from a folder, in this case called "public"
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({
    apiKey: MAILCHIMP_KEY,
    server: MAILCHIMP_SERVER
});

// As soon as the sign in button is pressed execute this
app.post("/", function (req, res) {
    // Requiring parameters
    const firstName = req.body.firstName;
    const secondName = req.body.lastName;
    const email = req.body.email;

    // List ID
    const listId = "a1baf85574";
    
    // Object with user data
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };
    
    // Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        
        // If succeeded 
        res.sendFile(__dirname + "/success.html")
    }
    // Running the function and catching the errors (if any)
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

// Redirect action for the "try again" button:
app.post("/failure", function(req, res){
    res.redirect("/");
});
