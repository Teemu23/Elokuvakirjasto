MyApp.service('FirebaseService', function ($firebaseArray) {
    var firebaseRef = new Firebase("https://elokuvakirjasto-2311.firebaseio.com/movies");
    var movies = $firebaseArray(firebaseRef);

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    };


    this.getMovies = function () {
        return movies;
    };

    this.addMovie = function (movie) {
        movies.$add(movie);
    };

    this.editMovie = function (movie) {
        movies.$save(movie);
    };

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    };

});

MyApp.service('APIService', function($http){
    
  this.findMovie = function(name, year){
    return $http.get('http://www.omdbapi.com', { params: { s: name, y: year } });
  }
});

