g4tapp.controller("IndexController", function($scope,supersonic){
   Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
  var ItemForSale = Parse.Object.extend("ItemForSale");
  var query = new Parse.Query(ItemForSale);
   $scope.findItemsByUser = function(userID){
	// TO DO
        
  }
   $scope.items = [
	{url: 'http://images.craigslist.org/00303_8EJbdKNmkNQ_600x450.jpg',
	title: 'whatever',
	description: 'whatever',
	picture: 'whatever'}
  ];
 
  query.descending("createdAt");
 // query.limit(10);
  query.first().then(function(firstItem){
 	$scope.items = [
	{url: firstItem.get("url"),
	title: firstItem.get("title"),
	description: firstItem.get("description"),
	picture: firstItem.get("picture").url()}
  ];
  });

  query.find().then(function(mItem){
	for (var i = 1; i < mItem.length;i++){
	iItem = mItem[i];
	$scope.url =  iItem.get("url");
	$scope.title = iItem.get("title");
	$scope.description = iItem.get("description");	
        $scope.picture = iItem.get("picture").url();
	$scope.items.push({url:$scope.url,title:$scope.title,description:$scope.description, picture:$scope.picture});
	}
  });


$scope.newItem = [
	{url: 'http://images.craigslist.org/00303_8EJbdKNmkNQ_600x450.jpg',
	title: 'whatever',
	description: 'whatever'}
  ];


$scope.saveImage =function(){
          var itemForSale = new ItemForSale();
	  itemForSale.set("title", $scope.newItem.title);
          itemForSale.set("description", $scope.newItem.description);
	  itemForSale.set("userID", $scope.newItem.userID); 
          var parseFile = new Parse.File("photo.jpg", {base64:$scope.imageData});
	  itemForSale.set("picture", parseFile);
	  itemForSale.save();
	    
	  // adding object ID to user class
	  var userQuery = new Parse.Query(Parse.User);

	  //var objectID = itemForSale.id;
	  //alert(objectID);
	  userQuery.equalTo("phone",$scope.newItem.userID.toString());
	  userQuery.find().then(function(thisUser){
		thisUser.myItems.add("aa");
		alert("yes!!");
	  });
	  //userQuery.save();
	  supersonic.ui.layers.pop();

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

$scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post(uploadUrl, fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success( "...all right!..." ).error( "..damn!..." );

};


});

