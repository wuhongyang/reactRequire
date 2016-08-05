define([
	'react',
	'backbone',
	'models',
	'collections',
	'components'
	],
	function (React, Backbone, models, collections, components) {
		var userC  = require("src/script/collections/users.js");


		var userS = new userC([
			{id: 1, name: 'gaoyuan', avatar: 'src/images/elliot.jpg'},
			{id: 2, name: 'wufang', avatar: 'src/images/stevie.jpg'}
		]);
		var main = Backbone.View.extend({
			tagName: 'div',
			className: 'user-info',
			render: function () {
				this.$el.appendTo($(document.body));

				React.render(new components.users({
						users: this.collection
					}),
					this.$el.get(0)
				);
				return this;
			},
			initialize: function () {
				/*this.collection = models.user = new collections.users([
					{id: 1, name: 'gaoyuan', avatar: 'src/images/elliot.jpg'},
					{id: 2, name: 'wufang', avatar: 'src/images/stevie.jpg'}
				]);*/
				this.collection = userS;
				this.render();
			}
		});

		return main;
	});