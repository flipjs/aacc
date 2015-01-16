void (function() {
	'use strict'

	angular.module('users')
		.controller('EditAddressController', EditAddressController)

	/* ngInject */
	function EditAddressController($scope, $http, $location, Users, Authentication, CountryStateLookup) {
		$scope.user = Authentication.user

		$scope.countries = CountryStateLookup.countries
		$scope.states = CountryStateLookup.getStatesOf($scope.user.country)
		$scope.updateStates = updateStates
		$scope.updateUserProfile = updateUserProfile

		function updateStates(countryName) {
			$scope.states = CountryStateLookup.getStatesOf(countryName)
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
