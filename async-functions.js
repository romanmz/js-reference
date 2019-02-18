/*
==================================================
ASYNC FUNCTIONS, AWAIT STATEMENTS
==================================================
You can use async functions to manage promises in a cleaner way.

Calling an async function ALWAYS returns a Promise,
if the body of the function returns a value, then that makes that promise resolve
if the function throws an error instead, then the promise is rejected

You can also use async functions as object and class methods, and use the arrow syntax
*/


// USING ASYNC FUNCTIONS
// ------------------------------
async function asyncFunction() {
	let randomSuccess = Math.floor( Math.random() * 2 );
	if( randomSuccess ) {
		return 'the operation was successful!';
	} else {
		throw Error( 'the operation failed!' );
	}
}
asyncFunction()
	.then( response => { console.log( response ) } )
	.catch( error => { console.log( error ) } )
	.finally( () => { console.log( 'finally!' ) } );

// you can also create async function statements
// let anotherAsyncFunction = async function() {}


// USING THE 'AWAIT' STATEMENT
// ------------------------------
/*
Inside an async function you can use the 'await' statement to call other promises, this does two things:
- pauses the execution of the function at that point and waits until that promise is resolved (or rejected)
- if it was resolved, it automatically unwraps the resolved value so you can pass it to a variable straight away
- if it was rejected, you can handle it with a try {} catch {} statement, otherwise the main async function is also rejected and forwards the received error message
*/
function resolvesIn2Secs() {
	return new Promise((resolve, reject)=>{
		setTimeout( ()=>{ resolve('resolved!') }, 2000 );
	});
}
function rejectsIn2Secs() {
	return new Promise((resolve, reject)=>{
		setTimeout( ()=>{ reject('rejected!') }, 2000 );
	});
}
async function awaitFunction() {
	// waits 2 seconds, gets successful result
	let result1 = await resolvesIn2Secs();
	// waits another 2 seconds, the function fails but it's inside a 'try' statement, so the async function catches the error and continues running
	try { let result2 = await rejectsIn2Secs() } catch(e) {}
	// waits another 2 seconds, callback fails and causes the whole async function to also be rejected, it throws the same error received from the awaited function
	let result3 = await rejectsIn2Secs();
	// unreachable
	return 'async function succeeded!';
}

// logs the error after waiting for 6 seconds
awaitFunction()
	.then( success => { console.log( 'success: '+success ) } )
	.catch( error => { console.log( 'error: '+error ) } );


// USING A DELAYED 'AWAIT' STATEMENT
// ------------------------------
/*
In the previous example we use 'await' at the same time we are invoking each promise to wait for each of them to resolve sequentially
but another alternative is to invoke all of the promises at the same time and have them run in parallel,
and then use 'await' later until we actually need to use the returned values.
*/
async function delayedAwaitFunction() {
	let result1 = resolvesIn2Secs();
	let result2 = resolvesIn2Secs();
	let result3 = rejectsIn2Secs();
	return await result1 + await result2 + await result3;
}

// logs the error after only 2 seconds
delayedAwaitFunction()
	.then( success => { console.log( 'success: '+success ) } )
	.catch( error => { console.log( 'error: '+error ) } );
