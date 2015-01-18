void (function() {
	'use strict'

	angular.module('users')
		.factory('CountryStateLookup', CountryStateLookup)

	/* ngInject */
	function CountryStateLookup($http) {
		var service = {
			getCountryStateData: getCountryStateData
		}

		return service
		//////////////

		// pass this to router.resolve to resolve data and then pass to the
		// controller
		function getCountryStateData() {
			var promise = $http({ method: 'GET', url: '/api/lookup/states', cache: true })
				.then(function(response) {
					return response.data
				})
			return promise
		}
	}

})()
