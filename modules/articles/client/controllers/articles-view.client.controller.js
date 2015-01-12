void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesViewController', ArticlesViewController)
	
	/* ngInject */
	function ArticlesViewController($scope, $location, Authentication, article) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesViewController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.article = article
		$scope.ctrl.remove = remove

		///////////////////////////////////////////

		function remove(article) {
			if (article) {
				article.$remove()

				for (var i in $scope.ctrl.articles) {
					if ($scope.ctrl.articles[i] === article) {
						$scope.ctrl.articles.splice(i, 1)
					}
				}
			} else {
				$scope.ctrl.article.$remove(function() {
					$location.path('articles')
				})
			}
		}
	}
})()
