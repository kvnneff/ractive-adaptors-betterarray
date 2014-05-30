/*global describe, it*/
'use strict';

var should = require('should'),
    Ractive = require('ractive'),
    array = require('array'),
    adaptor = require('..'),
    collection,
    ractive,
    Adaptor;

Adaptor = Ractive.adaptors.arrayjs = adaptor();

collection = array();
collection.push('Foo');

ractive = new Ractive({
    adapt: ['arrayjs']
});

ractive.set('collection', collection);

describe('Ractive Modella', function () {
    it('defines the required Ractive operations', function (done) {
        Adaptor.filter.should.be.a.function;
        Adaptor.wrap.should.be.a.function;
        done();
    });

    it('attaches onchange handler to model', function (done) {
        collection._callbacks.add.length.should.equal(1);
        collection._callbacks.remove.length.should.equal(1);
        done();
    });

    it('updates the collection on add and remove', function (done) {
        collection.push('Bar');
        collection.push('Baz');
        collection.splice(0, 1);
        ractive.get('collection')[0].should.equal('Bar');

        done();
    });

    it('updates the collection on sort', function (done) {
        ractive.get('collection')[0].should.equal('Bar');
        collection.push('Apple');
        collection.sort();
        ractive.get('collection')[0].should.equal('Apple');
        done();
    });

    it('updates the collection on reverse', function (done) {
        ractive.get('collection')[0].should.equal('Apple');
        collection.reverse();
        ractive.get('collection')[0].should.equal('Baz');
        done();
    });

    it('wraps the get method', function (done) {
        var func = function () {return 1 + 1};
        collection.push(func);
        ractive.get('collection')[3]().should.equal(2);
        done();
    });

    it('wraps the teardown method', function (done) {
        ractive.teardown();
        collection._callbacks.add.length.should.equal(0);
        collection._callbacks.remove.length.should.equal(0);

        done();
    });

    it('replaces the array when reset is given a new array ', function (done) {
        var newArray = array();
        newArray.push('River');

        ractive.reset({collection: newArray});
        ractive.get('collection')[0].should.equal('River');
        done();
    });

    it('clears the array when view is reset without a new array', function (done) {
        ractive.reset();
        ractive.data.should.be.empty;
        done();
    });
});