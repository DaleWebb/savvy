angular.module('starter.controllers', ['ionic.contrib.ui.cards', 'ionic'])

.directive('noScroll', function ($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('LoginCtrl', function ($scope, $ionicLoading, $state, LoginService) {
	
	// $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});

	// token = localStorage.getItem("token");
	// if (token) {
	// 	$ionicLoading.hide();
	// 	$state.go('cards');
	// }else{
	// 	$ionicLoading.hide();
	// }

  $scope.login = function(data) {
  	if (data.email && data.password) {
	    var result = LoginService.login(data.email, data.password);
	    
	    $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
	    
	    result.then(function(data) {
	      $ionicLoading.hide();

	      console.log(data)
	      if (data.status == 200) {
	      	localStorage.setItem("token", data.token);
	      	data.email = "";
      		data.password = "";
	      	$state.go('cards');
	      }else{
	      	$ionicLoading.show({template: '<p>Error</p>', duration: 1300});
	      }

	    });

  	}else{
  		//Show error empty field
  	}
  }// end login

})

.controller('SignupCtrl', function ($scope, $ionicLoading, $state, SignupService) {
	
	// $ionicLoading.show({
 //    template: '<i class="icon ion-looping"></i>'
 //  });

  $scope.signup = function(data) {
  	if (data.name && data.email && data.password) {
	    var result = SignupService.login(data.email, data.password);
	    
	    $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
	    
	    result.then(function(data) {
	      $ionicLoading.hide();
	      console.log(data)
	      if (data.status == 200) {
	      	$state.go('login');
		  	 	data.name = "";
		  	 	data.email = "";
		      data.password = "";
	      }else{
	      	$ionicLoading.show({template: '<p>Error</p>', duration: 1300});
	      }

	    });

  	}else{
  		//Show error empty field
  	}
  }// end signup

})

.controller('CardsCtrl', function ($scope, $ionicLoading, $ionicSwipeCardDelegate, cards, $timeout) {
  
  $ionicLoading.show({
    template: '<i class="icon ion-looping"></i>'
  });

  $scope.cards = Array.prototype.slice.call(cards, 0, 0);

  $scope.cardSwiped = function(index) {
    console.log('cardSwiped', index);
    $scope.addCard();
  }

  $scope.cardDestroyed = function(index) {
    console.log(index);
    //Splice remueve en la position 1 del array
    $scope.cards.splice(index, 1);
    console.log('cardDestroyed');
  }
  
  $scope.addCard = function() {
    var newCard = cards[Math.floor(Math.random() * cards.length)];
    newCard.id = Math.random();
    console.log(newCard);
    $scope.cards.push(angular.extend({}, newCard));
  }

  $timeout(function() {
    $ionicLoading.hide();
  }, 400);
})

.controller('CardCtrl', function ($scope, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: '<i class="icon ion-looping"></i>'
  });


  $timeout(function() {
    $ionicLoading.hide();
  }, 400);
})

.controller('DashCtrl', function ($scope) {
})

.controller('FriendsCtrl', function ($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope) {
});
