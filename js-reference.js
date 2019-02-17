


// PROMISES
// ------------------------------
/*

A promise has one of these 4 states
 - pending			// initial state
 - fulfilled		// successful operation					.then(onFulfillment) -> async actions
 - rejected			// failed operation						.then(..., onRejection) .catch(onRejection) -> error handling
 - settled			// finalised (after success or error)	.then() .catch()

*/
function imgLoad(url) {
	// Create new 'Promise' object with an anonymous callback
	return new Promise(function(resolve, reject){
		
		// init AJAX request
		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.responseType = 'blob';
		request.onload = function() {
			if (request.status === 200) {
				
				// fulfill request
				resolve(request.response);
			} else {
				
				// reject request
				reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
			}
		};
		request.onerror = function() {
			
			// reject request
			reject(Error('There was a network error.'));
		};
		request.send();
	});
}
/*
imgLoad('myLittleVader.jpg').then(
	// The first runs when the promise resolves
	function(response) {
		var myImage = new Image();
		var imageURL = window.URL.createObjectURL(response);
		myImage.src = imageURL;
		document.querySelector('body').appendChild(myImage);
	},
	// The second runs when the promise fails
	function(Error) {
		console.log(Error);
	}
);


ASYNC FUNCTIONS, AWAIT STATEMENTS
------------------------------
// prototype: AsyncFunction

// you can use async functions to manage promises in a cleaner way
// calling an async function ALWAYS returns a Promise, if the body of the function returns a value, then that makes that promise resolve
// if the function throws an error instead, then the promise is rejected
*/
async function myAsyncFunction( number ) {
	if( number < 10 ) {
		throw 'error'
	} else {
		return number * 2;
	}
}
myAsyncFunction(5).catch( e => {console.log(e)} )		// logs 'error'
myAsyncFunction(15).then( v => {console.log(v)} )		// logs 30
/*

// you can use async function statements
var myFunction = async function() {}

// inside async functions you can use an 'await' statement to call other promises, this does two things
// - pauses the execution of the function until that promise is resolved (or rejected)
// - automatically unwraps the resolved (or rejected) value of that promise, so you can pass it to a variable straight away
// - also, if the promised called with 'await' is rejected, and that statement is not within a try block, then the whole async function is also automatically rejected
*/
function resolveIn2Secs(number) {
	return new Promise( (resolve, reject) => {
		setTimeout( () => resolve( number ), 2000 );
	});
}
function rejectIn2Secs(number) {
	return new Promise( (resolve, reject) => {
		setTimeout( () => reject( 'lol error' ), 2000 );
	});
}
async function myAwaitFunction1( number ) {
	let number1, number2, number3;
	number1 = await resolveIn2Secs( number );			// waits 2 seconds, gets number back
	try {
		number2 = await rejectIn2Secs( number );		// waits another 2 seconds, callback fails but is inside a 'try' statement, so the async function continues running
	} catch(e) {
		number = 0;
	}
	number3 = await rejectIn2Secs( number );			// waits another 2 seconds, callback fails and causes the whole async function to also be rejected while passing through the same error data
	return number + number1 + number2 + number3;		// unreachable
}
myAwaitFunction1( 10 ).then( v => {console.log('success: '+v)} ).catch( v => {console.log('error: '+v)} );		// logs error after 6 seconds

// in the previous example, using await immediately in a promise makes everything else wait for that promise to be resolved
// but you can also create multiple promises simultaneaously, and then use await afterwards, this will make the promises start running in parallel, but have their valeus extracted sequentially
async function myAwaitFunction2( number ) {
	let number1 = resolveIn2Secs(20);
	let number2 = resolveIn2Secs(30);
	return number + await number1 + await number2;
}
myAwaitFunction2( 10 ).then( v => {console.log('success: '+v)} ).catch( v => {console.log('error: '+v)} );		// logs 60 after 2 seconds

// you can use async methods as object and class methods
// also as arrow functions


// FUNCTIONS
// ------------------------------
// function definition, declaration, statement
// function funcName() {}

// function expressions (anonymous)
// var funcName = function() {}

// function expressions (named), useful for recurrent functions or to help with debugging
// var funcName = function name(val) { return n < 2 ? 1 : name(val) }

// function expressions are also useful to pass as arguments for other functions

// you can use the Function() constructor to create functions from a string at runtime ( like with eval() )

// Recursion: a function can call itself in three ways:
// - the function's name
// - the arguments.callee property
// - the in-scope variable that refers to the function

/*

e.g:

var foo = function bar() {
	bar();
	arguments.callee();
	foo();
};

*/

// SCOPE, FUNCTION STACK, CLOSURES
// ... already knew this...

