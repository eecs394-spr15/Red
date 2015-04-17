g4tapp.controller("ItemsController", function($scope,supersonic){
	
	supersonic.ui.views.current.params.onValue(function(values){
		$scope.previewId = values;
	})

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
	
	// MyItem Controller functions
	var query2 = new Parse.Query($scope.ItemForSale);

	$scope.myitems = [];
	  // TO DO
	     query2.equalTo("userID", "7818012486");
	     query2.find().then(function(results){
	        for(var i = 0; i < results.length; i++){
	          iItem = results[i];
	          $scope.myitems.push({id:iItem.id, url:iItem.get("url"), title:iItem.get("title"), description:iItem.get("description"), 
	            picture:iItem.get("picture").url(), offeredItemsLength: iItem.get("offeredItems").length});
	        }
	      });


	var query3 = new Parse.Query($scope.ItemForSale);

	$scope.addToOfferList = function(fromMylist){
		alert(fromMylist+"offerTo"+$scope.previewId);
		query3.get($scope.previewId,{
			success:function(result){
				result.addUnique("offeredItems",fromMylist);
				result.save();
				alert("success");
			}
		});
	}
	
});