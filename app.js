var app = angular.module("movieApp", ['ngResource']);

app.factory('rotten_tomatoes', function($resource){

	return {
		fetchMovie: function(callback){

			var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=:key&q=:movie_title&page_limit=1&callback=JSON_CALLBACK', {
				key: 'dpjxf3xsjbpj5wpmduveeseb',
				movie_title: 'Batman'
			}, {
				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){

				console.log(response);
				callback(response);

			});
		}
	}

});

app.controller('movieController', function($scope, rotten_tomatoes){

	rotten_tomatoes.fetchMovie(function(data){
		console.log("Yo bro, movie is Dark Knight");
		var result = data.movies; 
		var movie = result[0].title; 
		console.log(movie);
		$scope.movie = movie;
		$scope.result = result;
	});
});
