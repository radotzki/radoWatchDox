'use strict';

/* Controllers */

angular.module('radoWatchDox.controllers', [])

.controller('CallbackController', ['$location', 'InstagramToken', 
    function($location, InstagramToken) {
        var hash = $location.hash();
        InstagramToken(hash.substr(hash.indexOf('=')+1));
        $location.hash('').path('/home');
    }])

.controller('HomeController', ['$scope', '$http', 'InstagramToken',
   function($scope, $http, InstagramToken) {

    $scope.token = InstagramToken();

    // if user authorized
    if ($scope.token){
        var storage = localStorage["history"];
        $scope.history = storage ? JSON.parse(storage) : [];
    }

    $scope.search = function(item){
        if(!item) {
            if($scope.history.length > 4){
                $scope.history.splice(0,1);
            }
            $scope.history.push($scope.searchParam);
            localStorage["history"] = JSON.stringify($scope.history);
            item = $scope.searchParam;
            $scope.searchParam = "";
        }

        $http.get('https://api.instagram.com/v1/tags/' + item + '/media/recent?count=20&access_token=' + $scope.token).success(function(data, status, headers, config) {
         $scope.posts = data.data;
     });  
    }

}]);