// 'arguments' object
// you can access all the arguments passed to a function with the 'arguments' object, which is an array-like object
// this means you can use subscripts and read the .length property, but any other array methods are not available

// default arguments
// before you had to check each argument against 'undefined', e.g. typeof number === 'undefined'
// now you can also just assing the default value in the function definition, e.g. function foo(number=1)

// 'rest' parameters
// similar to 'arguments', but only includes the arguments passed after the named parameters defined by the function, and it is an actual array object

// 'theArgs' captures all parameters after the first one
function multiply(multiplier, ...theArgs) {
	return theArgs.map(x => multiplier * x);
}
var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]


// ARROW FUNCTIONS
// arrow functions are shorter anonymous functions
var a = [
	'Hydrogen',
	'Helium',
	'Lithium',
	'Beryllium'
];
console.log( a.map( function(s) { return s.length } ) );
console.log( a.map( (s) => { return s.length } ) );		// with returned value
console.log( a.map( (s) => { s.length }) );				// without returned value (returns undefined as normal functions)
console.log( a.map( (s) => s.length ) );				// you can omit both the brackets and 'return' if there's only one statement, and you want to return it
console.log( a.map( s => s.length ) );					// you can omit brackets on parameters if there's only one
console.log( a.map( () => 5 ) );
console.log( a.map( s => ({result:s}) ) );			// to return an object literal with a single statement, wrap it in parentheses

// they also capture the value of 'this' from their enclosing context, and keeps it even if it's passed around to other objects and contexts (including being called with .apply, .call or .bind)
// same thing with 'arguments', they remain the same no matter what
// same with 'new.target'
function Person() {
	this.age = 0;
	setInterval(() => {
		// 'this' properly refers to the person object
		// it wouldn't work if the anonymous function wasn't an arrow function
		this.age++;
	}, 1000);
}
var p = new Person();


// PREDEFINED FUNCTIONS
/*

eval()
uneval()
isFinite()
isNaN()
parseFloat()
parseInt()
decodeURI()
decodeURIComponent()
encodeURI()
encodeURIComponent()
escape()	// deprecated
unescape()	// deprecated

*/

