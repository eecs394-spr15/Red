g4tapp.controller("AddItemsController", function($scope,supersonic){
 // $scope.newItem = {title: 'tt', description: '', picture: ''};


	$scope.savedImage =function(){
          var itemForSale = new ItemForSale();
	  itemForSale.set("title", "mTitle");
          itemForSale.save();
          document.getElementById('test').innerHTML="sss";
	};

	$scope.cancel = function(){
		supersonic.ui.modal.hide();
	};

	var options = {
	  quality: 50,
	  allowEdit: true,
	  targetWidth: 300,
	  targetHeight: 300,
	  //encodingType: "png",
	  saveToPhotoAlbum: true,
	  destinationType: "dataURL"
	};


	$scope.getPicture = function(){
		
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    	destinationType: Camera.DestinationType.DATA_URL
		});

		/*supersonic.media.camera.takePicture(options).then( function(result){
	  		$scope.savedImage = "data:image/jpeg;base64, " + result;
		}); */

	}

	
	function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/png;base64," + imageData;
    $scope.savedImage = "data:image/jpeg;base64," + imageData;
    //$scope.newItemImageURL = image.src;
	}

	function onFail(message) {
    alert('Failed because: ' + message);
	}

});
