angular
  .module('tinder')
  .controller("ItemsController", ($scope, Tinder, supersonic) ->
    $scope.tinder = {}

    $scope.cancel = ->
      supersonic.ui.modal.hide()
  )