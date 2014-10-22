'use strict';

// Declare app level module which depends on filters, and services
angular.module('radoWatchDox', ['radoWatchDox.services', 'radoWatchDox.controllers', 'radoWatchDox.filters'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $location) {
	$location.html5Mode(true).hashPrefix('!');

	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	})
	.when('/callback', {
		templateUrl:'partials/callback.html',
		controller: 'CallbackController'
	})
	.otherwise({redirectTo: '/home'});
}])