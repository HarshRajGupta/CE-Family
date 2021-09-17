const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 2202;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/loading.html");
});

app.get("/forgotPassword", function(req, res) {
    res.sendFile(__dirname + "/register.html");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});
app.post("/forgotPassword",function(req, res){
    res.send("We will contact you as soon as possible")
});
app.post("/", function(req, res) {
	var value = req.body.button;
    if (value === "login") 
    {
        var username = req.body.username;
        var password = req.body.password;
        if (password === username && username.substr(0, 5) === "b5200") 
        {
            res.sendFile(__dirname + "/Files/home.html");
        } 
        else 
        {
            res.sendFile(__dirname + "/error.html");
        }
    }
    else if (value === "home")
    {
    	res.sendFile(__dirname + "/Files/home.html");
    }
    else if (value === "timeTable")
    {
    	res.sendFile(__dirname + "/Files/time.html");
    }
    else if (value === "notice")
    {
    	res.sendFile(__dirname + "/Files/notice.html");
    }
    else if (value === "Logout")
    {
    	res.sendFile(__dirname + "/Files/sucess.html");
    }
    else if (value === "friends")
    {
        res.sendFile(__dirname + "/Files/friends.html");
    }
    else{
        res.sendFile(__dirname + "/loading.html");
    }
});

app.get("#", function(req, res) 
{
    res.sendFile(__dirname + "/loading.html")
})

app.listen(port, function() {
    console.log("Listening to ${port}")
});
