/*


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