// Function binding
/*
you can create a wrapper for a function with a specific definition for 'this' and, optionally, predefined arguments
Function.prototype.bind( thisArg, [arg1, arg2...] )

e.g.
function myFunction( ...args ) {
	return [this, ...args];
}
myFunction(1, 2, 3)										// returns [undefined, 1, 2, 3]
var emptyObj = {}
var myVariation = myFunction.bind( emptyObj, 5, 6 );	// returns a callable function with a predetermined 'this' and the first 2 parameters
myVariation( 10, 11 )									// returns [emptyObj, 5, 6, 10, 11]


// new.target
The new.target property is available inside function calls and checks whether the function was called using 'new' or not
if it was called with 'new' it returns a reference to the initializer function, otherwise returns 'undefined'

// function.name
The .name property of any function will return its name
- empty string for anonymous functions statements
- named function statements will use that name, even if they were assigned to a variable with a different name
- if the function was bound to an object using .bind, the name will be prepended by 'bound funcname'
- accessor properties are prepended by 'get' or 'set'
- if a method has a symbol key, and that symbol key has a label, then the name will be '[symbol label]'
- 


// OPERATORS
// ------------------------------
/*

ASSIGNMENT:
x = y
x += y
x -= y
x *= y
x /= y
x %= y
x **= y		// exponential assignment
x <<= y		// bitwise left shift
x >>= y		// bitwise right shift
x >>>= y	// bitwise unsigned right shift
x &= y		// bitwise AND assignment
x |= y		// bitwise OR assignment
x ^= y		// bitwise XOR assignment

DESTRUCTURING:
var foo = [1, 2, 3];
var [one, two, three] = foo;

// with strings
var string = 'lorem ipsum';
var [one, two, three] = string;		// one === 'l', two === 'o', three === 'r'

// with generator instances
var generator = (function*(){ yield 10; yield 20; yield 30; })();
var [one, two, three] = generator;	// one === 10, two === 20, three === 30

// with objects
var {a:x, b, c} = {a: 1, b: 2}		// a:x indicates to take the 'a' property of the object, and assign it to the 'x' variable
									// b and c implicitely take those properties from the object and assigns them to variables with the same name
									// this example results in: x === 1, b ===2, c === undefined
// can passing a primitive as a reference, its prototype properties and methods are used
var {toFixed} = 2					// results in: toFixed === Number.prototype.toFixed
// you can also use computed properties
var name = 'foo'
var {[name]: x} = {foo: 10}			// x === 10

// you can use objects and/or arrays nested in other objects and/or arrays

// you can use rest parameters

// you can define default values for potentially undefined values
var [a = 1, b = 2, c = 3] = [5, , undefined]	// a === 5, b === 2, c === 3

// you can also assign values to existing variables
var a, b, c
[a, b, c] = [1, 2, 3]				// a === 1, b === 2, c === 3

// you can also use this as function parameters
(function myFunc( [a, b, c] ) {
	// a === 1, b === 2, c === 3
})( [1, 2, 3 ] )


COMPARISON:
x == y		// returns true for equivalent values of different types
x != y
x === y		// strictly checks for matching value types
x !== y
x > y
x >= y
x < y
x <= y

ARITHMETIC:
x % y
x++		// returns current value, then increases by one
++x		// increases by one, returns increased value
x--
--x
-x		// multiplies by -1
+x		// attempts to convert non-numbers to numbers
x ** y	// returns base (x) to the exponent (y) power, e.g. 4**3 == 4*4*4 == 64

BITWISE:
x & y	// 'AND' operator: only returns 1 where both variables had 1
x | y	// 'OR' operator: returns 1 where at least 1 of the variables had 1
x ^ y	// 'XOR' operator: returns 1 only where both variables don't intersect
~ y		// inverts the bits
x << y	// shifts 'x' 'y' times to the left, adding in zeros to the right
x >> y	// shifts to the right, shifted off bits are added to the left, which preserves signs
x >>> y	// shifts to the right, shifted off bits are discarded, zeroes are added to the left

LOGICAL:
x && y	// AND
x || y	// OR
!x		// NOT

STRING:
string1 + string2

TERNARY:
x ? y : z

COMMA:
var x = [0,1,2,3,4,5,6,7,8,9]
var a = [x, x, x, x, x];
for( var i = 0, j = 9; i <= j; i++, j-- ) {
	console.log('a[' + i + '][' + j + ']= ' + a[i][j]);
}

delete x:
// the 'delete' keyword can be used to delete variables created implicitely (not explicitely) and user-defined properties
// returns true if it can successfully delete the variable/property, or false otherwise
// deleted variables or properties become 'undefined'

// when used on an array item, it removes the item but the rest of the elements keep their positions and the length of the array remains unchanged
// if you want to keep the element but disable it, assign it to 'undefined' instead

typeof x:
// returns a string with the type of value, see 'Data primitives'
// exceptions are:
// - returns 'number' for both integers and floats
// - returns 'object' for null

void(expression):
// runs an expression without returning any values

// RELATIONAL ('in'):
checking for existing properties in an array or object
if('key' in element) {
	// key exists in element/array
	// key can be a string or number
}

instanceof:
// checks if an object is an instance of a particular type
var theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
	// theDay is an instance of Date
}


// EXPRESSIONS
// ------------------------------

// there's two types of expressions: with and without side-effects

PRIMARY EXPRESSIONS:
'this' keyword
'()' grouping operator

LEFT-HAND SIDE EXPRESSIONS:
new		create an instance of an object
super	refer to the object's parent
		super([arguments])	// calls the parent constructor
		super.method()		// calls a method on the parent

SPREAD OPERATOR:
// replaces an array with its individual elements in another array or function arguments
var parts = ['shoulder', 'knees'];

var newArray = [ ...parts ]							// can be used in array literls (inserts both 'part' elements inside 'lyrics')
var lyrics = ['head', ...parts, 'and', 'toes'];		// can also be included between other values, and in 'sparse arrays'
foo( ...parts )										// passed as function arguments

var myString = 'lorem ipsum';
var newArray2 = [ ...myString ]						// also works with strings (returns individual characters), on both array literals and function calls

var iterable = (function*(){ yield 1; yield 2; yield 3 })()
var newArray3 = [ ...iterable ]						// also works with generator instances, on both array literals and function calls

REST PARAMETERS:
function myFunction( ...parts );					// passes each array item as a separate argument, they are called 'rest parameters' in this context
function myFunction( ...[a, b, c] );				// they can also be destructured directly in the function definition


// BUILT IN OBJECTS
// ------------------------------
Number							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Number_object
Math							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Math_object
Date							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
String							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting#String_objects
Intl							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Text_formatting#Internationalization
Intl.DateTimeFormat
Intl.NumberFormat
Intl.Collator
RegExp							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	RegExp.exec					// returns an array of info, or null
	RegExp.test					// returns true or false
	String.match				// returns an array of info, or null
	String.search				// returns the index of a match, or -1
	String.replace				// searches for a matching regexp, and replaces matches with another string
	String.split				// breaks a string into an array of substrings based on the passed substring or regex
Array							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Array_object
	Array(10)					// creates an array with ten empty elements
	[10]						// creates an array with a single value of '10'
	Array.length
	Array.concat()				// append another array, returns the result
	Array.join('|')				// creates a string including all items joined by the provided string
	Array.push()				// adds items to the end of the array, returns the new length
	Array.pop()					// removes and returns the last element
	Array.shift()				// removes and returns the first element
	Array.unshift()				// adds items to the beginning of the array, returns the new length
	Array.slice(start, end)		// returns a new array based on the start and end indexes
	Array.splice(start, count, newElement)	// removes items at specified index, optionally adds new items in that space, returns removed items
	Array.reverse()				// reverses order of items, affects the original array
	Array.sort()				// sort elements, you can pass a sorting function '(a,b) => {return a<b ? -1 : 1}'
	Array.indexOf(value)		// returns the first element matching the passed value
	Array.lastIndexOf(value)	// same but searches backwards
	
	// iterative methods		// each take a callback as first argument, and the value to use as 'this' as an optional 2nd value
	Array.forEach()				// loop through array values
	Array.map()					// creates a new array with the returned values from the provided callback
	Array.filter()				// creates a new array matching only items that return true on the provided callback
	Array.every()				// returns true if 'callback' is true for every item
	Array.some()				// returns true if 'callback' is true for at least one item
	
	Array.reduce()				// returns a single value built by running the callback on each item
	Array.reduceRight()			// same but begins with the last element and runs towards the first
	
	//
	Array.find()				// return the first item that satisfies the requirements set on the callback
	Array.findIndex()			// same but returns the key
	
	.includes()					// returns true if the passed value exists within the array, 2nd argument is the index to use as starting point (defaults to 0)
	
	.keys()
	.values()
	.entries()
	
	// example working with array-like collections like 'arguments' or 'NodeList'
	Array.prototype.forEach.call(arguments, callback)
	
TYPED ARRAYS:
ArrayBuffer						// keeps raw data, you can't access it directly
	constructor(numberOfBytes)
	.byteLength
DataView						// represents a buffer in a specific format
(typed array views:)			// numbers represent bits
								// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
	Int8Array
	Uint8Array
	Uint8ClampedArray
	Int16Array
	Uint16Array
	Int32Array
	Uint32Array
	Float32Array
	Float64Array
		constructor( numberOfBytes )
		constructor( arrayBuffer )
		constructor( otherTypedArray, byteOffset!, numberOfBytes! )
		each array item takes up the specified amount of bits, e.g. an Int32Array object has items of 4 bytes each (32 bits / 8)
		if you initialized the object with a buffer of 16 bytes, then you'll end up with 4 array items (16 bytes buffer / 4 bytes per array item)
		- you can create multiple typed array objects referring to the same data buffer (and any changes made on one of them will be reflected on all others)
		- to convert to a regular array, you can pass the typed array to Array.from() or to Array.prototype.slice.call()


Map								// simple key-value collection
	constructor([ [key1,1], [key2,2] ])		// initializer with an array of arrays with two items
	constructor( null )						// initializer with null value
	
	Map.size					// similar to 'length'
	Map.set(key, value)			// set a key-value pair, returns the map object ('this')
	Map.get(key)				// returns the matching value, or undefined
	Map.has(key)				// returns true or false
	Map.delete(key)				// removes an item
	Map.clear()					// removes all items
	
	Map.forEach(function(value, key, map){})
	Map.keys()					// returns an iterator with just the keys
	Map.values()				// returns an iterator with just the values
	Map.entries()				// returns an iterator with array with two items for each entry [key, value]
	for(let [key, value] of map){}
	
	// compared to objects
	- keys can be of any type, instead of just strings
	- makes it easier to track the number of items (objects hold additional properties besides the user-defined ones)
	- iteration happens in order of insertion (objects can be unpredictable)
	
	// use maps if
	- keys are unknown at run time
	- keys are all the same type, and values are all the same type
	- when you need to use something different than strings as keys
	- if there's NO cases of logic that operates on individual elements

WeakMap
	- takes objects as keys
	- keeps weak references
	- don't completely understand what this is for or how to use it???

Set								// simple collection of values (no keys), values can't be repeated
	constructor([1, 2])			// initializer with an array
	constructor( null )			// initializer with null value
	
	Set.size					// similar to 'length'
	Set.add(value)				// adds an item, returns the set object ('this')
	Set.has(value)				// return true or false
	Set.delete(value)			// removes an item
	Set.clear()					// removes all items
	
	Set.forEach(function(value, value, set))
	Set.keys()					// alias of .values()
	Set.values()				// returns an iterator with the values
	Set.entries()				// returns an iterator with array items for each entry [value, value]
	for(let value of set){}		// enumerated in insertion order
	
	// convert to array
	Array.from(set)
	array = [...set]
	
	// make from array
	new Set(array)				// duplicate values are deleted
	
	// compared to arrays
	- faster to check if it contains a value
	- you can more easily delete items by their value
	- a value of 'NaN' can't be found in an array using .indexOf
	- keep only unique values automatically so you don't need to keep track of them
WeakSet
	- keeps objects instead of raw values
	- objects are weak references
	- use cases: ???

// the equality operator on both map keys and set values use the 'SameValueZero' comparison (see below)

==							loose (or abstract) equality	(different types with similar values can match)
===							strict equality					(diferent types never match). +0 === -0 match, NaN === NaN DON'T match
Object.is(value1, value2)	same-value equality				similar to === , but +0 and -0 don't match, and NaN, NaN does
SameValueZero				same-value-zero equality		similar to same-value but +0 and -0 do match

these only work with primitives, different objects always return false even if they have the same exact structure



Object
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
	
	object.property
	object['property']
	
	for(key in object){}	// includes all enumerable properties, both 'own' and 'prototype'
	Object.keys(object)		// returns an array with all 'own' enumerable property names
	Object.values(object)
	Object.entries(object)
	
	Object.getOwnPropertyNames(object)			// same but also includes non-enumerable properties
	Object.getOwnPropertyDescriptor(obj)		// returns an array with descriptions for each of the 'own' properties {value, configurable, writable, enumerable}
	objectinstance.hasOwnProperty(property)		// returns true or false if the object has a particular property as its own (not from a prototype)
	Object.getPrototypeOf(objectinstance)		// returns the prototype object of a particular instance (which matches the .prototype property of its constructor)
	Object.setPrototypeOf(object, prototype)	// sets the prototype of an existing object
	
	{}						// literal
	new ObjectName()		// constructors
	
	this.property			// properties and methods assigned to 'this' become public
	
	Object.create(Type)		// creates a new object using another one as prototype, which can be a simple object (not necessarily a function)
	
	// inheritance
	// - all objects inherit from at least one other object
	// - this 'super' object is stored on the 'prototype' property
	// - you can modify this prototype property to alter all existing instances of that class
	
	// adding functions
	{
		functionName1: function(){},
		functionName2(){}				// shorthand
	}
	
	// getters and setters
	{
		get double() {
			return this.singleValue * 2;
		}
		set double(newValue) {
			this.singleValue = newValue / 2;
		}
	}
	// extending an existing prototype							// returns an object if successful, otherwise throws a TypeError
	Object.defineProperty(Date.prototype, 'propertyname', {
		get: function() {},
		set: function(newValue) {}
	});
	// adding multiple properties
	Object.defineProperties(Date.prototype, {
		'property1': {
			configurable: bool,		// default: false
			enumerable: bool,		// default: false
			value: any,				// default: undefined
			writable: bool,			// default: false
			get: function() {},
			set: function(newValue) {}
		},
		'property2': {
			get: function() {},
			set: function(newValue) {}
		}
	});
	
	//
	delete myobject.myproperty
	
	// comparing objects
	// == and === both work the same, they check if the two variables refer to the same instance (two different instances will never return true even if they have exactly the same properties)
	
	
	// INHERITANCE
	// To make an object inherit from another, you'll need to
	// - manually call the constructor method of the parent, making sure to pass the new object as the 'this' variable to make sure the properties and methods set by the constructor stick
	// - manually set the prototype
	function Manager() {
		Employee.call(this);								// makes a local copy of the prototype's properties and methods, otherwise they are still available but only on the prototype chain
		this.reports = [];
	}
	Manager.prototype = Object.create(Employee.prototype);	// doesn't run the initializer function, also useful when the prototype is a plain object (not a constructor function)
	or
	Manager.prototype = new Employee;						// runs the initializer function
	
	Manager.prototype.constructor = Manager					// the previous step changed the constructor from 'Manager' to 'Employee', this changes it back to 'Manager'
	
	// adding new properties and methods to the prototype object makes it instantly available on all instances of that prototype
	
	
	// PROPERTIES
	// there's two types of object properties:
	// data property, which has these attributes:
	//		value
	//		writable		defaults to true
	//		enumerable		defaults to true
	//		configurable	defaults to true
	// accessor property, which has these attribuets:
	//		get()			undefined
	//		set(newValue)	undefined
	//		enumberable		true
	//		configurable	true
	


// ITERATORS AND GENERATORS
// ------------------------------
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

ITERATOR:
// is any object that implements a 'next' function that returns an object containing 'value' and 'done'
function makeIterator(array) {
	var nextIndex = 0;
	return {
		next: function() {
			return nextIndex < array.length ?
				{value: array[nextIndex++], done: false} :
				{done: true};
		}
	};
}
var it = makeIterator(['yo', 'ya']);
it.next().value; // 'yo'
it.next().value; // 'ya'
it.next().done;  // true

GENERATORS:
// a generator is a function that automatically creates an iterator
// generators are created with 'function*'
// the body of the generator doesn't run immediately, it only returns the iterator object
// when the .next() function is called on the iterator, that's when the body of the generator runs
// within the generator, you use the 'yield' keyword to return the value at each step, subsequent calls will resume the execution of the body instead of restarting it
// if the function hits a 'return' statement, the iteration is considered to be over and returns a final object with 'done' set to true
*/
function* simpleGenerator(i) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}
var gen1 = simpleGenerator(10);
console.log( gen1.next() );		// returns first yield (11)
console.log( gen1.next() );		// resumes and returns second yield (12)
console.log( gen1.next() );		// resumes and returns third yield (13)
console.log( gen1.next() );		// resumes and hits the end of the function (implicit return), 'value' is undefined and 'done' is true
/*
// if the return statement returns a value, that's added to the 'value' property, otherwise it's left as undefined
// you can use 'yield*' to call other generators
	- if you pass an array it returns each item individually on each step (instead of the whole array at once)
	- same with strings (returns one character each time)
*/
function* anotherGenerator(i) {
	yield i;
	yield* simpleGenerator(i);
	yield i + 10;
	return 999;
}
var gen2 = anotherGenerator(10);
console.log( gen2.next() );		// 10
console.log( gen2.next() );		// 11
console.log( gen2.next() );		// 12
console.log( gen2.next() );		// 13
console.log( gen2.next() );		// 20
console.log( gen2.next() );		// 999, done
/*

// if you pass a value to the .next() function, that value is held by the next 'yield' keyword
*/
function* generatorArguments(i) {
	while(true) {
		let passedArgument = yield i++;
		if(typeof passedArgument == 'number') {
			i = passedArgument;
		}
	}
}
var gen3 = generatorArguments(10);
console.log( gen3.next() );		// 10
console.log( gen3.next() );		// 11
console.log( gen3.next(20) );	// changes i to 20: 20
console.log( gen3.next() );		// 21
console.log( gen3.next() );		// 22
/*

// you can also use generator expressions
var myGenerator = function*() {}

// on iterator objects created from a generator you can use these methods:
	.next( yieldValue )
	.throw( yieldValue )		// throws an error to be catched within the generator function, sending the optional yield value to be catched
	.return( yieldValue )		// replaces the next yield value with the passed value (so it's immediately returned back), and ends the iteration (so also returns .done === true)

// GENERATOR FUNCTIONS
you can get a 'GeneratorFunction' by reading the constructor property of any generator's prototype, e.g:
var myGenerator = Object.getPrototypeOf( function*(){} ).constructor;
var newGenerator = myGenerator( 'arg1', 'arg2', 'yield arg1; yield arg2' );		// you first pass the argument names as strings, and the last argument is the body of the function also as a string
var myIterator = myGenerator();


// PROXIES
// ------------------------------
// A 'proxy' extends a given object with custom methods for handling an object built-in properties and methods
// the passed object with the list of overrides is called the 'handler'
// each method that overrides a built-in function is called a 'trap'
// the object being modified is the 'target'
// 'invariants' are the properties and methods that are not modified
let handler = {
	'trap': function() {}
}
var proxiedObj = new Proxy(target, handler);

// full list of traps:
handler
	// Object.
		.getPrototypeOf( proxied )
		.setPrototypeOf( proxied, newPrototype )
		.isExtensible( proxied )
		.preventExtensions( proxied )
		.getOwnPropertyDescriptor( proxied, property )
		.defineProperty( proxied, property, propertySettings{value, configurable, writable, enumerable} )
		.ownKeys( proxied )								// Object.keys( proxy )
	// proxy
		.has( proxied, property )						// foo in proxy
		.get( proxied, property, proxy )				// proxy.foo
		.set( proxied, property, value, proxy )			// proxy.foo = 1
		.deleteProperty( proxied, property )			// delete proxy.foo
	// proxy functions
		.apply( proxied, this, args )					// when 'proxied' is a function: proxy( arg1, arg2 )
		.construct( proxied, args, 'new'Constructor )	// when 'proxied' is a function: new proxy( arg1, arg2 )

let revocable = Proxy.revocable(target, handler)	// similar but returns a 'revokable' object instead
let proxy = revocable.proxy							// get the regular proxy object with the 'proxy' property
revocable.revoke()									// revokes the proxy, you can't use it anymore even if you passed it to other variables


// REFLECT
// ------------------------------
// built-in object that provides a standard implementation of all the 'trap' methods

Reflect
	.has(object, 'foo')						// equivalent to object.foo
	.set(object, 'foo', 10)					// equivalent to object.foo = 10
	...
	.getPrototypeOf( object )				// equivalent to Object.getPrototypeOf( object )
	...


*/
function TestObject1() {
	function method1() {
		console.log(arguments.callee);
	}
	this.method2 = function() {
		console.log(arguments.callee);
	};
	this.prop1 = 10;
}
TestObject1.prototype.greeting = function() {
	console.log('lol hi');
}
var TestObject2 = {
	method1: function() {
		console.log(arguments.callee);
	},
	method2() {
		console.log(arguments.callee);
	}
};


