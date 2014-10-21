'use strict';

/* Services */

angular.module('radoWatchDox.services', [])

.factory('InstagramToken', ['$cookies', function($cookies) {
  var token;
  return function(tkn){
    if(tkn){
      token = localStorage['token'] = tkn;
    }else{
      if(!token && localStorage['token']){
        token = localStorage['token'];
      }
    }
    return token;
  }
}]);