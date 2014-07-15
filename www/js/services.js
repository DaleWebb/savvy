angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  return {
    login: function(email, password) {
      var defer = $q.defer(); 
      
      // replace timeout function with actual $http call
      // the $http call will return a promise equivelant to
      // defer.promise;

      var xsrf = { email: email, password: password };
      $http({
        method: 'POST',
        url: 'http://savvy.railsplayground.net/api/user/signin',
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: xsrf
      }).success(function(data) {
        // presume data contains json {token: some token}
        defer.resolve(data);
      }).error(function(){
       defer.resolve();
      });      
      return defer.promise;
    }
  }  
})

.service('SignupService', function ($q, $http) {
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  return {
    login: function(name, email, password) {
      var defer = $q.defer(); 
      
      // replace timeout function with actual $http call
      // the $http call will return a promise equivelant to
      // defer.promise;

      var xsrf = { name: name, email: email, password: password };
      $http({
        method: 'POST',
        url: 'http://savvy.railsplayground.net/api/user/signup',
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: xsrf
      }).success(function(data) {
        // presume data contains json {token: some token}
        defer.resolve(data);
      }).error(function(){
       defer.resolve();
      });      
      return defer.promise;
    }
  }  
})

.factory('CardsService', function() {
  return {
    getCards: function() {
      return cards = [
      { id_promo: 1, title: '20 % en comida', image: 'img/ionic.png' },
      { id_promo: 2, title: 'Where is this?', image: 'img/pic.png' },
      { id_promo: 4, title: 'beach is this?', image: 'img/pic2.png' },
      { id_promo: 5, title: 'kind of clouds are these?', image: 'img/pic3.png' }
    ]
    }
  };
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
