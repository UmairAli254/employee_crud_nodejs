"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
require("dotenv").config();
require("./model/connection");
const Mr = require("./model/schema");

// Variables
const publicPath = __dirname + "/public";
const partialsPath = __dirname + "/views/partials";

// Middlewares
app.set("view engine", "hbs");
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))


app.get("", async (req, res) => {
    const all_data = await Mr.find();


    // console.log(all_data);
    // res.send(all_data);
    res.render("all", {
        data: all_data
    })
});

app.get("/employee/new", (req, res) => {
    res.render("new", {
        title: "Register New Emplyee"
    });
});

app.get("/employee/update", (req, res) => {
    res.render("update", {
        title: "Update employee"
    });
})



// CRUD
// Save form data to the database
app.post("/employee/new", async (req, res) => {
    try {
        const data = await new Mr(req.body);
        const ret = await data.save();
        console.log(ret);
        res.status(201).send(ret);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});











app.listen(port, "localhost", () => {
    console.log("Server is running on port", port);
})