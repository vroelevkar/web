// helpers/api-model.js
// 
// VRO Web
// Created by Leonard Pauli, jan 2017


var APIModel = function(name, opt) {
	var options = {
		init: function() {},
		save: function(err, data, callback, all) {
			callback(err, data, all)
		}
	}
	if (opt) Object.assign(options, opt)

	var Model = function(jsonOrId) {
		if (typeof jsonOrId == "object")
			Object.assign(this, jsonOrId)
		else this.id = jsonOrId
		options.init.bind(this)()
		return this}

	Model._name = name

	Model.prototype.toJSON = function() {
		return this}
	Model.prototype.save = function(callback) {
		var self = this
		api.post(Model._name+(self.id?'/'+self.id:''), {}, self.toJSON(),
			function(err, data, all) {
			if (err) return options.save.bind(self)(err, data, callback, all)
			options.save.bind(self)(null, data, callback, all)
		}, {}, !self.id? 'POST': 'PATCH')}
	Model.prototype.delete = function(callback) {
		var self = this
		api.delete(Model._name+'/'+id, {}, function(err, data, all) {
			if (err) return callback(err)
			callback()
		})}

	Model.list = function(callback) {
		api.get(Model._name, {}, function(err, data, all) {
			if (err) return callback(err)
			var items = data.map(function(d) {return new Model(d)})
			callback(null, items)
		})}
	Model.load = function(id, callback) {
		api.get(Model._name+'/'+id, {}, function(err, data, all) {
			if (err) return callback(err)
			var item = new Model(data)
			callback(null, item)
		})}

	return Model
}
