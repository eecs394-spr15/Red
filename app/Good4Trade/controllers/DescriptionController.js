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
	
	$scope.editThisItem = function(){
		queryMyItem.get($scope.myItemId, {
			success: function(myItem) {
				myItem.set("title", $scope.thisItem.title);
				myItem.set("description", $scope.thisItem.description);
				myItem.set("wishList", $scope.thisItem.wishList);
				myItem.save(null, {
					success: function(myItem) {
						myItem.set("title", $scope.thisItem.title);
						myItem.set("description", $scope.thisItem.description);
						myItem.set("wishList", $scope.thisItem.wishList);
					},
					error: function(myItem, error) {
						alert("Something went wrong");
					}
				});
				supersonic.ui.layers.pop();
			}
		});
	}

});
