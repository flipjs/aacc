do ->
  'use strict'

  EditAddressController = ($scope, Users, Authentication, UserDefaults, countryStateData, toaster) ->

    countryStateList = countryStateData || []

    generateCountryLookup = ->
      angular.forEach countryStateList, (data) ->
        $scope.countries.push { name: data.country }
        return
      return

    generateStateLookup = (country) ->
      states = countryStateList
      .filter (e) ->
        e.country.toLowerCase() == country.toLowerCase()
      states = states[0].states.split '|'
      .map (state) ->
        { name: state }
      $scope.states = states
      return

    updateStateLookup = (country) ->
      $scope.user.state = ''
      generateStateLookup country
      return

    updateUserProfile = (isValid) ->
      if isValid
        $scope.success = $scope.error = null
        user = new Users $scope.user

        user.$update (response) ->
          Authentication.user = response
          $scope.success = true
          toaster.success 'Address saved succesfully.'
        , (response) ->
          $scope.error = response.data.message
          toaster.error response.data.message
      else
        $scope.submitted = true
      return

    activate = ->
      $scope.user = Authentication.user
      $scope.countries = []
      $scope.states = []
      $scope.updateStateLookup = updateStateLookup
      $scope.updateUserProfile = updateUserProfile
      $scope.user.country = $scope.user.country || UserDefaults.country
      $scope.user.state = $scope.user.state || UserDefaults.state

      # generate lookup tables
      generateCountryLookup()
      generateStateLookup $scope.user.country
      return

    # activate controller
    activate()

    return

  EditAddressController
    .$inject = [ '$scope', 'Users', 'Authentication', 'UserDefaults', 'countryStateData', 'toaster' ]

  angular.module 'users'
    .controller 'EditAddressController', EditAddressController

  return
