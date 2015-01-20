do ->
  'use strict'

  CountryStateLookup = ($http) ->

    getCountryStateData = ->
      $http
        method: 'GET',
        url: '/api/lookup/states/',
        cache: true
      .then (response) ->
        response.data

    getCountryStateData: getCountryStateData

  CountryStateLookup
    .$inject = ['$http']

  angular.module 'users'
    .factory 'CountryStateLookup', CountryStateLookup

  return
