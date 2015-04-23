g4tapp.controller("FavoriteController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	var ItemForSale = Parse.Object.extend("ItemForSale");
	
	supersonic.ui.views.current.params.onValue(function(values){
		$scope.previewId = values.id;
	})


	$scope.cancel = function(){
		supersonic.ui.modal.hide();
	}

	// use for refresh
	$scope.refresh = function(){
		location.reload();
	}

	// MyItem Controller functions
	var queryFavorite = new Parse.Query(ItemForSale);

	$scope.myitems = [];
	var currentUser = Parse.User.current();
	if(currentUser){
		var myArrayOfItems = currentUser.get("favoriteList");
		queryFavorite.containedIn("objectId", myArrayOfItems);
		queryFavorite.find().then(function(results){
				for(var i = 0; i < results.length; i++){
				iItem = results[i];
				$scope.myitems.push({id:iItem.id, url:iItem.get("url"), title:iItem.get("title"), description:iItem.get("description"),offeredItemsLength: iItem.get("offeredItems").length, 
					picture:iItem.get("picture").url(), myItem: iItem
					});
				}
				//currentUser.set("favoriteList",results);
				//currentUser.save();
		});

	}
});