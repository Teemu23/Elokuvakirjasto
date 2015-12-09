describe('MovieListController', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MyA');

    	FirebaseServiceMock = (function(){
            
            var movies = [
                {
                    nimi: "Lord",
                    ohjaaja: "James",
                    julkaisuvuosi: "1002",
                    kuvaus: "vaellus"
                },
                {
                    nimi: "Of the",
                    ohjaaja: "Cameron",
                    julkaisuvuosi: "2004",
                    kuvaus: "keskimaassa"
                }
            ];
			return {
                            getMovies: function(){
                                return movies;
                            },
                            addMovie: function(movie){
                                movies.push(movie);
                            }
				// Toteuta FirebaseServicen mockatut metodit tähän
			};
		})();

		// Lisää vakoilijat
	     spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
             spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('MovieListController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function(){
            expect(scope.movies.length).toBe(2);
            expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
	});

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
		expect(true).toBe(false);
	});
});