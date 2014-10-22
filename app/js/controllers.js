'use strict';

/* Controllers */

angular.module('radoWatchDox.controllers', [])

.controller('CallbackController', ['$location', 'InstagramToken', 
    function($location, InstagramToken) {
        var hash = $location.hash();
        InstagramToken(hash.substr(hash.indexOf('=')+1));
        $location.hash('').path('/home');
    }])

.controller('HomeController', ['$scope', '$http', 'InstagramToken', 'instagramAuthUrl',
 function($scope, $http, InstagramToken, instagramAuthUrl) {

    $scope.instagramAuthUrl = instagramAuthUrl;
    $scope.token = InstagramToken();

    // if user authorized
    if ($scope.token){
        var storage = localStorage["history"];
        $scope.history = storage ? JSON.parse(storage) : [];
    }

    var successCallback = function(resp, status, headers, config){
        $scope.images = resp.data;
    };

    var addHistoryItem = function(){
        if($scope.history.length > 4){
            $scope.history.splice(0,1);
        }
        $scope.history.push($scope.searchParam);
        localStorage["history"] = JSON.stringify($scope.history);
    }

    $scope.search = function(item){
        if(!item) {
            addHistoryItem();
            item = $scope.searchParam;
            $scope.searchParam = "";
        }

        var config = {
            params: {
                access_token: $scope.token,
                callback: 'JSON_CALLBACK',
                count: 20
            }
        };
        $http.jsonp('https://api.instagram.com/v1/tags/' + item + '/media/recent', config).success(successCallback); 
    }

}]);




