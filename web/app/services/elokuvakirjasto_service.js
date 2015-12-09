MyApp.service('FirebaseService', function($firebaseArray){
    var firebaseRef = new Firebase("https://elokuvakirjasto-2311.firebaseio.com/movies");
    var movies = $firebaseArray(firebaseRef);
    
    
    this.getMovies = function(){
        return movies;
    };
    
    this.addMovie = function(movie){
        movies.$add(movie);
    };
    
});

