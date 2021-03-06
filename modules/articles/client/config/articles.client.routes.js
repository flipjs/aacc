'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('articles', {
			abstract: true,
			url: '/articles',
			template: '<ui-view/>'
		}).
		state('articles.list', {
			url: '',
			templateUrl: 'modules/articles/views/list-articles.client.view.html',
			controller: 'ArticlesListController',
			resolve: {
				articles: /* ngInject */ function(Articles) {
					return Articles.query().$promise
				}
			}
		}).
		state('articles.create', {
			url: '/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html',
			controller: 'ArticlesCreateController'
		}).
		state('articles.view', {
			url: '/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html',
			controller: 'ArticlesViewController',
			resolve: {
				article: /* ngInject */ function($stateParams, Articles) {
					return Articles.get({ articleId: $stateParams.articleId }).$promise
				}
			}
		}).
		state('articles.edit', {
			url: '/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html',
			controller: 'ArticlesEditController',
			resolve: {
				article: /* ngInject */ function($stateParams, Articles) {
					return Articles.get({ articleId: $stateParams.articleId }).$promise
				}
			}
		});
	}
]);