var test1 = new TestObject1();
var test2 = Object.create(TestObject2);

// test1.method1();
test1.method2();
test2.method1();
test2.method2();


function Inherited() {
	TestObject1.call(this);
	this.reports = [];
}
Inherited.prototype = new TestObject1;
Inherited.prototype.constructor = Inherited;
Inherited.prototype.greeting = function() {		// overrides the previous method on 'TestObject1' prototype
	console.log('yo wassup');
}
var test3 = new Inherited();
console.log( '---' );
console.log( test3 );
console.log( test3.constructor );
test3.greeting();

console.log( test1 );
console.log( test1.constructor );
// console.log( Inherited.prototype.constructor );
console.log( '---' );



// - own properties and methods
// - properties and methods inherited from the constructor's prototype (shared by all)
// - inherit from the prototype's prototype and so on...
// constructors store their prototype on the 'prototype' property
// constructors also hold a reference to themselves on the 'prototype.constructor' method
// instances store their prototype on the '__proto__' property (can vary between browsers), this refers to exactly the same object as 'prototype' on constructors
// instances store their constructor function on the 'constructor' property (inherited from the prototype)
// both refer to the same object
// those prototypes can be based on other prototypes
//console.log(test3.constructor.prototype)



// XHR basics
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(e) {
	console.log(request)
	console.log(e)
	console.log(request.response);
}

