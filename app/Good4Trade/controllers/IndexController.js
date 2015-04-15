g4tapp.controller("IndexController", function($scope,supersonic){
// Index controller functions
   	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	//initializing items
	var ItemForSale = Parse.Object.extend("ItemForSale");
	var query = new Parse.Query(ItemForSale);
		     
	$scope.items = [];
	 
	query.descending("createdAt");
	 // query.limit(10);

	query.find().then(function(mItem){
		for (var i = 0; i < mItem.length;i++){
		iItem = mItem[i];
		$scope.items.push({url:iItem.get("url"),title:iItem.get("title"),description:iItem.get("description"), picture:iItem.get("picture").url()});
		}
	  });

//add item controller functions
	$scope.addItem =function(){
	      var itemForSale = new ItemForSale();
		  itemForSale.set("title", $scope.newItem.title);
	      itemForSale.set("description", $scope.newItem.description);
		  itemForSale.set("userID", $scope.newItem.userID); 
		  itemForSale.set("wishList", $scope.newItem.wishlist);
	      var parseFile = new Parse.File($scope.newItem.title + ".jpg", {base64:$scope.imageData});
		  itemForSale.set("picture", parseFile);
		  itemForSale.save().then(function(itemForSale) {
  			updateUserArray(itemForSale)
			}, function(error) {
  			// the save failed.
			});
		  supersonic.ui.modal.hide();
	};

	function updateUserArray(itemForSale){
			var currentUser = Parse.User.current();
			if (currentUser) {
	    	//currentUser.set("username", "YAYNEW");  
			currentUser.add("myItems", itemForSale.id);
			currentUser.save(null, {
			      success: function(user) {
			      	 alert("successfully changed info");
			      }
			    });
			} else {
	    	  alert('phail');
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

// signup and login controller functions
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
		  var user = Parse.User.logIn($scope.existingUser.username, 
			$scope.existingUser.password, {
			  success: function(user) {
			 //   user.set("username", "newUsername");  // attempt to change username
			    user.save(null, {
			      success: function(user) {
			      	 alert("successfully logged in");
			       	supersonic.ui.initialView.dismiss();
// This succeeds, since the user was authenticated on the device
			      }
			    });
			  }
			});
		}




// MyItem Controller functions
	var query2 = new Parse.Query(ItemForSale);

	$scope.myitems = [];
	  // TO DO
	     query2.equalTo("userID", "1234");
	     query2.find().then(function(results){
	        for(var i = 0; i < results.length; i++){
	          iItem = results[i];
	          $scope.myitems.push({url:iItem.get("url"), title:iItem.get("title"), description:iItem.get("description"), 
	            picture:iItem.get("picture").url(),offeredItemsLength: iItem.get("offeredItems").length});
	        }
	      });

	//controller from ItemsController.js
	var contactInfo = {
	  message: "\n\n Contact Liam at:\n (781)-801-24822",
	  buttonLabel: "Close"
	};

	var options = {
	  message: "\n\n Contact Liam at:\n (781)-801-24822",
	  buttonLabel: "Close"
	};

	$scope.showMatch = function(){
		supersonic.ui.dialog.alert("You Have a Match!!", contactInfo).then(function() {
	  	supersonic.logger.log("Alert closed.");
	});
	}

});



