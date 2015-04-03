angular
  .module('geolocation')
  .controller 'IndexController', ($scope, supersonic) ->
    # Controller functionality here
	$scope.position = undefined

	$scope.getPosition = () ->
  	  supersonic.device.geolocation.getPosition().then (position) ->
    	    $scope.position = position
