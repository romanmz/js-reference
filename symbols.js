/*
==================================================
SYMBOLS
==================================================
Symbols allow you to define anonymous object properties,
this is helpful for when you need to add properties that are meant to remain private (not enumerable)
this also means that the only way to access those properties is to reuse the original symbol used as a key to define them, or to list them with the getOwnPropertySymbols method
*/


// CREATING AND GETTING SYMBOLS
// ------------------------------

// Returns a 'symbol' primitive data type, each symbol is always unique and can be used as identifiers for object properties
let symbol1 = Symbol();

// You can pass an optional description string to help with debugging, but doesn't make any other difference in how you use the symbol
// multiple symbols with the same description are still unique and not equal
let symbol2 = Symbol( 'description' );

// Symbols by default are never global, if you need global symbols you can use the available static methods,
// unlike normal symbols, global symbols do have a key you can use to retrieve them back

// This returns the global symbol that matches that key if it exists, if it doesn't then a new one is created and returned
let globalSymbol = Symbol.for( 'symbolKey' );

// You can also do the reverse and obtain the 'key' of a global symbol you already have
let globalSymbolKey = Symbol.keyFor( globalSymbol );

// To retrieve all symbols that are being used as properties of an object
Object.getOwnPropertySymbols( object );


// BUILT-IN SYMBOLS
// ------------------------------
// You can access the built-in symbols used to define properties and methods on many standard objects as static properties of the Symbol type

Symbol.toStringTag			// when calling the toString method on an object, it returns something like '[object Object]', with this symbol you can change the name of the object returned here
Symbol.species				// by default some object methods like Array.map() will return new objects of the same class as them, but you can use this symbol to define a new class for the new returned items

Symbol.iterator				// identifies the 'iterator' function of an object
Symbol.match				// identifies the function used for the built-in match() method
Symbol.replace				// identifies the function used for the built-in replace() method
Symbol.search				// identifies the function used for the built-in search() method
Symbol.split				// identifies the function used for the built-in split() method

Symbol.hasInstance			// identifies the function that defines the behaviour of the object when used after 'instanceof'
Symbol.isConcatSpreadable	// identifies the function that defines how should the object behave when passed to the Array.concat() function (return true to spread its items, false to keep the array intact)
Symbol.unscopables			// identifies the function that defines how should the object behave in a 'with' statement. !!! that statement is not recommended anyway
Symbol.toPrimitive			// identifies the function that determines how should the object be converted to a primitive, for example when calling +obj (number) or obj+'' (string)
							// the function gets a 'hint' parameter that can be 'string', 'number' or 'default'
