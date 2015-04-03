angular
  .module('tinder')
  .controller("ShowController", ($scope, Tinder, supersonic) ->
    $scope.tinder = null
    $scope.showSpinner = true
    $scope.dataId = undefined

    _refreshViewData = ->
      Tinder.find($scope.dataId).then (tinder) ->
        $scope.$apply ->
          $scope.tinder = tinder
          $scope.showSpinner = false

    supersonic.ui.views.current.whenVisible ->
      _refreshViewData() if $scope.dataId

    supersonic.ui.views.current.params.onValue (values) ->
      $scope.dataId = values.id
      _refreshViewData()

    $scope.remove = (id) ->
      $scope.showSpinner = true
      $scope.tinder.delete().then ->
        supersonic.ui.layers.pop()
  )
