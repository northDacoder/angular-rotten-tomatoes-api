// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

var app = angular.module("movieApp", ['ngResource']);

// Create and register the new "instagram" service
app.factory('rotten_tomatoes', function($resource){

	return {
		fetchMovie: function(callback){

			// The ngResource module gives us the $resource service. It makes working with
			// AJAX easy. Here I am using the client_id of a test app. Replace it with yours.

			var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
				movie_title: 'Batman'
			},{
				// This creates an action which we've chosen to name "fetch". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.

				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){

				// Call the supplied callback function
				callback(response.data);

			});
		}
	}

});