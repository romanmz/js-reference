/*
==================================================
ITERATORS AND GENERATORS
==================================================
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
*/


// ITERATORS
// ------------------------------
// An iterator is any object that implements a 'next' function
// which returns an object containing a 'value' and 'done' properties
function functionTowardsZero( number ) {
	return {
		next() {
			number--;
			return number >= 0 ?
				{done: false, value: number} :
				{done: true}
		}
	}
}
let functionIterator = functionTowardsZero( 3 );
functionIterator.next();		// returns {done: false, value: 2}
functionIterator.next();		// returns {done: false, value: 1}
functionIterator.next();		// returns {done: false, value: 0}
functionIterator.next();		// returns {done: true}


// GENERATORS
// ------------------------------
// A generator is a function that allows you to automatically create iterators in a cleaner way, you indicate that a function is a generator by adding a star next to 'function'
function* generatorTowardsZero( number ) {
	// The body of a generator doesn't actually run when the function is invoked at first, it only returns the iterator object
	// it's only until the .next() method is called that the code in the body actually runs
	while( number > 0 ) {
		number--;
		// use the 'yield' keyword to return the value at each step (similar to 'return'),
		// except that subsequent calls will resume the execution of the code at that point instead of starting again from the top
		yield number;
	}
	// if the function hits a 'return' statement, or reaches the end of the block, then the iteration is considered to be over and returns a final object with 'done' set to true
	// if you returned a value, then that value will be set on the returned object, otherwise it's just left as undefined
}
let generatorIterator = generatorTowardsZero( 3 );
generatorIterator.next();		// returns {done: false, value: 2}
generatorIterator.next();		// returns {done: false, value: 1}
generatorIterator.next();		// returns {done: false, value: 0}
generatorIterator.next();		// returns {done: true}


// NESTED GENERATORS
// ------------------------------
// You can use 'yield*' from within a generator to call other generators
// - if you pass an array it returns each item individually on each step (instead of the whole array at once)
// - same with strings (returns one character each time)
function* anotherGenerator( number ) {
	// Increase number twice, before going back down to zero
	yield ++number;
	yield ++number;
	yield* generatorTowardsZero( number );
}
var nestedIterator = anotherGenerator( 3 );
nestedIterator.next();			// returns {done: false, value: 4}
nestedIterator.next();			// returns {done: false, value: 5}
nestedIterator.next();			// returns {done: false, value: 4}
nestedIterator.next();			// returns {done: false, value: 3}
nestedIterator.next();			// returns {done: false, value: 2}
nestedIterator.next();			// returns {done: false, value: 1}
nestedIterator.next();			// returns {done: false, value: 0}
nestedIterator.next();			// returns {done: true}


// PASSING EXTERNAL DATA TO THE GENERATOR
// ------------------------------
// if you pass a value to the .next() method, that value will be held by the last 'yield' statement that run, so you can use it immediately after
// (the first time you run 'next' you won't be able to capture the passed value as no 'yield' statement has been used yet)
function* generatorArguments( number ) {
	while( number > 0 ) {
		number--;
		let resetNumber = yield number;
		if( resetNumber ) {
			number = resetNumber;
		}
	}
}
var yieldInfo = generatorArguments( 3 );
yieldInfo.next();			// returns {done: false, value: 2}
yieldInfo.next();			// returns {done: false, value: 1}
yieldInfo.next(3);			// sends an value to the generator, returns {done: false, value: 2}
yieldInfo.next();			// returns {done: false, value: 1}
yieldInfo.next();			// returns {done: false, value: 0}
yieldInfo.next();			// returns {done: true}


// CALLING EXCEPTIONS
// ------------------------------
// In addition to the .next() method, you can also use
// .throw() to send errors to the generator (which needs to be able to handle)
// .return() to make the iterator end early, you can also specify the final value to be returned
function* generatorTowardsZeroAgain( number ) {
	while( number > 0 ) {
		number--;
		try {
			yield number;
		} catch( e ) {
			// handle errors
		}
	}
}
let towardsZeroAgain = generatorTowardsZeroAgain( 10 );
towardsZeroAgain.next();					// returns {done: false, value: 9}
towardsZeroAgain.throw( 'some error' );		// returns {done: false, value: 8}. The error is handled inside the generator and doesn't necesarily stops it
towardsZeroAgain.next();					// returns {done: false, value: 7}
towardsZeroAgain.return( 100 );				// returns {done: true, value: 100}
