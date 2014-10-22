'use strict';

/* Services */

angular.module('radoWatchDox.services', [])
.value('instagramAuthUrl', 'https://instagram.com/oauth/authorize/?response_type=token' +
 '&client_id=' +'a9a40b386e6649bea01158542b42df5c' +
 '&redirect_uri=' + 'http://radowatchdox.herokuapp.com/callback')

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