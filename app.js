var app = angular.module("movieApp", ['ui.bootstrap', 'ngResource']);

app.factory('rotten_tomatoes', function($resource){

	return {
		fetchMovie: function(query, callback){
			var search_query = query;

			var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=:key&q=:movie_title&page_limit=5&callback=JSON_CALLBACK', {
				key: 'dpjxf3xsjbpj5wpmduveeseb',
				movie_title: 'Batman',
			}, {
				fetch:{method:'JSONP'}
			});

			api.fetch({movie_title: search_query}, function(response){

				callback(response);

			});
		}
	}

});

app.controller('movieController', function($scope, rotten_tomatoes){

	$scope.title = "";

	$scope.search = function() {
		var query = $scope.title;

		rotten_tomatoes.fetchMovie(query, function(data){
			console.log(data);
			var result = data.movies;
			$scope.result = result;
		});
	}
});
