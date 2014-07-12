angular.module('starter.services', [])

.factory('CardsFactory', function() {
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
