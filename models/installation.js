"use strict";
// Installation.js
// VRO Web
// MADE BY THE GREAT JACOB TILLY, LETS MAKE API GREAT AGAIN

const mongoose = require('mongoose')
const dbRef = require('../helpers/helpers').mongooseRef

// Create schema
const Schema = new mongoose.Schema({
	platform: String,
	token: String,
	user: dbRef('User')
}, {timestamps: true});

// Register schema
module.exports = mongoose.model('Installation', Schema);