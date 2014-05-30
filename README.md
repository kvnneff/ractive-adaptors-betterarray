# Ractive-adaptors-betterarray
[![Build Status](https://travis-ci.org/staygrimm/ractive-adaptors-betterarray.svg?branch=master)](https://travis-ci.org/staygrimm/ractive-adaptors-betterarray)

[Ractive](http://ractivejs.org/) adaptor plugin for [array](https://github.com/MatthewMueller/array).

## Installation

Component:

    component install staygrimm/ractive-adaptors-betterarray

npm:

    npm install ractive-adaptors-betterarray

## Example

```js
var betterArray = require('ractive-adaptors-betterarray'),
    array = require('array'),
    Ractive = require('ractive'),
    collection;
    
collection = array([
    {name: 'Apple', color: 'red'},
    {name: 'Pear', color: 'green'},
    {name: 'Orange', color: 'orange'} 
]);

view = new Ractive({
    template: '<span>{{model.name}} - {{model.color}}</span>',
    data: {collection: collection},
    adapt: [betterArray]
});

view.set('model', view.get('collection').find({color: 'green'}));

view.toHTML(); // <span>Apple - red</span>
```


## Test

    npm install && make test

## License

MIT