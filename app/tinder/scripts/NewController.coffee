angular
  .module('tinder')
  .controller("NewController", ($scope, Tinder, supersonic) ->
    $scope.tinder = {}

    $scope.submitForm = ->
      $scope.showSpinner = true
      newtinder = new Tinder($scope.tinder)
      newtinder.save().then ->
        supersonic.ui.modal.hide()

    $scope.cancel = ->
      supersonic.ui.modal.hide()
  )
