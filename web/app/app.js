// Toteuta moduulisi tänne
var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: '/app/views/etusivu.html',
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
            .otherwise({
                redirectTo: '/',
                controller: 'ListMoviesController'
            });

});