// JSON
// 		.parse()		// takes a string and converts it into an object
// 		.stringify()	// takes an object and converts it into a JSON string


// FETCH / promises cont...
/*
fetch(url, settings?)// returns a promise
	response.ok			// boolean indicating if the url was fetched correctly or if there was an error
	response.status		// status code
	response.statusText	// descriptive text of the status
	response.headers
	
	response.text()		// converts the response into plain text, also returns a promise (so you need to pass callbacks to handle it)
	response.json()
	response.blob()
	response.arrayBuffer()
	response.formData()

	response.then(resolve, reject)		// catches the result of the request, first callback means success, second means failure
	response.catch(e)					// if any error was thrown during previous .then() methods, this catches them (also runs if the promise was rejected)

Request(url, settings)	// takes same arguments as fetch(), but it's useful to store as a var in case you need to reuse the same settings
Request(request, settings)	// build a request based on another one

(settings)
	method
	headers
	mode
	cache

Headers()				// headers can be sent in requests, and received in responses
	constructor({ header: value, ... })
	.append( header, value )				// adds a new value
	.set( header, value )					// changes the value of an existing header
	.get( header )							// returns the value of an existing header
	.delete( header )						// removes a header
	.has( header )
	
*/

// instead of nesting multiple promises:
/*

fetch(url).then(function(response) {
	response.text().then(function(text) {
		poemDisplay.textContent = text;
	});
});

*/
// you can 'return' the nested promise, and chain them in a flatter structure:
/*

fetch(url).then(function(response) {
	return response.text()
}).then(function(text) {
	poemDisplay.textContent = text;
});


var multiplePromises = Promise.all([ promise1, promise2 ])			// Collects multiple promises and returns a single one
	multiplePromises.then(resolve)									// resolves when all the included promises resolve
	multiplePromises.catch(reject)									// rejects as soon as one of the included promises rejects
	
var firstPromise = Promise.race([ promise1, promise2 ])				// Collects multiple promises and returns a single one
																	// the first internal promise to resolve or reject will cause the main promise to do the same

*/


