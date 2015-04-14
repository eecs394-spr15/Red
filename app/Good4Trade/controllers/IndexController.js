g4tapp.controller("IndexController", function($scope,supersonic){

   	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
	var ItemForSale = Parse.Object.extend("ItemForSale");
	var query = new Parse.Query(ItemForSale);

	$scope.findItemsByUser = function(userID){
		// TO DO
	  }

	$scope.items = [];
	 
	query.descending("createdAt");
	 // query.limit(10);

	query.find().then(function(mItem){
		for (var i = 0; i < mItem.length;i++){
		iItem = mItem[i];
		$scope.items.push({url:iItem.get("url"),title:iItem.get("title"),description:iItem.get("description"), picture:iItem.get("picture").url()});
		}
	  });


	$scope.saveImage =function(){
	      var itemForSale = new ItemForSale();
		  itemForSale.set("title", $scope.newItem.title);
	      itemForSale.set("description", $scope.newItem.description);
		  itemForSale.set("userID", $scope.newItem.userID); 
		  itemForSale.set("wishList", $scope.newItem.wishlist);
	      var parseFile = new Parse.File("photo.jpg", {base64:$scope.imageData});
		  itemForSale.set("picture", parseFile);
		  itemForSale.save();
		    

		  var currentUser = Parse.User.current();
			if (currentUser) {
	    	currentUser.set("username", "my_new_username")
			} else {
	    	  alert('phail');
			}


		  // adding object ID to user class
		  /*
		  var userQuery = new Parse.Query(Parse.User);
		  userQuery.equalTo("phone",$scope.newItem.userID);
		  userQuery.find().then(function(theseUser){
			thisUser = theseUser[0];
			document.getElementById('test').innerHTML=thisUser.get("phone");
			thisUser.set("email", "21132123123");
			thisUser.save();
		  });*/
		  //supersonic.ui.layers.pop();

	          //document.getElementById('test').innerHTML=$scope.imageData;
	};

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
			}); 
	*/
	}

		
	function onSuccess(imageData) {
	    var image = document.getElementById('myImage');
	    image.src = "data:image/png;base64," + imageData;
	    $scope.imageData = imageData;
	    //document.getElementById('test').innerHTML = imageData;
	    $scope.savedImage = "data:image/jpeg;base64," + imageData;
	    //$scope.newItemImageURL = image.src;
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}

	$scope.signUp = function(){
		var user = new Parse.User();
		user.set("username", $scope.newUser.username);
		user.set("password", $scope.newUser.password);
		user.set("email", $scope.newUser.email);
		// other fields can be set just like with Parse.Object
		user.set("phone",  $scope.newUser.phone);
		 
		user.signUp(null, {
		  success: function(user) {
		    alert("success");
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}

// LOGIN METHOD, USE IT LATER, not used yet
		$scope.logIn = function(){
		  var user = Parse.User.logIn("Testinglogin", "test", {
			  success: function(user) {
			    user.set("username", "newUsername");  // attempt to change username
			    user.save(null, {
			      success: function(user) {
			      	 alert("successfully logged in and changed");
			        // This succeeds, since the user was authenticated on the device
			      }
			    });
			  }
			});
		}


});

