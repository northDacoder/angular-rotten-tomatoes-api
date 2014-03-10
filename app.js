var app = angular.module("movieApp", ['ngResource']);

app.factory('rotten_tomatoes', function($resource){

	return {
		fetchMovie: function(callback){

			var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=:key&q=:movie_title&page_limit=5&callback=JSON_CALLBACK', {
				key: 'dpjxf3xsjbpj5wpmduveeseb',
				movie_title: 'Batman'
			}, {
				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){

				callback(response);

			});
		}
	}

});

app.controller('movieController', function($scope, rotten_tomatoes){

	rotten_tomatoes.fetchMovie(function(data){
		var result = data.movies; 
		$scope.result = result;
		
	});
});
