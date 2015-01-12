void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesCreateController', ArticlesCreateController)
	
	/* ngInject */
	function ArticlesCreateController($scope, $stateParams, $location, Authentication, Articles) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesCreateController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.create = create


		///////////////////////////////////////////

		function create() {
			var article = new Articles({
				title: $scope.ctrl.title,
				content: $scope.ctrl.content
			})
			article.$save(function(response) {
				$location.path('articles/' + response._id)

				$scope.ctrl.title = ''
				$scope.ctrl.content = ''
			}, function(errorResponse) {
				$scope.ctrl.error = errorResponse.data.message
			})
		}

	}
})()
