angular
  .module('tinder')
  .controller("EditController", ($scope, Tinder, supersonic) ->
    $scope.tinder = null
    $scope.showSpinner = true

    supersonic.ui.views.current.params.onValue (values) ->
      Tinder.find(values.id).then (tinder) ->
        $scope.$apply ->
          $scope.tinder = tinder
          $scope.showSpinner = false

    $scope.submitForm = ->
      $scope.showSpinner = true
      $scope.tinder.save().then ->
        supersonic.ui.modal.hide()

    $scope.cancel = ->
      supersonic.ui.modal.hide()
  )
