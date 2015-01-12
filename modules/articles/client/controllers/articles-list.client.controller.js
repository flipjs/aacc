void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesListController', ArticlesListController)
	
	/* ngInject */
	function ArticlesListController($scope, $stateParams, $location, Authentication, Articles) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesListController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.articles = []
		$scope.ctrl.find = find

		activate()

		///////////////////////////////////////////

		function activate() {
			$scope.ctrl.find()
		}

		function find() {
			$scope.ctrl.articles = Articles.query()
		}

	}
})()
