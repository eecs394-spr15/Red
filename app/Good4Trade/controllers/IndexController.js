g4tapp.controller("IndexController", function($scope,supersonic){
  $scope.items = [
	{url: 'http://images.craigslist.org/00303_8EJbdKNmkNQ_600x450.jpg',
	title: 'whatever',
	description: 'whatever'}
  ];
  Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");
  var ItemForSale = Parse.Object.extend("ItemForSale");
  var query = new Parse.Query(ItemForSale);
  query.descending("createdAt");
  query.limit(10);
  query.first().then(function(firstItem){
 	$scope.items = [
	{url: firstItem.get("url"),
	title: firstItem.get("title"),
	description: firstItem.get("description")}
  ];
  });

  query.find().then(function(mItem){
	for (var i = 1; i < mItem.length;i++){
	iItem = mItem[i];
	$scope.url =  iItem.get("url");
	$scope.title = iItem.get("title");
	$scope.description = iItem.get("description");	
        $scope.items.push({url:$scope.url,title:$scope.title,description:$scope.description});
	}
  });
// $scope.url = 'http://images.craigslist.org/00303_8EJbdKNmkNQ_600x450.jpg';	
});
