g4tapp.controller("IndexController", function($scope,supersonic){

//INITIALIZING
	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");

//logging in user, for testing

	Parse.User.logIn("liam", "password").then(function(user) {
		//alert("logged in as " + user.get("username"));					    	
	});

//GLOBAL CURRENT USER VARIABLE

	var currentUser = Parse.User.current();

//initializing items
	var ItemForSale = Parse.Object.extend("ItemForSale");


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
						alert("successfully logged in");
						supersonic.ui.initialView.dismiss();
						}
					});
				}
			});
	}



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




//Offered items controller functions (looking at what others have offered you)
	var queryOfferedItems = new Parse.Query(ItemForSale);

	$scope.offeredItems =[{title:"Coke1", description:"bottle", 
	        			picture:"http://files.parsetfss.com/19767582-8750-471b-bb21-4c631806f686/tfss-fb31a440-e615-47d4-862a-2c424c2de6b2-Coke.jpg", offeredItem : {}, myItem: {}}];


	//FOR DEBUGGING VARS, DELETE LATER
	var queryMyItemDebug = new Parse.Query(ItemForSale);
	var queryOfferedDebug = new Parse.Query(ItemForSale);


	queryMyItemDebug.get("ShGzNlU5q4", {
			  success: function(myItem) {
			    $scope.offeredItems[0].myItem = myItem;
			  },
			  error: function(object, error) {
			    alert("get item failed");
			  }
		});

	queryOfferedDebug.get("XGlAQQGLND", {
			  success: function(offeredItem) {
			    $scope.offeredItems[0].offeredItem = offeredItem;
			  },
			  error: function(object, error) {
			    alert("get item failed");
			  }
		});

	//END FOR DEBUGGING VARS
	

	$scope.$watch('offeredItems', function(newVal, oldVal) {
    	//alert($scope.offeredItems[0].title);
	});        			

	$scope.displayOffers = function(myItem){
		//$scope.offeredItems = []; //for resetting the scope

		var offeredItemArray = myItem.get("offeredItems"); //returns array of object IDs of offered items

		queryOfferedItems.containedIn("objectId", offeredItemArray); //constraining query

		queryOfferedItems.find().then(function(queryOfferedItemResults){
			for(var i = 0; i < queryOfferedItemResults.length; i++){
      			var offeredItem = queryOfferedItemResults[i];
      			//alert(offeredItem.get("title"));
      			$scope.offeredItems.push({title:offeredItem.get("title"), description:offeredItem.get("description"), 
        			picture:offeredItem.get("picture").url(), offeredItem : offeredItem, myItem:myItem});
    			}
    		//DEBUGGING, Proof that it's added to the scope, but that the view is not updated
    		//alert($scope.offeredItems[2].offeredItem.get("title"));
    		//$scope.offeredItems[2].offeredItem.set("title", "newestJab");
    		//$scope.offeredItems[2].offeredItem.save();

    		//do redirect;
    		var offeredView = new supersonic.ui.View("Good4Trade#offered");
			supersonic.ui.layers.push(offeredView);
		});
			
	}





//MATCHED ITEM CONTROLLER
	//PART 1: Update matched item field in database

	$scope.acceptItem = function(myItem,offeredItem){

		var contactInfo = {
			message: "\n\n Contact Liam at:\n (781)-801-24822",
	 		buttonLabel: "Close"
		};

		supersonic.ui.dialog.alert("Successfully Traded!", contactInfo).then(function() {
			supersonic.logger.log("Alert closed.");
			supersonic.ui.modal.hide();
			});

		myItem.set("matchedItemID", offeredItem.id);
		offeredItem.set("matchedItemID", myItem.id);

		var myItemRelation = myItem.relation("matchedItem");
		myItemRelation.add(offeredItem);
		var offeredItemRelation = offeredItem.relation("matchedItem");
		offeredItemRelation.add(myItem);

		offeredItem.save();		
		myItem.save();
	}


	//part 2 : add matched item to matched item list

	$scope.matchedItemList = [];


	var queryMatchedItems = new Parse.Query(ItemForSale);

  	var myItemArray = currentUser.get("myItems"); //returns array of my IDs of offered items
	queryMatchedItems.containedIn("objectId", myItemArray); //returns all my items
	queryMatchedItems.exists("matchedItemID"); //returns all my items with Matched Item IDs set
		

	queryMatchedItems.find().then(function(results){

		for(var i = 0; i < results.length; i++){
      			var myItem = results[i];
      			var relation = myItem.relation("matchedItem");
      			var matchedItem= {};
      			relation.query().find().then(function(matchResult){

				    matchedItem= matchResult[0];
				    //alert("successful fetch" + matchedItem.id);
				    $scope.matchedItemList.push({ 	myItemTitle:myItem.get("title"), 
											myItemDescription:myItem.get("description"), 
										myItemPicture:myItem.get("picture").url(), 
										matchedItemTitle : matchedItem.get("title"), 
										matchedItemDescription:matchedItem.get("description"), 
										matchedItemPicture: matchedItem.get("picture").url()
									});	
				 //alert($scope.matchedItemList[1].myItemTitle);
				});		
    	}
	});




});



