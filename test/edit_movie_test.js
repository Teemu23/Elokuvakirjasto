describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {

            var movies = [{
                    nimi: "Lord",
                    ohjaaja: "James",
                    julkaisuvuosi: "1002",
                    kuvaus: "vaellus"
                }];
            return {
                getMovie: function (key, done) {
                    if (key === 'abc123') {
                        done({
                            nimi: "Lord",
                            ohjaaja: "James",
                            julkaisuvuosi: "1002",
                            kuvaus: "vaellus"
                        });
                    } else {
                        done(null);
                    }
                },
                getMovies: function () {
                    return movies;
                },
                editMovie: function (movie) {
                    movies.$save(movie);
                }
            };
        })();

        RouteParamsMock = (function () {
            return {
                key: 'abc123'
            };
        });

        // Lisää vakoilijat
         spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
         spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('EditMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        scope.getMovie("abc123", function(data){
            scope.data = data;
        });
        expect(scope.data).toBe(scope.movies[0]);
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.getMovie("abc123", function(data){
            scope.data = data;
        });
         expect(scope.data.nimi).toBe("Lord");
        scope.data.nimi = "Uusi nimi";
        scope.editMovie(scope.data);
        expect(scope.data.nimi).toBe("Uusi nimi");
        expect(FirebaseServiceMock.editMovie()).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.getMovie("abc123", function(data){
            scope.data = data;
        });
         expect(scope.data.nimi).toBe("Lord");
        scope.data.nimi = "";
        scope.editMovie(scope.data);
        expect(scope.data.nimi).toBe("Lord");
        expect(FirebaseServiceMock.editMovie()).not.toBeCalled();
    });
});