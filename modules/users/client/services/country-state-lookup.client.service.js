void (function() {
	'use strict'

	angular.module('users')
		.factory('CountryStateLookup', CountryStateLookup)

	/* ngInject */
	function CountryStateLookup($http, $q) {
		var service = {
			// countryStateData: [],
			getCountryStateData: getCountryStateData
		}

		return service
		//////////////

		// pass this to router.resolve to generate data before using it in
		// controller
		function getCountryStateData() {
			var deferred = $q.defer()
			$http.get('/api/lookup/states', {cache: true})
			.success(function(data) {
				// service.countryStateData = data
				deferred.resolve(data)
			})
			.error(function(error) {
				deferred.reject(error)
			})
			return deferred.promise
		}
	}

})()
