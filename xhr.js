/*
==================================================
XML HTTP REQUESTS
==================================================
It's better use 'fetch()' if possible
*/

// Basic example
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = event => {
	let results = request.response;
}
