angular.module('starter.controllers', ['ionic.contrib.ui.cards', 'ionic'])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
.controller('CardsCtrl', function($scope, $ionicLoading, $ionicSwipeCardDelegate, cards, $timeout) {
  
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

.controller('CardCtrl', function($scope, $ionicLoading, $timeout) {
  
  $ionicLoading.show({
    template: '<i class="icon ion-looping"></i>'
  });


  $timeout(function() {
    $ionicLoading.hide();
  }, 400);
})

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
