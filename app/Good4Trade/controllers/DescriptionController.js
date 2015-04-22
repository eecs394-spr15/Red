g4tapp.controller("DescriptionController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	var ItemForSale = Parse.Object.extend("ItemForSale");
	
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
				},
			error: function(object, error) {
			    alert("retrieving offered items failed!");
			  }
	});
//update the relation in the database upon acceptance
	$scope.acceptItem = function(myItem,offeredItem){
			//alert($scope.offeredItems.length);//SCOPE IS NOT UPDATED AT THIS POINT!!, else, run a query on the userID of offered Item, get that person's info
			var name = "";
			var phone = "";
			var email = "";
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

					myItem.set("matchedItemID", offeredItem.id);
					offeredItem.set("matchedItemID", myItem.id);

					var myItemRelation = myItem.relation("matchedItem");
					myItemRelation.add(offeredItem);
					var offeredItemRelation = offeredItem.relation("matchedItem");
					offeredItemRelation.add(myItem);

					offeredItem.save();		
					myItem.save();
				  },
				  error: function(object, error) {
				    alert("failed to retrieve owner of offered item!");
				  }

			});

		}


});
