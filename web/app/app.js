// Toteuta moduulisi tänne
var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/Elokuvakirjasto/web/app/views/etusivu.html',
                controller: 'ListMoviesController'
            })
            .when('/movies', {
                templateUrl: '/Elokuvakirjasto/web/app/views/movies.html',
                controller: 'ListMoviesController'
            })
            .when('/movies/new', {
                templateUrl: '/Elokuvakirjasto/web/app/views/newMovie.html',
                controller: 'AddMovieController'
            })
            .when('/movies/:id', {
                templateUrl: '/Elokuvakirjasto/web/app/views/showMovie.html',
                controller: 'ShowMovieController'
            })
            .when('/movies/:id/edit', {
                templateUrl: '/Elokuvakirjasto/web/app/views/editMovie.html',
                controller: 'EditMovieController'
            })
            .otherwise({
                redirectTo: '/',
                controller: 'ListMoviesController'
            });

});

MyApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
