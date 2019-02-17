/*
==================================================
BASICS
==================================================
https://developer.mozilla.org/en-US/docs/Web/JavaScript
http://kangax.github.io/compat-table/es2016plus/
2017-11-12
*/


// COMMENTS
// ------------------------------

// single-line comments
/*
multi-line
comments
*/
<!-- html-like comments 1
--> html-like comments 2


// VARIABLES
// ------------------------------

// Local variable, global if defined outside a function. Leaks out of blocks
var myVariable;

// Local variable, global if defined outside a function. Stays inside its block
let myBlockScopedVariable;

// Constants must have an initial value and never change, their scope rules are the same as 'let', and can't be named the same as any other existing variables or functions
// const myConstant;			// ERROR: no value
const myConstant = 5;
// myConstant = 10;				// ERROR: can't change value
function myFunc() {}
// const myVariable = 10		// ERROR: there's already a variable with the same name
// const myFunc = 5				// ERROR: there's already a function with the same name

// When assigning objects to constants, only the reference to the object itself is a constant, the individual properties of the object may stil be changed

// Trying to access an undefined variable will throw a reference error
// if( undefinedVar == 1 ) {}	// ERROR: 'undefinedVar' doesn't exist

// Defined 'var's and 'let's with no value become 'undefined'
if( myVariable === undefined ) {}

// 'Global variables' refers to the properties of the global object, 'window' in the case of web browsers


// DATA TYPES
// ------------------------------

// Primitives
let boolean = true;
let nullValue = null;
let undefinedValue = undefined;
let number1 = 1;
let number2 = 1.005;
let string = "hello"
let symbol = Symbol();

// Objects
let object = {}

// Functions
function myFunction() {}

// Undefined
// - behaves as 'false'
// - converts to 'NaN' when used in a numeric context

// Null
// - behaves as 'false'
// - behaves as '0' when used in a numeric context


// LITERALS
// ------------------------------
var arrayLiteral = [1, 2, , 4];			// array literals are object initializers of type 'Array', if you leave empty spaces they will be filled with 'undefined' values
var booleanLiteral = true;				// true | false
var decimalInteger = 10;
var binaryInteger = 0b10;				// begin with '0b', '10' equals 2
var octalInteger = 0o10;				// begin with '0o', '10' equals 8
var hexInteger = 0x10;					// begin with '0x', '10' equals 16
var floatNumber = 10.5;
var exponentNumber = 10.5e4;			// 10.5 x 10000 = 105000
var objectLiteral = {
	propertyName: 'propertyValue',		// property names that are not valid js identifiers need to be defined within quotes, and can only be accessed with brackets syntax: obj['!']
	__proto__: Array,					// assign the type of prototype
	decimalInteger,						// shorthand for 'decimalInteger: decimalInteger'
	toString(){							// shorthand for 'toString: function(){}'
		return super.toString()			// allows use of 'super' properties and methods
	},
	get x() { return 1 },				// getter for property 'x'
	set x(v) { this.x = v },			// setter for property 'x'
	['prop_'+decimalInteger]: 10,		// dynamic property names
	['method_'+decimalInteger](){},		// dynamic method names
	get ['prop2_'+decimalInteger](){},	// dynamic getter and setter names
	*generator(){}						// shorthand for 'generator: function*(){}'
}
var regexpLiteral = /ab+c/;
var stringLiteral1 = "hello";
var stringLiteral2 = 'hello';
var stringLiteral3 = `hello`;
var stringLiteralMultiline = `This is a
multi-line comment`;
"lorem ipsum".length					// you can call String properties and methods directly from a string literal

// Special characters within string literals
var specialChars = '\0   null byte\n';
specialChars += '\b   backspace\n';
specialChars += '\f   form feed\n';
specialChars += '\n   new line\n';
specialChars += '\r   carriage return\n';
specialChars += '\t   tab\n';
specialChars += '\v   vertical tab\n';
specialChars += '\'   single quote\n';
specialChars += '\"   double quote\n';
specialChars += '\\   backslash\n';
specialChars += '\251 character with Latin-1 encoding (0–255)\n';
specialChars += '\xA9 character with Latin-1 encoding (hexadecimal x0–FF)\n';
specialChars += '\u00A9 character with Unicode encoding (hexadecimal u0–FFFF)\n';
specialChars += '\u{000A9} character with Unicode point escapes (hexadecimal u{0–FFFFF})\n';
specialChars += 'you can also escape line breaks with a backslash \
without including the break on the final string';

// If you pass a string literal to a function (without using brackets), the function can deconstruct its elements
function deconstructLiteral( textFragments, var1, var2 ) {
	// textFragments contains all plain strings left over after taking out the interpolated variables
	// var1 is the first interpolated variable
	// var2 is the second interpolated variable
}
deconstructLiteral `foo${123}bar\n${456}`;


// SUBSCRIPTS
// ------------------------------
// When working with objects you can access named properties directly, and numbered properties by using a subscript syntax
var foo = {a: 'alpha', 2: 'two'};
foo.a;
foo[2];
// If you try the reverse you'll get an error
// foo[a];	// Error
// foo.2;	// Error
// In both cases you can also use the subscript syntax with a string
foo['a'];
foo['2'];


// CONVERTING BETWEEN DATA TYPES
// ------------------------------

// Numbers become strings when added to a string with +, or ignored when using other operators
let daysPerYear = 365;
let daysPerYearString = daysPerYear+' days';

// To convert strings to numbers use:
let hoursPerDay = '24';
// parseInt() to convert to an integer
parseInt(hoursPerDay)
// parseFloat() to convert to a float, always include the 'radix' as 2nd argument to make sure you get the correct result (10 for decimals)
parseFloat(hoursPerDay, 10)
// the + unary operator
let twoDays = (+hoursPerDay) + (+hoursPerDay)

// Use ${} within a `` string literal to convert any data type into a string
var name = 'Bob', time = 'today';
var stringInterpolation = 'Hello '+name+', how are you '+time+'?';
var stringLiteralInterpolation = `Hello ${name}, how are you ${time}?`;

// When passing an object into a string template literal, if the object has a 'toString()' method, then that method is called to generate the string output
var a = {
	toString: function(){ return 'lol' }
};
// returns 'hello lol'
`hello ${a}`
