void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesListController', ArticlesListController)
	
	/* ngInject */
	function ArticlesListController($scope, Authentication, articles) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesListController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.articles = articles
	}
})()
