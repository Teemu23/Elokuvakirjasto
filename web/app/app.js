// Toteuta moduulisi tänne
var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/Elokuvakirjasto/web/app/views/login.html',
                controller: 'UserController'
            })
            .when('/movies', {
                templateUrl: '/Elokuvakirjasto/web/app/views/movies.html',
                controller: 'ListMoviesController',
                resolve: {
                        currentAuth: function(AuthenticationService) {
                            return AuthenticationService.checkLoggedIn();
                         }
                     }
            })
            .when('/movies/new', {
                templateUrl: '/Elokuvakirjasto/web/app/views/newMovie.html',
                controller: 'AddMovieController',
                resolve: {
                        currentAuth: function(AuthenticationService) {
                            return AuthenticationService.checkLoggedIn();
                         }
                     }
            })
            .when('/movies/:id', {
                templateUrl: '/Elokuvakirjasto/web/app/views/showMovie.html',
                controller: 'ShowMovieController',
                resolve: {
                        currentAuth: function(AuthenticationService) {
                            return AuthenticationService.checkLoggedIn();
                         }
                     }
            })
            .when('/movies/:id/edit', {
                templateUrl: '/Elokuvakirjasto/web/app/views/editMovie.html',
                controller: 'EditMovieController',
                resolve: {
                        currentAuth: function(AuthenticationService) {
                            return AuthenticationService.checkLoggedIn();
                         }
                     }
            })
            .otherwise({
                redirectTo: '/',
                controller: 'ListMoviesController'
            });

});

MyApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
