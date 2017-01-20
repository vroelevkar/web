// api.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016


var api = new API('/api')

api.clickedKilled = function(name, callback) {
	this.get('clickedKilled', {
		name: name
	}, callback)
}

api.clickedDied = function(name, callback) {
	this.get('clickedDied', {
		name: name
	}, callback)
}

api.resetCircle = function(name, callback) {
	this.get('resetCircle', { name: name }, callback)
}

api.getEmail = function(name, callback) {
	this.get('getEmail', { }, callback)
}

api.sendEmail = function(name, callback) {
	this.get('sendEmail', { }, callback)
}

api.food = function(callback){
	this.get('food', {}, callback)
}

api.createUser = function(name, callback){
	this.post('user', {name:name}, {}, callback)
}

api.createUser = function(name, callback){
	this.post('user', {name:name}, {}, callback)
}

api.createPost = function(options, callback){
	this.post('post', {}, options, callback)
}

api.createPost({title:'Leo hittar fel i min kod', body:'Hej! Jag vill bara meddela att Leo hittar fel i min kod, vilket är väldigt bra för annars skulle inte koden fungera.'}, console.log);

/*api.createUser('erik', function(res){
	console.log(res)
})*/