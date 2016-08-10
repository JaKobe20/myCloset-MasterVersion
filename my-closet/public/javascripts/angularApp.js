var app = angular.module('myCloset', ['ui.router'])

.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainCtrl'
			})

			.state('closet', {
				url: '/closet/{id}',
				templateUrl: '/closet.html',
				controller: 'ClosetCtrl'

			});

			$urlRouterProvider.otherwise('home');

	}])


.factory('clothes', [function(){
	var o = {
		clothes: []
	};
	return o;
}])


.controller('MainCtrl', [
'$scope',
'clothes',

function($scope, clothes){
  $scope.test = 'Hello world!';

  $scope.clothes = clothes.clothes;

  $scope.addClothe = function() {
  	if ($scope.type === '') { return; }
  	
  	$scope.clothes.push({
  			type: $scope.type, 
  			size: $scope.size, 
  			color: $scope.color, 
  			image: $scope.image,
  			comments: []

  	});

  	$scope.type = '';
  	$scope.size = '';
  	$scope.color = '';
  	$scope.image = '';

  }

}])

.controller('ClosetCtrl', [
	'$scope',
	'$stateParams',
	'clothes',

	function($scope, $stateParams, clothes) {
		$scope.clothe = clothes.clothes[$stateParams.id];

		$scope.addComment = function() {
  	if ($scope.body === '') { return; }
  	
  	$scope.clothe.comments.push({
  			body: $scope.body, 
        author: $scope.author
  			
  	});

  	$scope.body = '';
  }

	}]);


