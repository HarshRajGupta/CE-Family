const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const uri = "mongodb+srv://Batch_Mates:GB6PBk0LQXMIaz25@cluster0.h5bv1.mongodb.net/Branch-data?retryWrites=true&w=majority";
const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

var un = "";

let psd;

app.use(cookieParser());

var key = "CE-Family";

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html");
});

app.get("/login", function(req, res) {
    if (req.cookies["Login Key"] === key) {
        res.redirect("/home");
    } else {
        res.sendFile(__dirname + "/Files/username.html");
    }
});

app.post("/login", function(req, res) {
    if (req.body.button === "username") {
        un = req.body.username;
        if (un.substr(0, 5) === "b5200") {
            res.sendFile(__dirname + "/Files/password.html");
        } else {
            console.log("Traitor Spotted");
            res.sendFile(__dirname + "/error.html");
        }
    } else if (req.body.button === "password") {

        User.findOne({ username: un }, function(err, psd) {
            if (err) {
                console.log(err);
            } else {
                console.log(psd);
                if (req.body.password === psd.password) {
                    res.cookie("Login Key", "CE-Family");
                    username = "";
                    res.redirect("/home");
                } else {
                    console.log("Traitor Spotted")
                    res.sendFile(__dirname + "/error.html");
                }
            }

        })
    } else {
        console.log("Traitor Spotted")
        res.sendFile(__dirname + "/error.html");
    }
})

app.get("/register", function(req, res) {
    if (req.cookies["Login Key"] === key) {
        res.redirect("/home" );
    } else {
        res.sendFile(__dirname + "/Files/register.html");
    }
});

app.post("/register", function(req, res) {
    un = req.body.username;
    if (un.substr(0, 5) === "b5200") {
        pwd = req.body.password;
        if (pwd === req.body.pwd) {

            var el = req.body.email;
            var ne = req.body.name;

            var user = new User({
                name: ne,
                username: un,
                email: el,
                password: pwd
            })
            user.save();
            un = "";
            res.cookie("Login Key", "CE-Family");
            res.redirect("/home");
        } else {
            console.log("password not same");
            res.redirect("/register");
        }
    } else {
        console.log("Traitor Spotted")
        res.sendFile(__dirname + "/error.html")
    }
})

app.get("/home", function(req, res) {
    if (req.cookies["Login Key"] === key) {
        res.sendFile(__dirname + "/Files/home.html");
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
});

app.get("/time-table", function(req, res) {
    if (req.cookies["Login Key"] === key) {
        res.sendFile(__dirname + "/Files/time.html");
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
})

app.get("/notice", function(req, res) {
    if (req.cookies["Login Key"] === key) {
        res.sendFile(__dirname + "/Files/notice.html");
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
})

app.get("/logout", function(req, res) {
    res.clearCookie("Login Key");
    res.sendFile(__dirname + "/Files/logout.html");
});

app.get("/friends", function(req, res) {
    res.sendFile(__dirname + "/loading.html");
})

app.get("/forgotPassword", function(req, res) {
    res.sendFile(__dirname + "/Files/forgotPassword.html");
});

app.get("/css", function(req, res) {
    res.sendFile(__dirname + "/Files/style.css");
})

var port = process.env.PORT || 2202;
app.listen(port, function() {
    console.log("Listening to the port " + port);
});