void (function() {
	'use strict'

	angular.module('users').factory('CountryStateLookup', CountryStateLookup)

	/* ngInject */
	function CountryStateLookup($http) {
		var countryStateData = []
		var service = {
			countries: [],
			fetchCountryStateData: fetchCountryStateData,
			getStatesOf: getStatesOf
		}

		return service
		//////////////

		// pass this to router.resolve to generate data before using it in
		// controller
		function fetchCountryStateData() {
			$http.get('/api/lookup/states', {cache: true})
			.success(function(data) {
				countryStateData = data
				generateCountries()
			})
			.error(function(error) {
				// catch error here and send to ErrorHandler service
			})
		}

		function generateCountries() {
			angular.forEach(countryStateData, function(data) {
				this.push(data.country)
			}, service.countries)
		}

		function getStatesOf(countryName) {
			var idx = countryStateData.map(function(data) {
				return data.country.toLowerCase()
			})
			.indexOf(countryName.toLowerCase())
			
			return countryStateData[idx].states.split('|')
		}
	}

})()
