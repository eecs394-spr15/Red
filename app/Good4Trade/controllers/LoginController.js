g4tapp.controller("LoginController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	//Parse.User.logOut();

	$scope.refresh = function(){
		location.reload();
	}

	var ItemForSale = Parse.Object.extend("ItemForSale");
	$scope.signUp = function(){
			var user = new Parse.User();
			user.set("username", $scope.newUser.username);
			user.set("password", $scope.newUser.password);
			user.set("email", $scope.newUser.email);
			user.set("phone",  $scope.newUser.phone);
			user.set("favoriteList", []);
			user.set("myItems", []);
			user.signUp(null, {
			success: function(user) {
				supersonic.ui.initialView.dismiss();
				var options = {
				  message: "You successfully signed up!",
				  buttonLabel: "Close"
				};

				supersonic.ui.dialog.alert("Success!", options).then(function() {
				  supersonic.logger.log("Alert closed.");
				});
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.

				var options = {
				  message: error.code + " " + error.message,
				  buttonLabel: "Close"
				};

				supersonic.ui.dialog.alert("Error!", options).then(function() {
				  supersonic.logger.log("Alert closed.");
				});

			}
		});
	}

	$scope.dismissInit = function(){
		supersonic.ui.initialView.dismiss();
	}

	$scope.logIn = function(){
		//Parse.User.logOut();
		//alert("entered function");
		Parse.User.logIn($scope.existingUser.username, $scope.existingUser.password, {
				success: function(user) {
					user.save(null, {
						success: function(user) {
						supersonic.ui.dialog.alert("Successfully Logged In.");
						supersonic.ui.initialView.dismiss();
						}
					});
				},
				error: function( error) {
				    var options = {
					  message: "Log In Failed.",
					  buttonLabel: "Close"
					};

					supersonic.ui.dialog.alert("Error", options).then(function() {
					 supersonic.logger.log("Alert closed.");
					});
			  }
			});
	}

	var queryForBrowsing = new Parse.Query(ItemForSale);
	$scope.items = [];
	queryForBrowsing.find().then(function(mItem){
		for (var i = 0; i < mItem.length;i++){
		iItem = mItem[i];
		$scope.items.push({id:iItem.id, url:iItem.get("url"),title:iItem.get("title"),description:iItem.get("description"), picture:iItem.get("picture").url()});
		}
	});

});
