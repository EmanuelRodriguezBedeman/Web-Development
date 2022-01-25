//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

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
    //*****************************ENTER YOUR API KEY HERE******************************
    apiKey: "26610cfd071b297c52dd4f59b3b3410f-us20",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
    server: "us20"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req, res) {
    //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
    const firstName = req.body.firstName;
    const secondName = req.body.lastName;
    const email = req.body.email;

    console.log(`Name is: ` + firstName + `\nLast name is: ` + secondName + `\nemail is: ` + email);
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "a1baf85574";
    //Creating an object with the users data
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };
    //Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        //If all goes well logging the contact's id
        res.sendFile(__dirname + "/success.html")
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
    }
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

// Redirect action for the "try again" button:
app.post("/failure", function(req, res){
    res.redirect("/");
});

/* Api Key:
26610cfd071b297c52dd4f59b3b3410f-us20 

Audience ID:
a1baf85574
*/