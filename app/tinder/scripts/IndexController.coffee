angular
  .module('tinder')
  .controller("IndexController", ($scope, Tinder, supersonic) ->
    $scope.tinders = null
    $scope.showSpinner = true

    Tinder.all().whenChanged (tinders) ->
      $scope.$apply ->
        $scope.tinders = tinders
        $scope.showSpinner = false
  )