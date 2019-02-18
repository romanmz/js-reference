/*
==================================================
OBJECTS
==================================================
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
*/


// CONSTRUCTORS
// ------------------------------

// Literal (creates a simple object)
let simpleObject = {}

// Constructor for specific classes
let arrayObject = new Array();

// Using Object.create() to use another object as prototype
let inheritedProto = Object.create( arrayObject );

// Comparing objects using == and ===
// both operators work the same, they check if the two objects being compareed refer to the same instance
// two different instances will never return true even if they have exactly the same properties


// PROPERTIES
// ------------------------------

// You can define properties and methods using keywords or numbers
let object = {
	// properties
	a:1, b:2, 3:'c',
	// methods
	methodName: function(){},
	// shorthand for methods
	methodShorthand(){},
	// getters and setters
	get double() { return this.a * 2 },
	set double( newValue ) { this.a = newValue / 2 },
};

// To access keyword properties:
object.a;
object['a'];

// To access numbered properties:
object[3];
object['3'];

// To get all properties of an object:
for( key in object ) {}							// loops through all enumerable property keys, both from the object itself ('own') and the ones inherited from the prototype
Object.keys(object)								// returns an array with the names of all 'own' enumerable properties
Object.values(object)							// returns an array with the values of all 'own' enumerable properties
Object.entries(object)							// returns an array with arrays including the name and value for all 'own' enumerable properties
Object.getOwnPropertyNames( object )			// similar to Object.keys() but also includes non-enumerable properties

// To get information about the properties:
Object.getOwnPropertyDescriptors( object )		// returns an array with the settings for each of the 'own' properties {value, configurable, writable, enumerable}
Object.getOwnPropertyDescriptors( object, 'a' )	// same but for just one property in particular
object.hasOwnProperty( 'propertyname' )			// checks if the object has a specific property

// To delete an existing property:
delete object[3];

// To create/update properties with detailed settings about their behaviour
Object.defineProperty( object, 'newproperty', {
	configurable: false,						// (bool) default == false      Whether or not the settings for this property can be updated later on, false to lock them as defined here
	enumerable: true,							// (bool) default == false      Whether or not this property should be included in statements that include enumerable properties
	// you can then define a regular data property with an intial value
	value: 1,									// (any)  default == undefined  Initial value of the property
	writable: true,								// (bool) default == false      true to make it readable and writable, false to make it read-only
	// you can also define getter and setter methods, but only if you don't define the 'value' and 'writable' settings, otherwise you'll get an error
	// get: function() {},
	// set: function( newValue ) {}
});


// USING 'new' TO USE FUNCTIONS AS CLASS CONSTRUCTORS
// ------------------------------

// if you call a function using the 'new' keyword, it will return a new object using itself as a class definition
function Person( name, age ) {
	
	// use 'new.target' inside the function to detect if the function was called using 'new' or not
	if( !new.target ) {}
	
	// When calling a function without 'new', then the keyword 'this' will point to the current context in which the function was called,
	// e.g. 'window' if it was called outside any blocks of code
	// when using 'new' then 'this' will refer to the newly created instance from this class
	this.name = name;
	this.age = age;
	
	// Return statements are only used on regular function calls, they are ignored when building objects using 'new'
	return 123;
}
Person( 'Ethan', 42 );			// returns 123
new Person( 'Ethan', 42 );		// returns Person{name:'Ethan', age:42}


// PROTOTYPES AND INHERITANCE
// ------------------------------
// All objects inherit from at least one other object
// this 'super' object is stored as the 'prototype' property
// you can update the prototype of an object, and those changes will be reflected on all objects that implement the same prototype

// Getting or setting the prototype of an instance
Object.getPrototypeOf( object )					// returns the prototype object of a particular instance (which matches the .prototype property of its constructor)
Object.setPrototypeOf( object, Array )			// sets a new prototype for an existing object (not recommended)


// Creating a new object with Object.create() and assigning it as the prototype of a class will make that class inherit the same properties and methods as the object
// you can use it with proper constructor functions, or also with just plain objects
function Employee( name, age, company ) {
	// using Object.create() doesn't automatically run the initializer of constructor functions, so you need to call them manually
	// this will assign the properties and methods defined in the initializer as 'own' properties of this new class
	Person.call( this, name, age );
	this.company = company;
}
Employee.prototype = Object.create( Person.prototype );
let john = new Employee( 'John', 28, 'Little Duck Co' );

// If you run a constructor function and assign it directly as the prototype of another class,
// then that class will inherit the elements of that constructor as prototype properties and methods (shared between all instances), including anything defined in the initializer function
function Teacher( school ) {
	this.school = school;
}
Teacher.prototype = new Person( 'Mary', 35 );
let mary = new Teacher( 'Springfield Elementary' );

// On both of those previous examples, changing the class prototype to the 'Person' class also updated the 'constructor' property to that class
// but we actually do want the constructor to refer to the subclass itself, so we simply change the prototype.constructor property back to its original value
Employee.prototype.constructor = Employee;
Teacher.prototype.constructor = Teacher;

// Adding new properties and methods to the prototype object makes it instantly available on all instances of that prototype
Person.prototype.greet = function() { console.log( 'Hello '+this.name+'!' ) }
john.greet();
mary.greet();

// Properties and methods on subclasses override those of the superclasses
Employee.prototype.greet = function() { console.log( 'Wassup yo' ) }
john.greet();
mary.greet();
