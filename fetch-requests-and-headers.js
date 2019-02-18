/*
==================================================
FETCH
==================================================
The 'fetch()' function is a cleaner way to do http requests and handle them using promises
*/


// USING 'FETCH'
// ------------------------------

// The 1st argument is the url we're requesting
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

// The 2nd argument is an object with the settings for the request
let requestSettings = {
	// method,
	// headers,
	// mode,
	// cache,
}

// Sending the request and handling the returned promise
fetch( requestURL, requestSettings ).then( response=>{
	/*
	Response properties:
	response.ok				// Boolean indicating if the url was fetched correctly or if there was an error
	response.status			// status code
	response.statusText		// descriptive text of the status
	
	Response methods:
	response.text()			// converts the response into plain text, also returns a promise (so you need to pass callbacks to handle it)
	response.json()			// same but converts to json
	response.blob()			// same but converts to blob data
	response.arrayBuffer()	// same but converts to array buffer
	response.formData()		// same but converts to form data
	*/
	return response.json();
}).then( response=>{
	console.log( response );
});


// USING 'REQUEST'
// ------------------------------

// The 'Request' class takes the same arguments as a fetch() function
let myRequest = new Request( requestURL, requestSettings );

// And then you can pass it as an argument to the fetch() function, so this makes it easier and more practical to store and reuse the same request settings multiple times
fetch( myRequest );

// You can also create new requests based on other existing ones, overriding just the settings you need to change
let anotherRequest = new Request( myRequest, {} );


// USING 'HEADERS'
// ------------------------------
// You can send custom headers to a request, The 'Headers' class lets you edit them more easily

// you can initialize it by passing an object with key-value pairs for each header
let myHeaders = new Headers({'Cache-control': 'no-cache'});

// Available methods
myHeaders.append( 'Cache-control', 'no-cache' );	// adds extra values to a header
myHeaders.set( 'Cache-control', 'no-cache' );		// replaces the entire value of a header
myHeaders.get( 'Cache-control' );					// get the value of a header
myHeaders.delete( 'Cache-control' );				// removes a header
myHeaders.has( 'Cache-control' );					// checks if a given header exists
