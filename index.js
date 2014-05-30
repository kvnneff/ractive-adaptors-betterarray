'use strict';

var array = require('array'),
    ArrayWrapper,
    adaptor;

/**
 * Expose `adaptor`
 * @return {Object}           Returns adaptor object
 */
module.exports = function adaptor() {
    var filter,
        wrap;

    /**
     * Filter for array objects
     * @param  {Object} object Data object from Ractive
     * @return {Object}        Returns object if its a better array
     */
    filter = function filter(object) {
        return object instanceof array;
    };

    /**
     * Wrap the better array
     * @param  {Object} ractive  Ractive
     * @param  {Object} object   Better array
     * @param  {String} keypath  Ractive keypath
     * @param  {Function} prefixer Ractive prefixer
     * @return {Object}          Returns wrapped object
     */
    wrap = function wrap(ractive, object, keypath) {
        return new ArrayWrapper(ractive, object, keypath);
    };

    return {
        filter: filter,
        wrap: wrap
    };
};

/**
 * Array wrapper
 * @param  {Object} ractive  Ractive
 * @param  {Object} object   Better array
 * @param  {String} keypath  Ractive keypath
 * @param  {Function} prefixer Ractive prefixer
 */
ArrayWrapper = function ArrayWrapper(ractive, betterArray, keypath, prefixer) {
    var self = this;

    this.value = betterArray
    this.changing = false;

    this.changeHandler = function changeHandler(item, index) {
        self.changing = true;
        ractive.set(keypath[index], betterArray[index]);
        self.changing = false;
    };

    betterArray.on('add', this.changeHandler);
    betterArray.on('remove', this.changeHandler);
};

ArrayWrapper.prototype.get = function get() {
    var tempArray = [],
        prop;

    for (prop in this.value) {
        if  (this.value.hasOwnProperty(prop)) {
            tempArray.push(prop);
        }
    }
    
    return tempArray;
};

ArrayWrapper.prototype.reset = function reset(betterArray) {
    if (this.changing) {
        return;
    }

    return false
};

ArrayWrapper.prototype.teardown = function teardown() {
    this.value.off('add', this.changeHandler);
    this.value.off('remove', this.changeHandler);
};