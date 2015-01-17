void (function() {
	'use strict'

	angular.module('users')
		.controller('EditAddressController', EditAddressController)

	/* ngInject */
	function EditAddressController($scope, Users, Authentication, UserDefaults, countryStateData) {

		var countryStateList = countryStateData

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
			$scope.states = generateStateLookup($scope.user.country)
		}

		function generateCountryLookup() {
			angular.forEach(countryStateList, function(data) {
				this.push({ name: data.country })
			}, $scope.countries)
		}

		function updateStateLookup(countryName) {
			$scope.user.state = ''
			$scope.states = generateStateLookup(countryName)
		}

		function generateStateLookup(countryName) {
			var stateList = []

			countryStateList.some(function(data, idx) {
				if (data.country.toLowerCase() === countryName.toLowerCase()) {
					stateList = countryStateList[idx].states.split('|').map(function(state) {
						return { name: state }
					})
					return true
				}
				return false
			})
			return stateList
		}

		function updateUserProfile(isValid) {
			if (isValid){
				$scope.success = $scope.error = null
				var user = new Users($scope.user)

				user.$update(function(response) {
					$scope.success = true
					Authentication.user = response
				}, function(response) {
					$scope.error = response.data.message
				})
			} else {
				$scope.submitted = true
			}
		}
	}
	
})()
