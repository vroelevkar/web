"use strict";
// api/entity.js
// VRO Web

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {}


// /api/entity
const route = router=> {


}


// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)

  var router = express.Router();
  route(router)
	mainRouter.use('/entity', router)
}