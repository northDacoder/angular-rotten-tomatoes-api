var app = angular.module("movieApp", ['ui.bootstrap', 'ngResource']);

app.factory('rotten_tomatoes', function($resource){

	return {
		fetchMovie: function(movie, number, callback){
			var query = movie;
			var limit = number - 1;


			var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=:key&q=:movie_title&page_limit=:limit&callback=JSON_CALLBACK', {
				key: 'dpjxf3xsjbpj5wpmduveeseb',
				limit: 10
			}, {
				fetch:{method:'JSONP'}
			});

			api.fetch({movie_title: query, limit: limit}, function(response){

				callback(response);

			});
		}
	}

});

app.controller('movieController', function($scope, rotten_tomatoes){

	$scope.title = "harry potter";
	$scope.limit = "10";

	$scope.search = function() {
		var query = $scope.title;
		var nummovies = $scope.limit;

		rotten_tomatoes.fetchMovie(query, nummovies, function(data){

			var result = data.movies;
			$scope.result = result;

		});
	}
	
	search();
});
