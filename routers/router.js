// router.js
// VRO Web

const express = require('express')
const config = require('../config')

const async = require('asyncawait/async');
const await = require('asyncawait/await');


module.exports = (function() {
  var router = express.Router();
  // ---------------------------

  // Array of the routes
  // {page:'name', path:'url-after-/',
  // data:{title:'...'}, fn:function(req,res){}}
  // fn: return false to prevent auto res.render()
  var routes = [
    {page:'', path:'', fn:async (function(req, res) {
      res.redirect('/main');return false;})},
    {page:'login', fn:async (function(req, res, data) {
      if (req.query.error=="incorrect") {
        const messages =
        ["Verkar som att koden inte riktigt stämde... Testa igen?",
        "The code you've entered seems to be invalid. Please try again.",
        "Koden du har angivit är felaktig. Försök igen.",
        "Din kod är ogiltig. Testa en gång till.",
        "Hmm, våra system hittar inte den koden! Skrev du fel?",
        "Fel kod, testa igen!"]
        data.errorMessage = messages[Math.floor(Math.random()*messages.length)]
      } else if (req.query.error)
        data.errorMessage = "Något gick snett: "+req.query.error
    })},
    {page:'', path:'logout', fn:async (function(req, res) {
      req.setLogout();res.redirect('/login');return false;})},
    {page:'main', fn:async (function(req, res, data) {
      if (req.user && req.user.catcher) data.target = req.user.catcher.target
    })},
    {page:'catch', data:{target: 'Erik'}},
    {page:'catch-success'},
    {page:'die', fn:async (function(req, res, data) {
      data.catchCode = await (require('../helpers/catchLogic').initializeCatchCode(req.user))
    })},
    {page:'faq'},
    {path:'emails/catcher-welcome', page:'../emails/catcher-welcome',data:{
      loginCode:'LOGINCODE',name:'NAME',url:config.webURL}},
    {page:'admin', data:{}, fn:async (function(req, res, data) {
      data.name = !req.user ? 'noemail' : req.user.email})},
  ]
  
  // Loop through the routes array and
  // register them with the express router
  for (var i = 0; i<routes.length; i++) {
    var route = routes[i]
    if (!route.path) route.path = route.page

    router.get('/'+route.path, (function(route) {return function(req, res) {async (function(){
      if (!route.data) route.data = {}
      if (route.fn && await (route.fn(req, res, route.data)) === false) return;
      if (!route.data.title) route.data.title = 'Catcher'
      if (!route.data.user) route.data.user = req.user
      route.data.dataPage = route.page
      res.render('catcher/'+route.page, route.data)
    })()}})(route) )
  }

  // -----------
  return router;    
})();