// HTMLMediaElement
/*
media
	.play()
	.pause()
	.currentTime = number
	.addEventListener('ended')
	.addEventListener('timeupdate')


// CLASSES
// classes in js are 'syntactic sugar', so they remain prototype-based
// new keywords:
- class						// defines the class, creates a constructor function, instances get this function as their prototype. Unlike regular function declarations, classes are not 'hosited'
							// just like with functions, you can use 'class expressions' instead of 'class declarations', e.g. var MyClass = class {}
- extends					// extends an existing class, automatically sets the parent class as the prototype of the constructor
								// you can extend the default objects: Array, RegExp, Function, Promise, Boolean, Number, String, Error, Map, Set
- constructor				// initializer function, the actual function that runs on initialization
- super						// refers to the parent class
	super()					// calls the parent's initializer function
	super.property
	super.method()
- method()					// creates a method of name 'method', all methods (including the variations below) are added to the prototype itself, they are not duplicated on each instance
- static method()			// defines a static method (available only from the class itself, not from the instances). Class.method() instead of instance.method()
							// can also be used to define static properties (with get and set accessors)
- get property()			// defines a getter for a property
- set property(newValue)	// defines a setter for a property

to change the type of object returned from a class, you can use the Species.symbol property, example:
*/
class MyArray extends Array {
	static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);			// MyArray
