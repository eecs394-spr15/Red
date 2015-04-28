g4tapp.controller("IndexController", function($scope,supersonic){

//INITIALIZING
	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	//supersonic.ui.views.current.whenVisible( function() { location.reload(); });
//logging in user, for testing
	//Parse.User.logOut();
	//Parse.User.logIn("Default", "defaultpassword").then(function(user) {			    	
	//});

//GLOBAL CURRENT USER VARIABLE
	Parse.GeoPoint.current({
		success: function (point) {
			$scope.myLocation = point;
		}
	});
	
	$scope.refresh = function(){
		location.reload();
	}
	
	var currentUser = Parse.User.current();

//initializing items
	var ItemForSale = Parse.Object.extend("ItemForSale");

//search filter variable
	$scope.keyword = "";

// use for refresh
	$scope.sortLocation = function(){
		$scope.items= [];
	//	location.reload();
	var query5 = new Parse.Query(ItemForSale);

		var tmpp = $scope.myLocation;
		//var tmpp = new Parse.GeoPoint(42, -87);
		query5.withinMiles("location", tmpp, 1000);
		query5.notEqualTo("userID", currentUser.id);
	// query.limit(10);

	query5.find().then(function(mItem){
		for (var i = 0; i < mItem.length;i++){
		iItem = mItem[i];
		$scope.items.push({id:iItem.id, url:iItem.get("url"),title:iItem.get("title"),description:iItem.get("description"), picture:iItem.get("picture").url()});
		}
		
	});
}
	$scope.sortTime = function(){
		$scope.items= [];
	//	location.reload();
	var query6 = new Parse.Query(ItemForSale);

	query6.descending("createdAt");
	query6.notEqualTo("userID", currentUser.id);
	query6.find().then(function(mItem){
		for (var i = 0; i < mItem.length;i++){
		iItem = mItem[i];
		$scope.items.push({id:iItem.id, url:iItem.get("url"),title:iItem.get("title"),description:iItem.get("description"), picture:iItem.get("picture").url()});
		}
	});

}

//ALL ITEMS EXCEPT LOGGED IN USER'S
	var query = new Parse.Query(ItemForSale);
	$scope.items = [];
	$scope.sortByTime = true;
	if($scope.sortByTime){
		query.descending("createdAt");
	}else {
		var tmpp = new Parse.GeoPoint(42, -87);
		query.withinMiles("location", tmpp, 1000);
	}
	query.notEqualTo("userID", currentUser.id);
	// query.limit(10);

	query.find().then(function(mItem){
		for (var i = 0; i < mItem.length;i++){
		iItem = mItem[i];
		$scope.items.push({id:iItem.id, url:iItem.get("url"),title:iItem.get("title"),description:iItem.get("description"), picture:iItem.get("picture").url()});
		}
	});



//Add item controller functions ////////////////////////////////////////////////////////////////////////
	$scope.addItem =function(){
		var itemForSale = new ItemForSale();
		itemForSale.set("title", $scope.newItem.title);
		itemForSale.set("description", $scope.newItem.description);
		itemForSale.set("userID", currentUser.id); 
		itemForSale.set("wishList", $scope.newItem.wishlist);
		itemForSale.set("offeredItems", []);
		itemForSale.set("offeredTo",[]);
		itemForSale.set("matchedItemIDs",[]);
		var parseFile = new Parse.File($scope.newItem.title + ".jpg", {base64:$scope.imageData});
		itemForSale.set("picture", parseFile);
		itemForSale.set("location", $scope.myLocation);
		itemForSale.save().then(function(itemForSale) {
				updateUserArray(itemForSale);
				var options = {
				  message: "Item has been added to your account",
				  buttonLabel: "Close"
				};

				supersonic.ui.dialog.alert("Success!", options).then(function() {
				  supersonic.logger.log("Alert closed.");
				});
				supersonic.ui.layers.pop();
					
				}, function(error) {
					alert("item save failed");
				// the save failed.
				});
		//supersonic.ui.modal.hide();
	};

	function updateUserArray(itemForSale){
			if (currentUser) {
				//currentUser.set("username", "YAYNEW");  
				currentUser.add("myItems", itemForSale.id);
				currentUser.save(null, {
					success: function(user) {
						//alert("successfully changed info");
						updateMyItems();
					}
				});
			} else {
				alert('could not add new Item to User Array');
			}
		}

	$scope.cancel = function(){
		supersonic.ui.modal.hide();
	};

	var options = {
	quality: 50,
		 allowEdit: true,
		 targetWidth: 400,
		 targetHeight: 500,
		 //encodingType: "png",
		 saveToPhotoAlbum: false,
		 destinationType: "dataURL"
	};

	$scope.getPicture = function(){	
		navigator.camera.getPicture(onSuccess, onFail, options);	
		/*supersonic.media.camera.takePicture(options).then( function(result){
		  $scope.imageData= "data:image/jpeg;base64, " + result;
		  }); */
	}

	function onSuccess(imageData) {
		var image = document.getElementById('myImage');
		image.src = "data:image/png;base64," + imageData;
		$scope.imageData = imageData;  
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}





// signup and login controller functions ////////////////////////////////////

	

	$scope.editThisUser = function(){
		var queryEditUser = new Parse.Query(Parse.User);
        queryEditUser.get(currentUser.id, {
          success: function(userAgain) {
            userAgain.set("username", $scope.editUser.username);
            userAgain.set("password", $scope.editUser.password);
			userAgain.set("email", $scope.editUser.email);
			userAgain.set("phone",  $scope.editUser.phone);
			currentUser = Parse.User.current();
			$scope.thisUser.push({ 	userName: currentUser.get("username"), 
									Email: currentUser.get("email"), 
									Phone: currentUser.get("phone"),
									thispassword: currentUser.get("password")
								});
			$scope.thisuser = $scope.thisUser[0];
			alert(" Successfully updated your profile! "+ userAgain.get("username")+"\n Restart the app to view your new profile!");
            userAgain.save(null, {
              error: function(userAgain, error) {
                // This will error, since the Parse.User is not authenticated
              }
            });
            }
        });
	}


		$scope.thisUser = [];

			$scope.thisUser.push({ 	userName: currentUser.get("username"), 
									Email: currentUser.get("email"), 
									Phone: currentUser.get("phone"),
									thispassword: currentUser.get("password")
								});
	$scope.thisuser = $scope.thisUser[0];



// MyItem Controller functions (The list when you want to Offer a trade) - linked to items.html////////////////////////////////////


	var query2 = new Parse.Query(ItemForSale);

	$scope.myitems = [];
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


	function updateMyItems(){

	}




//MATCHED ITEM CONTROLLER
	//PART 1: Update matched item field in database
	//this is in offers controller
	
	//part 2 : add matched item to matched item list

	$scope.matchedItemList = [];


	var queryMatchedItems = new Parse.Query(ItemForSale);

  	var myItemArray = currentUser.get("myItems"); //returns array of my IDs of offered items
	queryMatchedItems.containedIn("objectId", myItemArray); //returns all my items
		

	queryMatchedItems.find().then(function(results){
		results.forEach(function(myItem){
      			if (myItem.get("matchedItemIDs").length >0){
	      			var title = myItem.get("title");
	      			var description = myItem.get("description");
	      			var picture = myItem.get("picture").url();
	      			var myItemID = myItem.id;
	      			
	      			asynchCallToUpdateMatchedItems(myItem, title, description, picture, myItemID);
      			}
    	});
	});

	function asynchCallToUpdateMatchedItems(myItem, title, description, picture, myItemID){
			var relation = myItem.relation("matchedItem");
  			  relation.query().find().then(function(matchResult){
  				matchResult.forEach(function(matchedItem){
				    var queryOwnerOfMatchedItem = new Parse.Query(Parse.User);
				    queryOwnerOfMatchedItem.get(matchedItem.get("userID"),{
						success: function(user) {
						    name = user.get("username");
						    phone = user.get("phone");
						    email = user.get("email");
						    var contactInfo =  "\n\n Contact " + name + " at:\n " + phone + " or at:\n " + email
					
					    $scope.matchedItemList.push({ 	myItemTitle: title, 
														myItemDescription: description, 
														myItemPicture: picture, 
														matchedItemTitle : matchedItem.get("title"), 
														matchedItemDescription:matchedItem.get("description"), 
														matchedItemContact:contactInfo,
														matchedItemPicture: matchedItem.get("picture").url(),
														myItemID : myItemID,
														matchedItemID: matchedItem.id,
														myItem : myItem,
														matchedItem : matchedItem
													});	
				   
				
						}
					});	
				});
			});
  	}


// IMPLEMENT LATER: Delete all references when trade is complete
	var queryToDeleteItem = new Parse.Query(ItemForSale);

	$scope.tradeCompleted = function(myItem, matchedItem){
		//updating my item array
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
		queryToDeleteItem.containedIn("objectId", arrayToDeleteRef);
	    queryToDeleteItem.find().then(function(results){
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


	function asynchCallToRemoveRelations(myItem, matchedItem){
			var relation = myItem.relation("matchedItem");
			relation.remove(matchedItem);
			var theirRelation = matchedItem.relation("matchedItem");
			theirRelation.remove(myItem);
			myItem.save();
			matchedItem.save();
  	}


  	$scope.tradeCancelled = function(myItem, matchedItem){
  		var options = {
				  message: "The trade has been cancelled.",
				  buttonLabel: "Close"
				};

		supersonic.ui.dialog.alert("Success!", options).then(function() {
		  supersonic.logger.log("Alert closed.");
		});

  		matchedItem.remove("offeredItems", myItem.id);
		matchedItem.remove("matchedItemIDs", myItem.id);
		matchedItem.remove("offeredTo", myItem.id);
		matchedItem.save();

		myItem.remove("offeredItems", matchedItem.id);
		myItem.remove("matchedItemIDs", matchedItem.id);
		myItem.remove("offeredTo", matchedItem.id);
		myItem.save();

		//removing relations

		asynchCallToRemoveRelations(myItem, matchedItem);
		
	}



});



