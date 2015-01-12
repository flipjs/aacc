void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesEditController', ArticlesEditController)
	
	/* ngInject */
	function ArticlesEditController($scope, $location, Authentication, article) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesEditController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.article = article
		$scope.ctrl.update = update

		function update() {
			var article = $scope.ctrl.article

			article.$update(function() {
				$location.path('articles/' + article._id)
			}, function(errorResponse) {
				$scope.ctrl.error = errorResponse.data.message
			})
		}
	}
})()
