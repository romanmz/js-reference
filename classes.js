/*
==================================================
CLASSES
==================================================
Classes in js are 'syntactic sugar' to define constructor functions,
so objects created with classes are still prototype-based
*/


// CLASS DEFINITION
// ------------------------------
// You use the 'class' and 'extends' keywords to define a class and make it inherit the properties and methods of another class
class MyArray extends Array {

	// Properties
	publicProp = 0;					// public (writable, enumerable, and configurable)
	['computedProp'] = 0;
	#privateProp = 0;				// private
	static staticPublicProp = 10;
	static #staticPrivateProp = 10;

	// Use 'constructor()' to define the initializer function, and super() to call the initializer of the parent class
	// you can also access the properties and methods of the parent class with super.property and super.method()
	constructor() {
		super( ...arguments );
		
		// Instance properties need to be defined within methods using the 'this' keyword
		this.name = 'test';
	}
	
	// Methods are just regular function definitions, they are added to the prototype, not duplicated for every instance
	publicMethod() {}
	*generatorMethod() {}
	async asyncMethod() {}
	async *asyncGeneratorMethod() {}
	static staticPublicMethod() {}
	static #staticPrivateMethod() {}

	// For getter and setter methods just prepend 'get' and 'set' before the property name
	get sum() {}
	set sum( newValue ) {}
	static get totalSum() {}
	static set totalSum( newValue ) {}
}
let newArray = new MyArray(1, 2, 3);


// GETTING THE CLASS NAME OF AN OBJECT
// ------------------------------
// The class name of an object can be acccessed with the Object.prototype.toString() method

// Helper class
function getClass( object ) {
	return Object.prototype.toString.call( object ).slice( 8, -1 );
}

// Defining a custom class name on an existing object
const Offset = {
	[Symbol.toStringTag]: 'Offset',
};
