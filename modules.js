// prints 5 arguments of the wrapper function
// console.log(arguments);

// prints IIFE function with parameters
// console.log(require('module').wrapper);

// module.exports
const Calc = require('./test-module-1');
const a = new Calc();
console.log(a.add(5, 6));
console.log(a.multiply(5, 6));

// exports
const Calc2 = require('./text-module-2');
const { add, subtract, multiply, divide } = require('./text-module-2');
console.log(subtract(10, 15));
console.log(add(10, 15));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
