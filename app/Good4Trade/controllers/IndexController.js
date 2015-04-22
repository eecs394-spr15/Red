g4tapp.controller("IndexController", function($scope,supersonic){

//INITIALIZING
	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");

//logging in user, for testing

	//Parse.User.logIn("liam", "password").then(function(user) {
		//alert("logged in as " + user.get("username"));					    	
	//});

//GLOBAL CURRENT USER VARIABLE

	var currentUser = Parse.User.current();

//initializing items
	var ItemForSale = Parse.Object.extend("ItemForSale");

//search filter variable
	$scope.keyword = "";

//ALL ITEMS EXCEPT LOGGED IN USER'S
	var query = new Parse.Query(ItemForSale);
	$scope.items = [];
	query.descending("createdAt");
	
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
		var parseFile = new Parse.File($scope.newItem.title + ".jpg", {base64:$scope.imageData});
		itemForSale.set("picture", parseFile);
		itemForSale.save().then(function(itemForSale) {
				updateUserArray(itemForSale);
				var options = {
					  message: "Item has been added to your account",
					  buttonLabel: "Close"
					};

					supersonic.ui.dialog.alert("Success!", options).then(function() {
					  supersonic.logger.log("Alert closed.");
					});

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

	$scope.signUp = function(){
			var user = new Parse.User();
			user.set("username", $scope.newUser.username);
			user.set("password", $scope.newUser.password);
			user.set("email", $scope.newUser.email);
			user.set("phone",  $scope.newUser.phone);
			user.signUp(null, {
			success: function(user) {
				supersonic.ui.initialView.dismiss();
				alert("success");
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}

	$scope.dismissInit = function(){
		supersonic.ui.initialView.dismiss();
	}

	$scope.logIn = function(){
		Parse.User.logIn($scope.existingUser.username, $scope.existingUser.password, {
				success: function(user) {
					user.save(null, {
						success: function(user) {
						supersonic.ui.dialog.alert("successfully logged in");
						supersonic.ui.initialView.dismiss();
						}
					});
				}
			});
	}


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
			alert(" Successfully updated your profile! "+ userAgain.get("username"));
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
	queryMatchedItems.exists("matchedItemID"); //returns all my items with Matched Item IDs set
		

	queryMatchedItems.find().then(function(results){
		for(var i = 0; i < results.length; i++){		
      			var myItem = results[i];
      			var title = myItem.get("title");
      			var description = myItem.get("description");
      			var picture = myItem.get("picture").url();
      			var myItemID = myItem.id;
      			asynchCallToUpdateMatchedItems(myItem, title, description, picture, myItemID);
    	}
	});

	function asynchCallToUpdateMatchedItems(myItem, title, description, picture, myItemID){
			var relation = myItem.relation("matchedItem");
  			var matchedItem= {};
  			  relation.query().find().then(function(matchResult){
  				for (var i = 0; i < matchResult.length; i++){
			    matchedItem = matchResult[i];
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
												matchedItemID: matchedItem.id
											});	
			   
			
			}
		});	
	}
	});
  }
// IMPLEMENT LATER: Delete all references when trade is complete

	$scope.deleteAllReferences = function(myItemID, matchedItemID){
		alert(" to implement : delete all references upon trade completion for " + myItemID + " and " + matchedItemID);
	}

});



