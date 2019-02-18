/*
==================================================
ADVANCED TOPICS
==================================================


STRICT MODE
------------------------------
"use strict";
Applies to its current context, which can be individual functions/blocks, or entire scripts
Be aware that concatenating strict and non-strict scripts can cause errors

Turns mistakes into proper errors:
- throws errors if you accidentally define global variables (i.e. not using 'var', 'let' or 'const')
- trying to redefine or delete standard variables and objects will throw an error
- trying to write or delete to non-writable properties will throw an error
- you can't have multiple function arguments with the same name (they also can't match the name of the function itself)
- the only valid syntax for octal numbers is '0o', '0' will throw an error

Simplifies variable use:
- doesn't allow 'with' blocks: with(somevar) {}
- code inside 'eval()' won't affect existing surrounding variables, nor introduce new ones, everything is scoped within that eval call
- for 'eval()' to run in strict mode, you can explicitely pass 'use strict'; in the passed string, or run the function inside a strict context (context only works if eval is not run through an alias)
- you can't use 'delete' to delete plain variables (only properties)

Simplifies 'eval()' and 'arguments'
- attempts to redefine or reassign 'eval' and 'arguments' will throw an error
- arguments property will always keep the original values from when the function is called (as opposed to loose mode where if you change the value of a named argument, the arguments array also changes)
- arguments.callee is not supported anymore, you can just name the enclosing function and use that name instead

Adding security
- in normal functions, the value of 'this' is always an object (the object itself it was called on, a boxed object for strings, numbers and values, or the global object if undefined or null)
	in strict mode, 'this' always refers to the value it was called on, it's never mapped to anything else
- inside a function (for example 'funcname'), you can't read or write the funcname.caller and funcname.arguments properties anymore
- same with the arguments.caller property

Future ECMA
- many new words become reserved keywords in preparation for future ECMA features, so you can't use them as vars, function names, labels, etc:
	- implements
	- interface
	- let
	- package
	- private
	- protected
	- public
	- static
	- yield
- ES5 also reserves these words all the time, not just in strict mode:
	- class
	- enum
	- export
	- extends
	- import
	- super
- function definitions must be at the top-level of their context, i.e. they can't be defined inside conditionals or loops


MEMORY MANAGEMENT
------------------------------
reference-counting
mark-and-sweep


RUNTIME CONCEPTS
------------------------------
- stack			// list of steps on a single action, e.g. when a function calls other functions, their contexts and variables are stacked on top of each other and solved one by one
- queue			// the list of 'messages' to be processed, each message can create its own stack that needs to be solved before finishing the message and moving on to the next one
- heap			// a mostly unstructured region of memory where objects are allocated

EVENT LOOP
- messages are processed one by one
- messages are added any time an event occurs, and said event has a listener attached to it. also with the setTimeout function (the time argument indicates a minimum time, not a guaranteed time)
- even if you added a timeout with '0' delay, it will still need to wait before all messages from the main queue are processed

- web workers or cross-origin iframes have their own runtimes (stack, heap and message queue)
- to add messages from one runtime to another you can use the window.postMessage method in one, with a 'message' event listener on the other


DEBUGGER
------------------------------
Adding the 'debugger' keyword anywhere will stop execution of the program and open up the browser's debugging tools (similar to manually adding a breakpoint)
