MyApp.controller('ListMoviesController', function ($scope, $location, FirebaseService, APIService) {
    $scope.movies = FirebaseService.getMovies();
    $scope.moviesCount = 0;
    
    $scope.removeMovie = function (index) {
        FirebaseService.removeMovie($scope.movies[index]);
    };
    $scope.haeElokuvat = function () {
        APIService.findMovie($scope.nimiHaku, $scope.vuosiHaku).success(function (movies) {
            $scope.moviesHaku = movies;
            $scope.moviesCount = $scope.moviesHaku.Search.length;
        });
        $scope.nimiHaku = '';
        $scope.vuosiHaku = '';
        
    };




});

MyApp.controller('AddMovieController', function ($scope, $location, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();

    $scope.addMovie = function () {
        if ($scope.newMovie !== '') {
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

MyApp.controller('ShowMovieController', function ($scope, $routeParams, FirebaseService) {
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.data = data;
    });


});


MyApp.controller('EditMovieController', function ($scope, $location, $routeParams, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.data = data;
    });
    $scope.editMovie = function () {
        if ($scope.editMovie !== '') {
            $scope.data.nimi = $scope.nimi;
            $scope.data.ohjaaja = $scope.ohjaaja;
            $scope.data.julkaisuvuosi = $scope.vuosi;
            $scope.data.kuvaus = $scope.kuvaus;
            FirebaseService.editMovie($scope.data);

            $scope.editMovie = '';
            $scope.nimi = '';
            $scope.ohjaaja = '';
            $scope.vuosi = '';
            $scope.kuvaus = '';
            $location.path('/movies/' + $routeParams.id);
        }
    };
});

MyApp.controller('MyController', function ($scope, APIService) {
    APIService.findMovie('lord').success(function (movies) {
        $scope.movies = movies;
    });
});