void (function() {
	'use strict'

	angular.module('articles').factory('Articles', Articles)

	/* ngInject */
	function Articles($resource) {
		return $resource('api/articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		})
	}
})()

