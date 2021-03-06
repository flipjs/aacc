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

		function generateStateLookup(country) {
			$scope.states = countryStateList.filter(function(e) {
				return e.country.toLowerCase() === country.toLowerCase()
			})[0].states.split('|').map(function(state) {
				return { name: state }
			})
		}

		function updateStateLookup(country) {
			$scope.user.state = ''
			generateStateLookup(country)
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
