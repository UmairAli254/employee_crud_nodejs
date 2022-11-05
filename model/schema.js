"use strict";
const mongoose = require("mongoose");
const validator = require("validator");


const Sr = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(val) {
            if (!validator.isEmail(val))
                throw new Error("Invalid Email");
        }
    },
    address: String,
    phone: {
        type: String,
        minlength: 10,
        maxlength: 11
    },
    gender: String,
    active: Boolean

});

const Mr = mongoose.model("crud", Sr);


module.exports = Mr;