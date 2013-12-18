//Definition of a closure

// Scope of a function at the time it was defined is retained. 
// Not the scope when the function was invoked.

// A function defined inside an outer function can be invoked using the scope it was defined although
// the outer function has already completed execution.


// Difference between var and no-var
/*

 var or no-var in global scope - NO DIFFERENCE.
 var inside a scope is for that scope only. 
 
 if no-var then it searches the scope chain to resolve. If not found, creates one with global scope
 
 ECMA5
 In strict mode, assignment to an undeclared identifier is a ReferenceError.

*/

var foo = { // window is implied here, window.foo
   fooMethod: function() {
       alert('foo' + 'bar'); // window is implied here, window.alert
       window.alert('foo' + 'bar'); /* window is explicitly used, 
                                    with the same effect */
   }
}

/*
Being explicit [e.g., window.alert() versus alert()] costs a little bit more with regards to 
performance (how fast the code runs). It’s faster if you rely on the scope chain alone and 
avoid explicitly referencing the head object even if you know the property you want is 
contained in the global scope.
*/

//THIS keyword
//When a function is created, a keyword called this is created (behind the scenes), 
//which links to the object in which the function operates. Said another way, 
//this is available to the scope of its function, yet is a reference to the object of 
//which that function is a property/method.
var cody = {
   living : true,
   age : 23,
   gender : 'male',
   getGender : function() {return cody.gender;} //or this.gender
};

/*
As opposed to arguments and any parameters sent to the function, 
this is a keyword (not a property) in the call/activation object.
*/

//The value of this, passed to all functions, is based on the context in which the function 
//is called at runtime

var foo = 'foo';
var myObject = {foo: 'I am myObject.foo'};

var sayFoo = function() {
   console.log(this['foo']);
};

// give myObject a sayFoo property and have it point to sayFoo function
myObject.sayFoo = sayFoo;

myObject.sayFoo(); // logs 'I am myObject.foo'
sayFoo(); // logs 'foo'


//All variables except this and arguments follow lexical scope.

//this when it is used inside of a function that is contained inside of another function. 
//The bad news is in ES3, this loses its way and refers to the head object 
//(window object in browsers), instead of the object within which the function is defined.

var myObject = {
   func1: function() {
       console.log(this); // logs myObject
       var func2 = function() {
          console.log(this) // logs window, and will do so from this point on
          var func3 = function() {
              console.log(this); // logs window, as it's the head object
          }();
       }();
   }
}
myObject.func1();

//A WA is to store the 'this' into 'that' and refer 'that' from then on.
//Another scenario
//fixed in ES5
var foo = {
   func1:function(bar) {
       bar(); // logs window, not foo
       console.log(this); /* the this keyword here will be a reference to 
                          foo object */
   }
}
foo.func1(function(){console.log(this);});

//to resolve this, helps to understand why apply n call are needed although functions can be invoked
// by function statment.
//Controlling the Value of this Using call() or apply()

var myObject1 = {};

var myFunction1 = function(param1, param2) {
   // set via call() 'this' points to myObject when function is invoked
   this.foo = param1;
   this.bar = param2;
   console.log(this) // logs Object {foo = 'foo', bar = 'bar'}
};

myFunction1.call(myObject1, 'foo', 'bar'); /* invoke function, set this value to 
                                         myObject */

//understanding invocation context.
var Person = function(name) {
   this.name = name || 'john doe'; // this will refer to the instance created
}

var cody = new Person('Cody Lindley'); /* create an instance, 
                                       based on Person constructor */

console.log(cody.name); // logs 'Cody Lindley'
console.log(myObject1) // logs Object {foo = 'foo', bar = 'bar'}

var c = Person('me');
c.name; //undefined
window.name; //me

//Understanding name resolution via prototype chain again

var Person = function(x){
    if(x){this.fullName = x};
};

Person.prototype.whatIsMyFullName = function(){
    return this.fullName1; // 'this' refers to the instance created from Person()
}

var v = new Person('ashwath');
//undefined
v.whatIsMyFullName()
//undefined
Object.prototype.fullName1 = 'window name';
//"window name"
v.whatIsMyFullName()
//"window name"

//SCOPE
/*three types of scope: 
//global scope, local scope (sometimes referred to as “function scope”), and eval scope.
//The global scope is the last stop in the scope chain.

Functions that contain functions create stacked execution scopes. 
These stacks which are chained together are often referred to as the scope chain. (something like the prototype chain)

NO BLOCK Scope.

The scope chain is decided based on the location of a function 
during definition, not during invocation. 
This is also called lexical scoping

scope chain is created before you invoke a function. Because of this, we can create closures
*/

// use var inside functions to avoid scope conflicts with global.

var parentFunction = function() {
   var foo = 'foo';
   return function() { // anonymous function being returned
       console.log(foo); // logs 'foo'
   }
}

// nestedFunction refers to the nested function returned from parentFunction
var nestedFunction = parentFunction();

nestedFunction(); /* logs foo because the returned function accesses foo 
                  via the scope chain */
                  

//For  more info
// http://jibbering.com/faq/notes/closures/
// http://kangax.github.io/nfe/

// Prototype Chain

//prototype property is an object created by JavaScript for every Function() instance. 
//Specifically, it links object instances created with the new keyword back to the 
//constructor function that created them

// at the time of property name resolution, it searches the proto chain via constructor.
//  prototype object is created for every function, regardless of whether you intend to 
//  use that function as a constructor.


/*

All functions are created from a Function() constructor, even if you do not directly 
invoke the Function() constructor (e.g., var add = new Function('x', 'y', 'return x + z');) 
and instead use the literal notation (e.g., var add = function(x,y){return x + z};).

When a function instance is created, it is always given a prototype property, 
which is an empty object. Below, we define a function called myFunction, 
then we access the prototype property, which is simply an empty object.
*/

var myFunction = function() {};
console.log(myFunction.prototype); // logs object{}
console.log(typeof myFunction.prototype); // logs 'object'
/*

Prototype property is coming from the Function() constructor. 
It is only once we intend to use our function as a user-defined constructor function that the 
prototype property is leveraged, but this does not change the fact that the Function() 
constructor gives each instance a prototype property.
*/
