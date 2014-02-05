'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['ngResource']).
  config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/httpbooks', {templateUrl: 'partials/resourcebooks.html', controller: 'HttpBooksController'});
	$routeProvider.when('/resourcebooks', {templateUrl: 'partials/resourcebooks.html', controller: 'ResourceBooksController'});
  }]);
