const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb+srv://Batch_Mates:GB6PBk0LQXMIaz25@cluster0.h5bv1.mongodb.net/Branch-data?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    info: String
});

var noticeHeading = ["Reopen the College", "Mask Bunk Tommorow", "Event on 21st"];
var noticeBody = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat',
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat",
];

var event = [];

const User = mongoose.model("User", userSchema);

const key = "CE-Family";

var _username = "";
var _uid = "";

app.get("/", function (req, res) {
    res.render("mainpage", { pg: "home" })
});

app.get("/login", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.redirect("/home");
    } else {
        res.clearCookie("Login Key");
        res.clearCookie("uid");
        res.render("login", { typ: "username", pg: "l" });
    }
});

app.post("/login", function (req, res) {
    if (req.body.button === "username") {
        _username = req.body.username;

        if (_username === "Master Key") {
            res.cookie("Login Key", "CE-Family");
            username = "";
            res.redirect("/home");
        } else if (_username.substr(0, 5) === "b5200") {
            res.render("login", { typ: "password", pg: "l" });
        } else {
            console.log("Traitor Spotted");
            res.redirect("/");
        }
    } else if (req.body.button === "password") {

        User.findOne({ username: _username }, function (err, userdata) {
            if (err) {
                console.log(err);
            } else {
                console.log(userdata);
                if (req.body.password === userdata.password) {
                    res.cookie("uid", userdata);
                    res.cookie("Login Key", "CE-Family");
                    username = "";
                    res.redirect("/home");
                } else {
                    console.log("Traitor Spotted")
                    res.redirect("/");
                }
            }
        })
    } else {
        console.log("Traitor Spotted")
        res.redirect("/");
    }
});

app.get("/register", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.redirect("/home");
    } else {
        res.clearCookie("Login Key");
        res.clearCookie("uid");
        res.render("register", { pg: "r" });
    }
});

app.post("/register", function (req, res) {
    _username = req.body.username;
    if (_username.substr(0, 5) === "b5200" && _username.length === 7) {
        if (req.body.password === req.body.pwd) {
            var user = new User({
                name: req.body.name,
                username: _username,
                email: req.body.email,
                password: req.body.password
            })
            user.save();
            _username = "";
            res.cookie("Login Key", "CE-Family");
            res.cookie("uid", user);
            res.redirect("/home");
        } else {
            console.log("password not same");
            res.redirect("/register");
        }
    } else {
        console.log("Traitor Spotted")
        res.redirect("/");
    }
});

app.get("/home", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.render("home", { pg: "home" });
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
});

app.get("/time-table", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.render("time", { pg: "tt" });
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
});

app.get("/notice", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.render("notice", { hd: noticeHeading, bd: noticeBody, pg: "n" });
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
});

app.get("/edit-notice", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        _uid = req.cookies["uid"];
        if (_uid.username === "b520051" || _uid.username === "b520015" || _uid.username === "b5200") {
            res.render("edit", { pg: "" })
        } else {
            res.redirect("notice");
        }
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
});

app.post("/edit-notice", function (req, res) {
    noticeHeading.push(req.body.hd)
    noticeBody.push(req.body.bd)
    while (noticeHeading.length > 10) {
        noticeHeading.shift();
    }
    while (noticeBody.length > 10) {
        noticeBody.shift();
    }
    res.redirect("notice");
})


app.get("/to-do-list", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.render("to-do", { task: event, pg: "list" });
    } else {
        console.log("Login to See Edit");
        res.redirect("/login");
    }
});


app.get("/edit-list", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        _uid = req.cookies["uid"];
        if (_uid.username === "b520051" || _uid.username === "b520015" || _uid.username === "b5200") {
            res.render("edit-list", { pg: "" })
        } else {
            res.redirect("time-table");
        }
    } else {
        console.log("Login to See details");
        res.redirect("/login");
    }
});

app.post("/edit-list", function (req, res) {
    var evt = {
        head: req.body.hd,
        body: req.body.dd
    }
    event.push(evt);
    res.redirect("to-do-list");
})


var today = new Date();
if (today.getHours === 23 && today.getMinutes === 59) {
    for (var i = 0; i < event.length; i++) {
        event[i].body--;
    }
}

app.get("/update", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        res.render("update-info", { pg: "" });
    } else {
        console.log("Login to See Edit");
        res.redirect("/login");
    }
});

app.post("/update", function (req, res) {
    if (req.cookies["Login Key"] === key) {
        _uid = req.cookies["uid"];
        User.updateOne({ username: _uid.username }, {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            info: req.body.info
        }, function (err) {
            if (err) {
                console.log(err);
                res.redirect("/");
            }
            else {
                console.log("Sucessfully updated all the changes");
                res.redirect("/home");
            }
        })
    } else {
        console.log("Login to See Edit");
        res.redirect("/login");
    }
});


app.get("/logout", function (req, res) {
    res.clearCookie("Login Key");
    res.clearCookie("uid");
    res.render("logout", { pg: "lo" });
});

app.get("/friends", function (req, res) {
    res.sendFile(__dirname + "/loading.html");
});

app.get("/css", function (req, res) {
    res.sendFile(__dirname + "/Files/style.css");
});

var port = process.env.PORT || 2202;
app.listen(port, function () {
    console.log("Listening to the port " + port);
});
