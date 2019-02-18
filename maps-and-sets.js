/*
==================================================
MAPS
==================================================
Maps represent a simple collection of key-value pairs

Compared to objects
- keys can be of any type
- makes it easier to track the total number of items (objects hold additional properties besides the user-defined ones)
- iteration happens in order of insertion (objects can be unpredictable)

Using the equality operator (==) with maps uses the 'SameValueZero' logic (see 'operators' section)
*/


// CONSTRUCTORS
// ------------------------------

// Initializing an empty map
let emptyMap = new Map();

// Initializing with an array of key-value pairs
let myMap = new Map([ ['a',1], ['b',2] ]);


// PROPERTIES AND METHODS
// ------------------------------
myMap.size					// returns the number of items contained in the map
myMap.has('c')				// checks whether or not the provided key exists in the map
myMap.get('c')				// returns the value matching the provided key
myMap.set('c', 3)			// adds or updates a key-value pair, returns the map object itself
myMap.delete('c')			// removes the key-value pair matching the provided key
myMap.clear()				// removes all items
myMap.keys()				// returns an iterator object containing all keys in the map
myMap.values()				// returns an iterator object containing all values in the map
myMap.entries()				// returns an iterator object containing all pairs of keys and values
myMap.forEach( (value,key)=>{} )	// loops through all the key-value pairs


// WEAKMAPS
// ------------------------------
// - take objects as keys
// - keep weak references



/*
==================================================
SETS
==================================================
Sets represent a simple collection of values (with no keys), values are always unique and can't be repeated

Compared to arrays
- faster and easier to check if a value exists within the collection
- faster and easier to delete items by their value
- a value of 'NaN' can't be found in an array using .indexOf()
- if you need a collection of unique values, this does the job automatically so you don't have to manually keep track of it

Using the equality operator (==) with sets uses the 'SameValueZero' logic (see 'operators' section)
*/


// CONSTRUCTORS
// ------------------------------

// Initializing an empty set
let emptySet = new Set();

// Initializing with an array (duplicate values will be removed)
let mySet = new Set([1, 2, 3, 3, 3]);


// PROPERTIES AND METHODS
// ------------------------------
mySet.size					// returns the number of items contained in the set
mySet.has(3)				// checks whether or not the provided value exists in the map
mySet.add(4)				// adds a new item, returns the set object itself
mySet.delete(4)				// removes the provided value
mySet.clear()				// removes all items
mySet.keys()				// same as .values()
mySet.values()				// returns an iterator object containing all values in the set
mySet.entries()				// same as .values()
mySet.forEach( (value,key)=>{} )	// loops through all the values (both arguments represent the same value)


// WEAKSETS
// ------------------------------
// - take objects as values
// - objects are weak references
