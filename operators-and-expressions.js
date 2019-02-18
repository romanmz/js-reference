/*
==================================================
OPERATORS AND EXPRESSIONS
==================================================


ASSIGNMENT OPERATORS
------------------------------
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
*/


// DESTRUCTURING
// ------------------------------

// With arrays
var foo = [1, 2, 3];
var [one, two, three] = foo;			// one == 1, two == 2, three == 3

// With strings
var string = 'lorem ipsum';
var [one, two, three] = string;			// one == 'l', two == 'o', three == 'r'

// With objects
var {a, b, c} = {a: 1, b: 2}			// a == 1, b == 2 , c == undefined

// With generator instances
var generator = (function*(){ yield 10; yield 20; yield 30; })();
var [one, two, three] = generator;		// one == 10, two == 20, three == 30

// With primitives (uses their prototype properties and methods)
var {toFixed} = 2						// toFixed == Number.prototype.toFixed

// Using aliases
var {a:x, b, c} = {a: 1, b: 2}			// a:x indicates to take the 'a' property of the object, and assign it to the 'x' variable

// Using square brackets to dynamically select the variables to destructure (you need to use an alias so you can actually access the variable)
var name = 'foo';
var {[name]: x} = {foo: 10}				// x == 10

// Using rest parameters
var foo = [1, 2, 3, 4, 5]
var [one, two, ...many] = foo			// one == 1, two == 2, many == [3, 4, 5]

// Using default values for potentially undefined properties
var [a=1, b=2, c=3] = [5, , undefined]	// a == 5, b == 2, c == 3

// Using already defined variables
var a, b, c;
[a, b, c] = [1, 2, 3]					// a == 1, b == 2, c == 3

// You can also destructure arguments passed to a function
var foo = [1, 2, 3 ];
function myFunc( [a, b, c] ) {}
myFunc( foo );							// a == 1, b == 2, c == 3


/*
COMPARISONS
------------------------------

x == y						// loose equality.           matching values of different types will match
x === y						// strict equality.          matching values of different types will NOT match. +0 === -0 will match.  NaN === NaN won't match
x != y
x !== y
x > y
x >= y
x < y
x <= y

These only work with primitives, different objects always return false even if they have the exact same structure
To compare objects you can use the Object.is() static method

Object.is(value1, value2)	// same-value equality.      similar to ===, except:                            +0 === -0 won't match. NaN === NaN will match
SameValueZero				// same-value-zero equality. similar to same-value equality, except:            +0 === -0 will match


ARITHMETIC OPERATORS
------------------------------
x % y
x++			// returns the current value, then increases by one
++x			// increases by one, the returns the resulting value
x--
--x
-x			// multiplies by -1
+x			// attempts to convert non-numbers to numbers
x ** y		// returns base (x) to the exponent (y) power, e.g. 4**3 == 4*4*4 == 64


BITWISE OPERATORS
------------------------------
x & y		// 'AND' operator: only returns 1 where both variables had 1
x | y		// 'OR' operator: returns 1 where at least 1 of the variables had 1
x ^ y		// 'XOR' operator: returns 1 only where both variables don't intersect
~ y			// inverts the bits
x << y		// shifts 'x' 'y' times to the left, adding in zeros to the right
x >> y		// shifts to the right, shifted off bits are added to the left, which preserves signs
x >>> y		// shifts to the right, shifted off bits are discarded, zeroes are added to the left


LOGICAL OPERATORS
------------------------------
x && y		// AND
x || y		// OR
!x			// NOT


STRING CONCATENATION
------------------------------
string1 + string2


TERNARY OPERATOR
------------------------------
x ? y : z


'delete' KEYWORD
------------------------------
The 'delete' keyword can be used to delete variables created implicitely and user-defined properties
returns true if it can successfully delete the variable/property, or false otherwise
deleted variables or properties become 'undefined'.

When used on an array item, it removes the item but the rest of the elements keep their positions and the length of the array remains unchanged
if you want to keep the element but disable it, assign it to 'undefined' instead


'typeof' KEYWORD
------------------------------
Returns a string with the type of value, see 'Data primitives'

Exceptions are:
- returns 'number' for both integers and floats
- returns 'object' for null values


void() FUNCTION
------------------------------
Runs an expression without returning any values


'in' KEYWORD
------------------------------
Checks if a property exists in a given array or object
if( 'key' in object ) {
	// key exists in element/array
	// key can be a string or number
}


'instanceof' KEYWORD
------------------------------
Checks if an object is an instance of a particular type

var theDay = new Date(1995, 12, 17);
if( theDay instanceof Date ) {
	// theDay is an instance of Date
}


EXPRESSIONS
------------------------------
this				// Refers to the current context
()					// Grouping operator
new					// Creates an instance of an object
super				// Refers to the object's parent from within a subclass
super([arguments])	// Calls the parent constructor
super.method()		// Calls a method on the parent


SPREAD OPERATOR
------------------------------
Takes an array and extracts its individual elements to pass them to another context

let arrayItems = ['green', 'blue'];

let array1 = ['red', ...parts , 'black']			// Results in ['red', 'green', 'blue', 'black']
foo( ...arrayItems )								// Passes each item as individual parameters of a function

let stringChars = 'lorem ipsum';
let array2 = [ ...stringChars ]						// Also works with strings, returns each individual character as a separate element

let iterable = (function*(){ yield 1; yield 2; yield 3 })()
let array3 = [ ...iterable ]						// Also works with generator instances


REST PARAMETERS
------------------------------
Using the same syntax as a function argument has the reverse effect, it takes multiple individual elements and groups them in a single array

function myFunction( ...parts );					// Stores passed arguments into a single array named 'parts'
function myFunction( ...[a, b, c] );				// You can combine it with a destructuring syntax operator


*/
