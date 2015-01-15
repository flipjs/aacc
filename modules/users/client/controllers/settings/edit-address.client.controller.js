void (function() {
	'use strict'

	angular.module('users')
		.controller('EditAddressController', EditAddressController)

	/* ngInject */
	function EditAddressController($scope, $http, $location, Users, Authentication, CountryStateLookup) {
		$scope.countries = CountryStateLookup.countries
		$scope.states = []
		$scope.updateUserProfile = updateUserProfile
		$scope.user = Authentication.user

		// Update a user profile
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

		function getStatesOf(countryName) {
			return CountryStateLookup.getStatesOf(countryName)
		}
	}
	
})()
