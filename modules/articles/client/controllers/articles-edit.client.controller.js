void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesEditController', ArticlesEditController)
	
	/* ngInject */
	function ArticlesEditController($scope, $stateParams, $location, Authentication, Articles) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesEditController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.article = {}
		$scope.ctrl.findOne = findOne
		$scope.ctrl.update = update

		activate()

		///////////////////////////////////////////

		function activate() {
			$scope.ctrl.findOne()
		}

		function update() {
			var article = $scope.ctrl.article

			article.$update(function() {
				$location.path('articles/' + article._id)
			}, function(errorResponse) {
				$scope.ctrl.error = errorResponse.data.message
			})
		}

		function findOne() {
			$scope.ctrl.article = Articles.get({
				articleId: $stateParams.articleId
			})
		}
	}
})()
