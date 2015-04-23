g4tapp.controller("DrawerController", function($scope,supersonic){

	Parse.initialize("eQLx1O6y08roi9FxLvTY5lOLdFeZ3NtmHO0tTNQF", "0fJ1VZtzTJS2d2FC4U4DxUscRYGF6Ix5Jg60W5rn");

	$scope.logout = function(){
		//supersonic.ui.drawers.close();
		Parse.User.logOut();
		supersonic.ui.initialView.show();
	}
	
});