'use strict';

/* Services */

angular.module('radoWatchDox.services', [])
.value('instagramAuthUrl', 'https://instagram.com/oauth/authorize/?response_type=token' +
 '&client_id=' +'7ec7b39f3a4e4eba812017a561b155af' +
 '&redirect_uri=' + 'http://localhost:5000/callback')

.factory('InstagramToken', [function() {
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