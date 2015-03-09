var utils = {};

utils.isArray = require('lodash.isarray');
utils.isFunction = require('lodash.isfunction');
utils.forEach = require('lodash.foreach');

/**
 * Returns an array of strings with [0] being the given names and 
 * [1] being the family name. This function assumes that there is 
 * only one family name.
 */
utils.splitName = function(name) {
  if(name) {    
    return name.split(/\s+(?=\S*$)/);
  } else {
    return ['',''];
  }
};

/**
 * Takes in a simple url match pattern and returns a regex
 * for matching. Special chars are escaped except for * which
 * will have a . prepended to it.
 */
utils.urlPatternToRegex = function(pattern){
  pattern = pattern.replace(/\//g, '\/');
  pattern = pattern.replace(/\./g, '\.');
  pattern = pattern.replace(/\-/g, '\-');
  pattern = pattern.replace(/\*/g, '.*');
  return new RegExp(pattern);
};

/**
 * Returns the hash values as a map {key:value}
 */
utils.getHashParts = function() {
  var hashParts = {};
  if( window.location.hash ) {
    this.forEach(window.location.hash.substring(1).split('&'), function(part) {
      var partPieces = part.split('=');
      hashParts[partPieces[0]] = partPieces[1];
    });
  }
  return hashParts;
};

module.exports = utils;