MyApp.run(function (AuthenticationService, $rootScope) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});

MyApp.controller('ListMoviesController', function ($scope, currentAuth, $location, FirebaseService, APIService) {
    if (!currentAuth) {
        $location.path('/');
    }
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

MyApp.controller('AddMovieController', function ($scope, currentAuth, $location, FirebaseService) {
    if (!currentAuth) {
        $location.path('/');
    }
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

MyApp.controller('ShowMovieController', function ($scope, currentAuth, $routeParams, FirebaseService) {
    if (!currentAuth) {
        $location.path('/');
    }
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.data = data;
    });


});


MyApp.controller('EditMovieController', function ($scope, currentAuth, $location, $routeParams, FirebaseService) {
    if (!currentAuth) {
        $location.path('/');
    }
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

MyApp.controller('UserController', function ($scope, $location, AuthenticationService) {
    
    $scope.logOut = function(){
        AuthenticationService.logUserOut();
        $location.path('/');
    };

    $scope.logIn = function () {
        AuthenticationService.logUserIn($scope.email, $scope.password)
                .then(function () {
                    $location.path('/movies');
                })
                .catch(function () {
                    $scope.message = 'Väärä sähköpostiosoite tai salasana!'
                });
    }

    $scope.register = function () {
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
                .then(function () {
                    AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                            .then(function () {
                                $location.path('/movies');
                            });
                })
                .catch(function () {
                    $scope.messageReg = 'Tapahtui virhe! Yritä uudestaan';
                });
    }
});