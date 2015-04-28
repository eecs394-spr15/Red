g4tapp.controller("OffersController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	var ItemForSale = Parse.Object.extend("ItemForSale");
	
	supersonic.ui.views.current.params.onValue(function(values){
		$scope.myItemId = values.id;
	})

	$scope.offeredItems =[];

	var queryMyItem = new Parse.Query(ItemForSale);
	var queryMyOffers = new Parse.Query(ItemForSale);

	queryMyItem.get($scope.myItemId, {
			  success: function(myItem) {
			    var myArrayOfOfferedItems = myItem.get("offeredItems");
			    queryMyOffers.containedIn("objectId", myArrayOfOfferedItems);
			    queryMyOffers.find().then(function(results){
			    	for(var i = 0; i < results.length; i++){
						oItem = results[i];
						$scope.offeredItems.push({title:oItem.get("title"), description:oItem.get("description"), 
							picture:oItem.get("picture").url(), offeredItem : oItem, myItem:myItem});
						}
			    });
			  },
			  error: function(object, error) {
			  	var options = {
				  message: "You successfully signed up!",
				  buttonLabel: "Close"
				};

				supersonic.ui.dialog.alert("Success!", options).then(function() {
				  supersonic.logger.log("Alert closed.");
				});
			  }
	});


	var queryOwnerOfOfferedItem = new Parse.Query(Parse.User);
//update the relation in the database upon acceptance
	$scope.acceptItem = function(myItem,offeredItem){
			//alert($scope.offeredItems.length);//SCOPE IS NOT UPDATED AT THIS POINT!!, else, run a query on the userID of offered Item, get that person's info
			var name = "";
			var phone = "";
			var email = "";

			myItem.remove("offeredItems",offeredItem.id);
			myItem.save();
			
			queryOwnerOfOfferedItem.get(offeredItem.get("userID"),{
				success: function(user) {
				    name = user.get("username");
				    phone = user.get("phone");
				    email = user.get("email");
				    var contactInfo = {
							message: "\n\n Contact " + name + " at:\n " + phone + " or at:\n " + email,
					 		buttonLabel: "Close"
						};

					supersonic.ui.dialog.alert("Successfully Traded!", contactInfo).then(function() {
						supersonic.logger.log("Alert closed.");
						supersonic.ui.modal.hide();
						});

					myItem.addUnique("matchedItemIDs", offeredItem.id);
					offeredItem.addUnique("matchedItemIDs", myItem.id);

					var myItemRelation = myItem.relation("matchedItem");
					myItemRelation.add(offeredItem);
					var offeredItemRelation = offeredItem.relation("matchedItem");
					offeredItemRelation.add(myItem);

					offeredItem.save();		
					myItem.save();
				  },
				  error: function(object, error) {
				  	var options = {
						  message: "Failed to retrieve owner of offered item!",
						  buttonLabel: "Close"
						};

					supersonic.ui.dialog.alert("Success!", options).then(function() {
					  supersonic.logger.log("Alert closed.");
					});

				  }

			});

		}


});
