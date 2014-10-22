'use strict';

/* Filters */

angular.module('radoWatchDox.filters', [])

.filter('reverse', function() {
  return function(items) {
    return items ? items.slice().reverse() : null;
  };
});