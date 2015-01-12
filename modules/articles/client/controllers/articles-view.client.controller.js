void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesViewController', ArticlesViewController)
	
	/* ngInject */
	function ArticlesViewController($scope, $stateParams, $location, Authentication, Articles) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesViewController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.findOne = findOne
		$scope.ctrl.remove = remove

		activate()

		///////////////////////////////////////////

		function activate() {
			$scope.ctrl.findOne()
		}

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

		function findOne() {
			$scope.ctrl.article = Articles.get({
				articleId: $stateParams.articleId
			})
		}
	}
})()
