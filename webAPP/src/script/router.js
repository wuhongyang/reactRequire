define([
	'backbone',
	'views'
	],
	function (Backbone, views) {
		return Backbone.Router.extend({
			routes: {
				'': 'index',
				'carList':'carList'
			},
			index: function () {
				var view = new views.index();
			},
			carList:function(){
				"use strict";
				window.location.href = "src/pages/carList.html"
			}
		});
	});