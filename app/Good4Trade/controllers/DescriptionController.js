g4tapp.controller("DescriptionController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	var User = Parse.Object.extend("User");	
	var ItemForSale = Parse.Object.extend("ItemForSale");
	var currentUser = Parse.User.current();	
	
	supersonic.ui.views.current.params.onValue(function(values){
		$scope.myItemId = values.id;
	})

	$scope.offeredItems =[];
	var queryMyItem = new Parse.Query(ItemForSale);
	$scope.iPicture = "";
	$scope.iTitle = "";
	$scope.iWishList = "";
	$scope.iDescription = "";

	queryMyItem.get($scope.myItemId, {
			success: function(myItem) {
				$scope.iPicture = myItem.get("picture").url();
				$scope.iTitle = myItem.get("title");
				$scope.iWishList = myItem.get("wishList");
				$scope.iDescription = myItem.get("description");
				$scope.myItem = myItem;
				},
			error: function(object, error) {
			    alert("retrieving offered items failed!");
			  }
	});
	
	$scope.editThisItem = function(){
		queryMyItem.get($scope.myItemId, {
			success: function(myItem) {
				myItem.set("title", $scope.thisItem.title);
				myItem.set("description", $scope.thisItem.description);
				myItem.set("wishList", $scope.thisItem.wishList);
				myItem.save();
				supersonic.ui.layers.pop();
			}
		});
	}

	var currentUser = Parse.User.current();

	var queryToDeleteMyItem = new Parse.Query(ItemForSale);

	$scope.removeThisItem = function(myItem){
		var myArrayOfItems = currentUser.get("myItems");
		var index = myArrayOfItems.indexOf(myItem.id);
		if (index > -1) {
			myArrayOfItems.splice(index, 1);
		}
		currentUser.set("myItems",myArrayOfItems);
		currentUser.save();

		//getting all objects that may have a link to this object
		var offeredToArray = myItem.get("offeredTo");
		var offeredFromArray = myItem.get("offeredItems");
		var matchedItemsArray = myItem.get("matchedItemIDs");
		var arrayToDeleteRef = offeredToArray.concat(offeredFromArray);
		arrayToDeleteRef = arrayToDeleteRef.concat(matchedItemsArray);

		//updating "offeredItems" and "matchedItemIDs" and "offeredTo" field of objects that there is a link to
		queryToDeleteMyItem.containedIn("objectId", arrayToDeleteRef);
	    queryToDeleteMyItem.find().then(function(results){
	    	results.forEach(function(oItem){

	    		oItem.remove("offeredItems", myItem.id);
	    		oItem.remove("matchedItemIDs", myItem.id);
	    		oItem.remove("offeredTo", myItem.id);
	    		oItem.save();

				asynchCallToRemoveRelations(myItem, oItem);
			});
	    });

		//updating master list
		myItem.destroy({
			  success: function(myObject) {
			    var options = {
				  message: "Item has been removed from your account.",
				  buttonLabel: "Close"
				};

				supersonic.ui.dialog.alert("Success!", options).then(function() {
				  supersonic.logger.log("Alert closed.");
				});
			  },
			  error: function(myObject, error) {
			    var options = {
				  message: "Item could not be removed from your account.",
				  buttonLabel: "Close"
				};

				supersonic.ui.dialog.alert("Issue Encountered", options).then(function() {
				  supersonic.logger.log("Alert closed.");
				});
			  }
		});
	}



	$scope.editFavorite = function(heartbutton){

		var btn = document.getElementById('heartbutton');
/*
	if (count == 0){
        btn.style.backgroundColor = "#DC143C";
        count=1;        
    }
    else{
        btn.style.backgroundColor = "#0099FF"
        count=0;
    }

*/
		var flag = false;
 		var favoriteList = currentUser.get("favoriteList");
 		for(var i=0; i < length; i++){
 			if(favoriteList[i] == $scope.myItemId){
 			    flag = true;
 				currentUser.remove("favoriteList",$scope.myItemId);
 				btn.style.backgroundColor = "#0099FF"
 				alert("cancel favorite");
 			}
 		}

 		if(flag == false){
 			currentUser.addUnique("favoriteList",$scope.myItemId);
 			btn.style.backgroundColor = "#DC143C";
			alert("add favorite");

		}
		currentUser.save();	
		//alert(itemid);

		
	}




	function asynchCallToRemoveRelations(myItem, matchedItem){
		var relation = myItem.relation("matchedItem");
		relation.remove(matchedItem);
		var theirRelation = matchedItem.relation("matchedItem");
		theirRelation.remove(myItem);
		myItem.save();
		matchedItem.save();
  	}

});
