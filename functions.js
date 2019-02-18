/*
==================================================
FUNCTIONS
==================================================
*/


// FUNCTION DECLARATIONS
// ------------------------------

// Standard function declaration
function declaredFunction() {}

// Function expressions (anonymous)
let anonymousExpression = function() {}

// Function expressions (named)
// useful for recursive functions or to help with debugging
let namedExpression = function internalName( number ) {
	return number < 2 ? 1 : internalName( number - 1 );
}

// A function can also refer to itself with the arguments.callee property (not supported on 'strict' mode)
function calleeFunction( number ) {
	return number < 2 ? 1 : arguments.callee( number - 1 );
}

// The Function() constructor allows you to create functions from a string at runtime, like with eval()
let runtimeFunction = Function( 'return 123;' );


// FUNCTION ARGUMENTS
// ------------------------------

// 'arguments' object
function functionArguments() {
	// you can access all the arguments passed to a function (regardless of how many were defined in the function definition) with the 'arguments' object
	// it's an array-like object, so you can use subscripts, iterate over them, and read the .length property
	for( value of arguments ) {
		// do stuff with each argument
	}
}
functionArguments( 'a', 'b', 'c' );

// Default arguments
function defaultArguments( arg1, arg2=5 ) {
	// You can make arguments optional by assigning them a default value
	return arg1 + arg2;
}
defaultArguments( 10 );

// 'rest' parameters
function restParameters( arg1, ...allOthers ) {
	// Use three dots to indicate that an argument should catch all extra parameters passed to a function
	// It's similar to 'arguments', except it doesn't include the previous arguments that were actually defined by the function
	// and it's an actual array object instead of a generic iterable
	return arg1 + allOthers.reduce( (result, value)=> result + value );
}
restParameters( 1, 2, 3, 4, 5 );


// ARROW FUNCTIONS
// ------------------------------

// Arrow functions are a shorter syntax to define anonymous functions
let a = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium'];
a.map( function(s) { return s.length } );	// normal syntax
a.map( (s) => { return s.length } );		// arrow syntax
a.map( (s) => { s.length } );				// arrow syntax with no return statement. (performs an action but returns 'undefined')
a.map( (s) => s.length );					// if the function only has one statement, and it needs to return the result of that statement, then you can omit both the 'result' keyword and the curly braces
a.map( s => s.length );						// if the function only takes one argument, then you can also their brackets
a.map( () => 5 );							// if it takes no arguments then you do need to keep the brackets
a.map( s => ({result:s}) );					// to return an object literal within a single statement, wrap it in parentheses

// Arrow functions work the same as regular functions, except for one difference:
// they capture the value of 'this' from their enclosing context, and keeps it even if it's passed around to other objects and contexts (including being called with .apply, .call or .bind)
// same thing with the 'arguments' object and 'new.target'
function Person() {
	this.age = 0;
	setInterval(() => {
		// 'this' refers to the person object, not to the arrow function itself
		// this wouldn't work if we were not using an arrow function
		this.age++;
	}, 1000);
}
let person = new Person();


// FUNCTION BINDING
// ------------------------------

// By default if you use the 'this' keyword within a function, it refers to the original context in which it was called
// or if it was called using the 'new' keyword then it uses the function itself as context:
function testContext( ...args ) {
	return [this, ...args];
}
testContext( 1, 2 );											// returns [window, 1, 2]
new testContext( 1, 2 );										// returns [testContext, 1, 2]

// You can use the Function.prototype.bind() method to create a duplicate of an existing function,
// but passing a custom object to be used as context as the 1st argument and, optionally, a list of pre-defined arguments
let customObject = {};
let customContext = testContext.bind( customObject, 1, 2 );		// returns a new function
customContext( 3, 4 );											// returns [{}, 1, 2, 3, 4]

// If you call the new function using the 'new' keyword, the context will remain as the original function
new customContext( 3, 4 );										// returns [testContext, 1, 2, 3, 4]


// new.target
// ------------------------------
// The 'new.target' property is available inside function calls, and checks whether or not the function was called using the 'new' keyword
// if it was called with 'new' it returns a reference to the initializer function, otherwise returns 'undefined'
function testNew() {
	return new.target;
}
testNew();				// returns undefined
new testNew();			// returns 'testNew()'


// [function].name
// ------------------------------
/*
The .name property of any function will return its own name
- anonymous functions will return an empty string
- named function statements will return their internal name
- new functions created from another using .bind() will return the name of the original function with the keyword 'bound' prepended
*/
