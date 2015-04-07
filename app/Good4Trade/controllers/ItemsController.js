g4tapp.controller("ItemsController", function($scope,supersonic){
	
	var options = {
	  message: "\n\n Contact Liam at:\n (781)-801-24822",
	  buttonLabel: "Close"
	};

	$scope.cancel = function(){
		supersonic.ui.modal.hide();
	}

	$scope.showMatch = function(){
		supersonic.ui.dialog.alert("You Have a Match!!", options).then(function() {
	  	supersonic.logger.log("Alert closed.");
	});
	}
	
});