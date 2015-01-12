void (function() {
	'use strict'

	angular.module('articles').controller('ArticlesController', ArticlesController)
	
	/* ngInject */
	function ArticlesController($scope, $stateParams, $location, Authentication, Articles) {

		$scope.ctrl = {}
		$scope.ctrl.ctrlName = 'ArticlesController'

		$scope.ctrl.authentication = Authentication
		$scope.ctrl.create = create
		$scope.ctrl.find = find
		$scope.ctrl.findOne = findOne
		$scope.ctrl.remove = remove
		$scope.ctrl.update = update


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

		function update() {
			var article = $scope.ctrl.article

			article.$update(function() {
				$location.path('articles/' + article._id)
			}, function(errorResponse) {
				$scope.ctrl.error = errorResponse.data.message
			})
		}

		function find() {
			$scope.ctrl.articles = Articles.query()
		}

		function findOne() {
			$scope.ctrl.article = Articles.get({
				articleId: $stateParams.articleId
			})
		}
	}
})()
