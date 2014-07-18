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
	
	$ionicLoading.show({template: '<i class="icon ion-looping"></i>'});

	token = localStorage.getItem("token");
	if (token) {
		$ionicLoading.hide();
		$state.go('cards');
	}else{
		$ionicLoading.hide();
	}

  $scope.login = function(data) {
  	if (data.email && data.password) {
	    var result = LoginService.login(data.email, data.password);
	    
	    $ionicLoading.show({template: '<i class="icon ion-looping"></i>', showBackdrop: false});
	    
	    result.then(function(data) {
	      $ionicLoading.hide();
	      if (data.status == 200) {
	      	localStorage.setItem("token", data.token);
	      	data.email = "";
      		data.password = "";
	      	$state.go('cards');
	      }else{
	      	$ionicLoading.show({template: '<p>Error</p>', duration: 1300, showBackdrop: false});
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

  $scope.signup = function(inputs) {
  	if (inputs.name && inputs.email && inputs.password) {
	    var result = SignupService.login(inputs.name, inputs.email, inputs.password);
	    
	    $ionicLoading.show({template: '<i class="icon ion-looping"></i>', showBackdrop: false});
	    
	    result.then(function(data) {
	      $ionicLoading.hide();
	      console.log(data);

	      if (data.status == 200) {
	      	$state.go('login');
		  	 	inputs.name = "";
		  	 	inputs.email = "";
		      inputs.password = "";
	      }else{
	      	$ionicLoading.show({template: '<p>Error</p>', duration: 1300, showBackdrop: false});
	      }

	    });

  	}else{
  		//Show error empty field
  	}
  }// end signup

})

.controller('CardsCtrl', function ($scope, $ionicLoading, $ionicSwipeCardDelegate, cards, $timeout) {
  
  $ionicLoading.show({template: '<i class="icon ion-looping"></i>', showBackdrop: false});

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

.controller('CardCtrl', function ($scope, $ionicLoading, CardDetailService, $stateParams, $ionicModal, $ionicPopup) {

  $ionicLoading.show({template: '<i class="icon ion-looping"></i>', showBackdrop: false});

  $ionicModal.fromTemplateUrl('templates/establishment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.openMap = function(lat, lng){
    // $ionicLoading.show({template: '<i class="icon ion-looping"></i>', showBackdrop: false});
    console.log(lat, lng);
  }; 

  $scope.onFav = function (eId) {
    promi = CardDetailService.onFav(eId);
    promi.then(function (datos) {
      if (datos.status == 200) {
        $ionicLoading.show({template: '<i class="icon ion-checkmark-round"></i>', showBackdrop: false, duration: 800});
      }else{
        $ionicLoading.show({template: '<p>Error</p>', duration: 1300, showBackdrop: false});
      }
    })
  }

  var result = CardDetailService.getDetails($stateParams.promoId);

  $scope.details = {}

  result.then(function(data) {
    if (data.status == 200) {
      $scope.details = data.promotion;
      $ionicLoading.hide();
    }else{
      $ionicLoading.show({template: '<p>Error</p>', duration: 1300, showBackdrop: false});
    }
  })

  $scope.onHeart = function (promoId) {
    promi = CardDetailService.onHeart(promoId);
    promi.then(function (datos) {
      if (datos.status == 200) {
        $ionicLoading.show({template: '<i class="icon ion-checkmark-round"></i>', showBackdrop: false, duration: 800});
      }else{
        $ionicLoading.show({template: '<p>Error</p>', duration: 1300, showBackdrop: false});
      }
    })
  }

  $scope.onPido = function (promoId){
    var confirmPopup = $ionicPopup.confirm({
      title: 'Estas a punto de pedir esta promocion',
      template: 'Estas seguro?',
      cancelText: 'Cancelar',
      okText: 'Si!'
    });
    confirmPopup.then(function(res) {
      if(res) {
        promi = CardDetailService.onPido(promoId);
        promi.then(function (datos) {
          console.log(datos)
          if (datos.status == 200) {
            $ionicLoading.show({template: '<i class="icon ion-checkmark-round"></i>', showBackdrop: false, duration: 800});
          }else{
            $ionicLoading.show({template: '<p>Error</p>', duration: 1300, showBackdrop: false});
          }
        })
      }
    });
  }//En onPido

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
