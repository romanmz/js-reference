/*
==================================================
ARRAYS
==================================================
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Array_object
*/


// CONSTRUCTORS
// ------------------------------

// Literal
let array = [1,2,3];

// Constructor
let constructedArray = Array(4,5,6);

// Helper static methods
let arrayLikeObject = new Set([7, 8, 9]);
let arrayFromObject = Array.from( arrayLikeObject );
let arrayWithCallback = Array.from( arrayLikeObject, (value, key)=>value*2 );
let arrayOf = Array.of( 10, 11, 12 );


// GETTING INFO
// ------------------------------
array.length				// returns the number of items contained in the array
array.keys()				// returns an iterator object containing all keys in the array
array.values()				// returns an iterator object containing all values in the array
array.entries()				// returns an iterator object containing all pairs of keys and values
array.join('|')				// creates a string including all items in the array joined by the provided string


// UPDATING ITEMS
// ------------------------------
array.concat()				// append another array, returns the result
array.push()				// adds items to the end of the array, returns the new length
array.pop()					// removes and returns the last element
array.shift()				// removes and returns the first element
array.unshift()				// adds items to the beginning of the array, returns the new length
array.slice( 0, 1 )			// returns a new array based on the provided start and end indexes
array.splice( 0, 2, 4 )		// starting at specified index, the provided number of items are removed and, optionally, includes new items in their place
array.reverse()				// reverses the order of items
array.sort()				// sort elements, you can pass a sorting function '(a,b) => {return a<b ? -1 : 1}'


// FINDING ITEMS
// ------------------------------
array.includes()			// returns true if the provided value exists within the array, 2nd argument is the index to use as starting point
array.indexOf()				// returns the first element matching the provided value
array.lastIndexOf()			// returns the last element matching the provided value
array.find()				// returns the first item that satisfies the requirements set on the callback
array.findIndex()			// same but returns the key instead of the value


// FUNCTIONAL METHODS
// ------------------------------
// each of this methods take a callback as first argument, and the value to use as 'this' as an optional 2nd value
array.forEach()				// loops through all the values
array.map()					// creates a new array with the returned values from the provided callback
array.filter()				// creates a new array matching only items that return true on the provided callback
array.every()				// returns true if 'callback' is true for every item
array.some()				// returns true if 'callback' is true for at least one item
array.reduce()				// returns a single value built by running the callback on each item
array.reduceRight()			// same but begins with the last element and runs towards the first


// TYPED ARRAYS
// ------------------------------
/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
<TypedArray>s are an array-like view of underlying binary data,
you can't access it directly, instead you need to use one of the built-in classes:
- Int8Array
- Uint8Array
- Uint8ClampedArray
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array
*/
