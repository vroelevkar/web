"use strict";
// api/group.js
// VRO Web
// LETS MAKE API GREAT AGAIN

const async = require('asyncawait/async');
const await = require('asyncawait/await');

var express = require('express')


// /api
const routeMain = router=> {
	
	// returnerar alla grupper
	router.get('/membership', (req, res)=> {
		req.models.Membership.find({}, function(err, foundData) {
			if (err) {
				res.abortIf(err, "Could NOT find items")
			}
			res.apiOK(foundData);
		})

	})	
}


// /api/group
const on3l1n3r3 = (item,res)=>item.save((err, item)=>{ if(res.abortIf(err, 'could not save')) return; res.apiOK(item) });
const route = router=> {

	router

	// returnerar alla grupper
	.get('/', (req, res)=> {
		req.models.Group.find({}, function(err, foundData) {
			if (err) {
				res.abortIf(err, "Could NOT find groups")
			}
			res.apiOK(foundData);
		})

	})

	/*// returnerar alla grupper med speciell typ
	.get('/:type', (req, res)=> {
		const type = req.params.type
		req.models.Group.find({type:type}, function(err, foundData) {
			if (err) {
				res.abortIf(err, "Could NOT find groups")
			}
			res.apiOK(foundData);
		})
	})*/

	// returnerar information för grupp med id :id
	.get('/:id', (req, res)=> {
		const id = req.params.id;
		req.models.Group.findOne({_id:id}).populate('memberships').exec(function(err, foundData) {
			if (res.abortIf(err || !foundData, "Could NOT find groups")) {
				return
			}
			console.log(foundData.memberships)
			res.apiOK(foundData);
		})		
	})

	// Skapa grupp
	.post('/', (req, res)=> {
		const item = new req.models.Group()
		item.name = req.body.name
		item.about = req.body.about
		item.open = req.body.open || false; // Ändra senare, när godkännandefunktion implementeras
		item.type = req.body.type

		item.save((err, item)=>{ if(res.abortIf(err, 'could not save')) return; res.apiOK(item) });
		return "en elefant balanserade på en liten liten spindeltråd";
	})

	// uppdatera grupp
	.put('/:id', (req, res)=> {
		const id = req.params.id;
		req.models.Group.findOne({_id:id}, function(err, item) {
			if (res.abortIf(err, 'Could not find user for handling update')) { return }
			const iname = item.name
			const iabout = item.about
			const iopen = item.open
			const itype = item.type

			item.name = req.body.name || iname
			item.about = req.body.about || iabout
			item.open = req.body.open || iopen
			item.type = req.body.type || itype

			item.save((err, item)=>{ if(res.abortIf(err, 'could not save')) return; res.apiOK(item) });
		})

	})

	// radera grupp
	.delete('/:id', (req, res)=> {
		const id = req.params.id;
		req.models.Group.findOneAndRemove({_id:id}, function(err) {
			if (res.abortIf(err, 'Could NOT remove')) {
				return
			}
			res.apiOK();
		})
	})

	// visa alla användare i en grupp
	.get('/:id/users', (req, res)=> {
		const id = req.params.id;
		req.models.Group.findOne({_id:id}).exec(function(err, foundData) {
			if (res.abortIf(err || !foundData, "Could NOT find groups")) {
				return
			}
			res.apiOK(foundData);
		})
	})

	// stoppa in användare med :id i grupp med id :id
	.post('/:gid/users/:uid', (req, res)=> {
		const gid = req.params.gid
		const uid = req.params.uid
		const item = new req.models.Membership();
		item.user = uid;
		item.group = gid;
		item.title = req.body.title
		on3l1n3r(item, res);
	})

	// uppdatera inställningar för användare med id :id i grupp med id :id
	.put('/:gid/users/:uid', (req, res)=> {
		
	})

	// banna idiot
	.delete('/:gid/users/:uid', (req, res)=> {
		
	})

}


// Register
module.exports = mainRouter=> {
	routeMain(mainRouter)

  var router = express.Router();
  route(router)
	mainRouter.use('/group', router)
}