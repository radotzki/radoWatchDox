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
    var updateTag = null;

    // if user authorized
    if ($scope.token){
        var storage = localStorage["history"];
        $scope.history = storage ? JSON.parse(storage) : [];
    }

    $scope.getFromHistoy = function(param, data){
        $scope.images = data;
        updateTag = param;
        getInstagramMedia(param);
    }

    $scope.search = function(){
        getInstagramMedia($scope.searchParam);
    }

    var getInstagramMedia = function(tag){
        var config = {params: {access_token: $scope.token, callback: 'JSON_CALLBACK', count: 20}};
        $http.jsonp('https://api.instagram.com/v1/tags/' + tag + '/media/recent', config).success(successCallback); 
    }

    var successCallback = function(resp, status, headers, config){
        if (updateTag==null){
            $scope.images = resp.data;
            addHistoryTag();
        }
        else{
            changeHistoy(resp.data);
        }
    };

    var mergeArray = function(newA, oldA){
        var res;
        var found = false;
        for(var i=0; i<newA.length && !found; i++){
            if (newA[i] == oldA[0]){
                found = true;
                newA.splice(i, newA.length - i);
                oldA.splice(oldA.length - i, i);
                res = newA.concat(oldA);
            }
        }

        if (!found){
            res = newA;
        }
        return res;
    }

    var changeHistoy = function(newData){
        $scope.images = mergeArray(newData, $scope.images);

        for(var i=0; i < $scope.history.length; i++) {
            if($scope.history[i].param == updateTag){
                $scope.history[i].data = $scope.images;
                localStorage["history"] = JSON.stringify($scope.history);
            }
        }

        updateTag = null;
    }

    var addHistoryTag = function(){
        if($scope.history.length > 4){
            $scope.history.splice(0,1);
        }
        $scope.history.push({param: $scope.searchParam, data: $scope.images});
        localStorage["history"] = JSON.stringify($scope.history);
        $scope.searchParam = "";
    }

}]);