var mapped = a.map(x => x * x);		// Array


/*

MIXINS:
if you need a subclass to inheirt from multiple superclasses, you'll need to build some helper functions like this:
var calculatorMixin = Base => class extends Base {
	calc() {}
};
var randomizerMixin = Base => class extends Base {
	randomize() {}
};
class Foo {}
class Bar extends calculatorMixin( randomizerMixin( Foo ) ) {}

*/


'use strict';
class Polygon {
	static counter() {
		return 10;
	}
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
	isPolygon() {
		return true;
	}
}
class Square extends Polygon {
	constructor(sideLength) {
		super(sideLength, sideLength);
	}
	get area() {
		return this.height * this.width;
	}
	set sideLength(newLength) {
		this.height = newLength;
		this.width = newLength;
	}
}
var square = new Square(2);
console.log( square );
console.log( Polygon.counter() );



// STRICT MODE
// "use strict";
// or
// 'use strict';
// Applies to individual functions or entire scripts
// be aware that concatenating strict and non-strict scripts can cause errors

/*
Turns mistakes into proper errors:
- throws errors if you accidentally define global variables (i.e. not using 'var', 'let' or 'const')
- trying to redefine or delete standard variables and objects will throw an error
- trying to write or delete to non-writable properties will throw an error
- you can't have multiple function arguments with the same name (they also can't match the name of the function itself)
- the only valid syntax for octal numbers is '0o', '0' will throw an error

Simplifies variable use:
- doesn't allow 'with' blocks: with(somevar) {}		// didn't know about this anyway lol
- code inside 'eval()' won't affect existing surrounding variables, nor introduce new ones, everything is scoped within that eval call
- for 'eval()' to run in strict mode, you can explicitely pass 'use strict'; in the passed string, or run the function inside a strict context (context only works if eval is not run through an alias)
- you can't use 'delete' to delete plain variables (only properties)

Simplifies 'eval()' and 'arguments'
- attempts to redefine or reassign 'eval' and 'arguments' will throw an error
- arguments property will always keep the original values from when the function is called (as opposed to loose mode where if you change the value of a named argument, the arguments array also changes)
- arguments.callee is not supported anymore, you can just name the enclosing function and use that name instead

Adding security
- in normal functions, the value of 'this' is always an object (the object itself it was called on, a boxed object for strings, numbers and values, or the global object if undefined or null)
	in strict mode, this always refers to the value it was called on, it's never mapped to anything else
- inside a function (for example 'funcname'), you can't read or write the funcname.caller and funcname.arguments properties anymore
- same with the arguments.caller property

Future ECMA
- many new words become reserved keywords in preparation for future ECMA features, so you can't use them as vars, function names, labels, etc:
	- implements
	- interface
	- let
	- package
	- private
	- protected
	- public
	- static
	- yield
- ES5 also reserves these words all the time, not just in strict mode:
	- class
	- enum
	- export
	- extends
	- import
	- super
- function definitions must be at the top-level of their context, i.e. they can't be defined inside conditionals or loops


// MEMORY MANAGEMENT
// -------
- reference-counting
- mark-and-sweep


RUNTIME CONCEPTS
// -------
- stack			// list of steps on a single action, e.g. when a function calls other functions, their contexts and variables are stacked on top of each other and solved one by one
- queue			// the list of 'messages' to be processed, each message can create its own stack that needs to  be solved before finishing the message and moving on to the next one
- heap			// a mostly unstructured region of memory where objects are allocated

EVENT LOOP
- messages are processed one by one
- messages are added any time an event occurs, and said event has a listener attached to it. also with the setTimeout function (the time argument indicates a minimum time, not a guaranteed time)
- even if you added a timeout with '0' delay, it will still need to wait before all messages from the main queue are processed

- web workers or cross-origin iframes have their own runtimes (stack, heap and message queue)
- to add messages from one runtime to another you can use the window.postMessage method in one, with a 'message' event listener on the other



// DEBUGGER
// ----
Adding the 'debugger' keyword anywhere will stop execution of the program and open up the browser's debugging tools (similar to manually adding a breakpoint)



global.__createIterableObject() ???
RegExp updates ???
SharedArrayBuffer & Atomics ???
WebAssembly ???
modules: import / export / default ???
Errors ???

*/
