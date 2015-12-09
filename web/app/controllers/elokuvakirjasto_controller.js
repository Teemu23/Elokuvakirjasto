MyApp.controller('ListMoviesController', function ($scope, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
});

MyApp.controller('AddMovieController', function ($scope, $location, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
    
    $scope.addMovie = function(){
        if($scope.newMovie !== ''){
            FirebaseService.addMovie({
                nimi: $scope.nimi,
                ohjaaja: $scope.ohjaaja,
                julkaisuvuosi: $scope.vuosi,
                kuvaus: $scope.kuvaus
            });
            $scope.newMovie = '';
            $scope.nimi = '';
            $scope.ohjaaja = '';
            $scope.vuosi = '';
            $scope.kuvaus = '';
            $location.path('/movies');
        }
    };
    

});