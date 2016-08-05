require.config({
	paths: {
		jquery: '../libs/jquery/dist/jquery',
		underscore: '../libs/underscore/underscore',
		backbone: '../libs/backbone/backbone',
		text: '../libs/require/text',
		react: '../libs/react/react',
		models: 'models/all',
		collections: 'collections/all',
		views: 'views/all',
		router: 'router',
		components: '../components/all'
	},
	shim: {
		backbone: {
			deps: [
				"jquery",
				"underscore"
			],
			exports: "Backbone"
		},
		jquery: {
			exports: "$"
		},
		underscore: {
			exports: "_"
		},
		components: {
			deps: [
				'react'
			],
			exports: 'components'
		},
		semantic: {
			deps: [
				'jquery'
			],
			exports: 'semantic'
		}
	}
});
var app;
require(["backbone", "router"], function(Backbone, Router) {
	app = new Router();
	Backbone.history.start();
});