/*
==================================================
PROXIES AND REFLECT
==================================================
*/


// PROXIES
// ------------------------------
// A 'proxy' allows you to intercept the calls to property and methods on a given object
// this could be used to implement new functionality or override default properties and methods on an existing object without directly modifying it
// overriden methods are called 'traps', and the ones left unmodified are called 'invariants'

// Example:
let simpleArray = [1,2,3];
let proxiedArray = new Proxy(simpleArray, {
	get( target, property, proxy ) {
		if( property == 'values' ) {
			return ()=>[4,5,6];
		}
		return target[property];
	},
});
simpleArray.values();		// Returns 1,2,3
proxiedArray.values();		// Returns 4,5,6


// PROXY HANDLERS
// ------------------------------
// Thi is the full list of traps that can be implemented in a proxy
let proxyHandler = {
	// For intercepting calls to static methods on Object, e.g. Object.getPrototypeOf( target )
	getPrototypeOf( target ) {},
	setPrototypeOf( target, newPrototype ) {},
	isExtensible( target ) {},
	preventExtensions( target ) {},
	getOwnPropertyDescriptor( target, property ) {},
	defineProperty( target, property, propertySettings ) {},
	ownKeys( target ) {},						// for Object.keys( target )
	// For intercepting calls on the proxy object itself
	has( target, property ) {},					// e.g: foo in target
	get( target, property, proxy ) {},			// e.g: target.foo / target.foo()
	set( target, property, value, proxy ) {},	// e.g: target.foo = 1
	deleteProperty( target, property ) {},		// e.g: delete target.foo
	// For intercepting when the proxy itself is called as a function or constructor
	apply( target, thisValue, args ) {},		// e.g: target( arg1, arg2 )
	construct( target, args, constructor ) {},	// e.g: new target( arg1, arg2 )
}


// REVOCABLE PROXIES
// ------------------------------
// You can also create 'revocable' proxies using the Proxy.revocable() static method
// Instead of returning a proxy object it returns a simple object containing one property and one method:
let revocableArray = Proxy.revocable( simpleArray, proxyHandler );
revocableArray.proxy							// gets the actual proxy object
revocableArray.revoke()							// revokes the proxy so that all its traps are disabled, you can't use it anymore even if you stored it in other variables


// REFLECT
// ------------------------------
// 'Reflect' is a built-in object that stores the standard implementation of all the operations that can be done on an object,
// which are exactly the same as the ones available on proxy handlers
// this is similar to some of the static Object methods, e.g: Object.getPrototypeOf() vs Reflect.getPrototypeOf()
// but Reflect also implements some other operations not available in Object, e.g: Reflect.construct( Array ) vs new Array()
// this is so we can have a cleaner and more reliable way of accessing those operations dynamically
