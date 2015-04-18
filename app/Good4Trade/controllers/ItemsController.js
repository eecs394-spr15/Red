g4tapp.controller("ItemsController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	var ItemForSale = Parse.Object.extend("ItemForSale");
	
	supersonic.ui.views.current.params.onValue(function(values){
		$scope.previewId = values.id;
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
	var query2 = new Parse.Query(ItemForSale);

	$scope.myitems = [];
	var currentUser = Parse.User.current();
	if(currentUser){
		var myArrayOfItems = currentUser.get("myItems");
		query2.containedIn("objectId", myArrayOfItems);
		query2.find().then(function(results){
				for(var i = 0; i < results.length; i++){
				iItem = results[i];
				$scope.myitems.push({id:iItem.id, url:iItem.get("url"), title:iItem.get("title"), description:iItem.get("description"),offeredItemsLength: iItem.get("offeredItems").length, 
					picture:iItem.get("picture").url(), myItem: iItem
					});
				}
		});
	}


	var query3 = new Parse.Query(ItemForSale);

	$scope.addToOfferList = function(fromMylist){
		//alert(fromMylist+"offerTo"+$scope.previewId);
		query3.get($scope.previewId,{
			success:function(result){
				result.addUnique("offeredItems",fromMylist);
				result.save();
				var options = {
					  message: "Your offer to Trade has been sent",
					  buttonLabel: "Close"
					};

					supersonic.ui.dialog.alert("Success!", options).then(function() {
					  supersonic.logger.log("Alert closed.");
					});
			}
		});
	}
	
});