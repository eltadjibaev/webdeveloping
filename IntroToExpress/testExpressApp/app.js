var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function (req, res) {
    var sounds = {
        pig: "Oink",
        dog: "Woof Woof!",
        cat: "Moo"
    }
    var animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says " + sounds[animal]);
});


app.get("/repeat/:message/:times", function (req, res) {
    var times = Number(req.params.times);
    var message = req.params.message;
    var result = "";
    for (var i = 1; i < times; i++) {
        result += message + " ";
    };
    res.send(result);
});

app.get("*", function (req, res) {
    res.send("Sorry, page not found ... what are u doing with your life!");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server has started!");
});



