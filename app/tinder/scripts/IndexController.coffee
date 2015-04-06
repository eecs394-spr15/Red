angular.module('tinder').controller 'IndexController', ($scope, supersonic) ->
  # Controller functionality here
  options = message: '\n\n Contact Liam at:\n (781)-801-2486'

  $scope.showMatch = ->
    supersonic.ui.dialog.alert('You Have a Match!!', options).then ->
      supersonic.logger.log 'Alert closed.'
      return
    return

  return