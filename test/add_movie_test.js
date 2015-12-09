describe('AddMovieController', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {

            var movies = [];
            return {
                addMovie: function (movie) {
                    movies.push(movie);
                },
                getMovie: function () {
                    return movies;
                }
            };
        })();

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('AddMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        expect(scope.getMovies.length).toBe(0);
        var movie = {nimi: "Pekka", ohjaaja: "Simo", julkaisuvuosi: "1999", kuvaus: "Matkalla"};
        scope.addMovie(movie);
        expect(scope.getMovies.length).toBe(1);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        expect(scope.getMovies.length).toBe(0);
        var movie = {nimi: "", ohjaaja: "Teppo", julkaisuvuosi: "", kuvaus: "Matkalla"};
        scope.addMovie(movie);
        expect(scope.getMovies.length).toBe(0);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });
});