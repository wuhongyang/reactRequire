define([
	'backbone',
	'models',
	'src/script/models/user.js'
	],
	function (Backbone, models,userM) {
		//var userM = require("src/script/models/user.js");
		return Backbone.Collection.extend({
			//model: models.user
			model:userM
		});
	});