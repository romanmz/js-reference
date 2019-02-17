/*
==================================================
CONTROL FLOW
==================================================


'FALSY' VALUES
------------------------------
Values of all data types that evaluate to 'false' in an expression:
- false
- undefined
- null
- 0
- NaN
- '' (empty string)


CONTROL FLOW STATEMENTS
------------------------------

if( expression ) {
	// if true
} else {
	// if false
}

switch( variable ) {
	case 'value 1':
		// specific action
		break;
	default:
		// default action
}


LOOPS
------------------------------

for( init, condition, increment ) {
	// repeatable action
	// 'increment' statement is called automatically
}

while( condition ) {
	// repeatable action
	// you need to make sure the condition changes every time to avoid getting into an infinite loop
}

do {
	// repeatable action that must always run at least once
} while( condition )

for( property in object ) {
	// loops through all the enumerable properties of an object
}

for( value of object ) {
	// loops through the values of all the enumerable properties of an object. The object must be an 'iterable'
}


BREAK AND CONTINUE
------------------------------

// if you have to nest multiple control flow statements, you can label each of them to more easily refer to them later on, just add a keyword with a colon before the statement:
mainloop: while( condition ) {}

// 'break' lets you finish early the current innermost statement
// if you add a keyword after it then it will break the innermost statement that was labeled with that same keyword
break
break mainloop

// 'continue' lets you end the current iteration of a loop and begin the next one
// if you add a keyword after it then it will skip to the next iteration of the loop that was labeled with that keyword
continue
continue [label]


ERRORS AND EXCEPTIONS HANDLING
------------------------------

try {
	// statements that may 'throw' an error
} catch( e ) {
	// this code of block only runs if the previous statement failed
	// you can inspect the passed argument to get details about the error
} finally {
	// this block is always executed whether or not an exception was thrown during 'try'
	// any 'return' statements inside 'finally' are used instead of return or throw statements inside 'try' and 'catch'
}

// when using 'throw' on your own code, you can pass any kind of data as the error,
// but it's best practice to use a proper error object
// built-in error objects:
- Error
- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError
- DOMException

*/
