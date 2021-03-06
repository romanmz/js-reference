/*
==================================================
PROMISES
==================================================
A promise is an object that represents an asynchronous event that can either succeed or fail and lets you handle either case

During the execution of the asynchronous event, the promise will have 1 of 4 possible states
- pending		// initial state
- fulfilled		// if the promise was successfully resolved
- rejected		// if the promise was rejected
- settled		// if the operation has ended (after success or error)
*/


// CREATING A PROMISE
// ------------------------------
// When creating a promise you need to pass a function which will in turn receive two arguments
// those arguments are callback functions you need to trigger to indicate if the operation succeeded or failed
let mypromise = new Promise((resolve, reject)=>{
	// We're using a timeout here just to simulate that we're running an async request
	setTimeout( ()=>{
		let randomSuccess = Math.floor( Math.random() * 2 );
		if( randomSuccess ) {
			resolve( 'the operation was successful!' );
		} else {
			reject( Error( 'the operation failed!' ) );
		}
	}, 1000 );
});


// USING A PROMISE
// ------------------------------
// Pass a callback function to the .then() method to handle successful calls
mypromise.then( response => {
	console.log( response );
} )
// Use the .catch() method to handle failed calls, you could also pass a 2nd callback to .then() to do the same, but you can't use both at the same time
.catch( error => {
	console.log( error );
})
// Use the .finally() method to run a final block of code at the end regardless of whether or not the operation was successful
.finally( () => {
	console.log( 'finally!' );
});


// HANDLING MULTIPLE PROMISES AT ONCE
// ------------------------------

// Use the static method Promise.all() to group multiple promises and handle them using a single one
// the new promise will resolve only when all the internal promises have done the same, and as soon as one of them is rejected then the main promise will also fail
let allPromises = Promise.all( [promise1, promise2] );

// Promise.race() also lets you group multiple promises into a single one,
// but in this case as soon as one of the internal promises is resolved or rejected, the main promise will do the same and ignore all others
let firstPromise = Promise.race( [promise1, promise2] );


// ASYNC FUNCTIONS
// ------------------------------
// async functions are a slightly simpler way of using promises, check out the async-functions.js file
