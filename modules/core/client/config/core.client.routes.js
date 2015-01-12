'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/articles/views/list-articles.client.view.html',
			controller: 'ArticlesListController',
			resolve: {
				articles: /* ngInject */ function(Articles) {
					return Articles.query().$promise
				}
			}
		});
	}
]);
