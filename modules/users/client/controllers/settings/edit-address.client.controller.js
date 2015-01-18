void (function() {
	'use strict'

	angular.module('users')
		.controller('EditAddressController', EditAddressController)

	/* ngInject */
	function EditAddressController($scope, Users, Authentication, UserDefaults, countryStateData, toaster) {

		var countryStateList = countryStateData || []

		$scope.user = Authentication.user
		$scope.countries = []
		$scope.states = []
		$scope.updateStateLookup = updateStateLookup
		$scope.updateUserProfile = updateUserProfile

		activate()

		////////////////////////////////////////////

		function activate() {
			// set user defaults if values are empty
			$scope.user.country = $scope.user.country || UserDefaults.country
			$scope.user.state = $scope.user.state || UserDefaults.state

			// generate lookup tables
			generateCountryLookup()
			generateStateLookup($scope.user.country)
		}

		function generateCountryLookup() {
			angular.forEach(countryStateList, function(data) {
				this.push({ name: data.country })
			}, $scope.countries)
		}

		function generateStateLookup(countryName) {
			var stateList = []

			countryStateList.some(function(data, idx) {
				if (data.country.toLowerCase() === countryName.toLowerCase()) {
					stateList = countryStateList[idx].states.split('|').map(function(state) {
						return { name: state }
					})
					// loop breaks when true
					return true
				}
				// loop continues when false
				return false
			})
			$scope.states = stateList
		}

		function updateStateLookup(countryName) {
			$scope.user.state = ''
			generateStateLookup(countryName)
		}

		function updateUserProfile(isValid) {
			if (isValid){
				$scope.success = $scope.error = null
				var user = new Users($scope.user)

				user.$update(function(response) {
					Authentication.user = response
					$scope.success = true
					toaster.success('Address saved successfully.')
				}, function(response) {
					$scope.error = response.data.message
					toaster.error(response.data.message)
				})
			} else {
				$scope.submitted = true
			}
		}

	}
	
})()
