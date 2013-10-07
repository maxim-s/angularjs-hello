'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/books', {templateUrl: 'partials/books.html', controller: 'BooksController'});
    //$routeProvider.otherwise({redirectTo: '/'});
  }]);
