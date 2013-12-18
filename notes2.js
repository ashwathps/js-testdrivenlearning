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

var myFunction = function() {}; //default value of prototype is Object()
console.log(myFunction.prototype); // logs object{}
console.log(typeof myFunction.prototype); // logs 'object'
/*

Prototype property is coming from the Function() constructor. 
It is only once we intend to use our function as a user-defined constructor function that the 
prototype property is leveraged, but this does not change the fact that the Function() 
constructor gives each instance a prototype property.
*/

//The value of a prototype property can be set to any of the complex values (
// i.e., objects) available in JavaScript. 
//JavaScript will ignore any prototype property  set to a primitive value.


/*

When object is created from a constructor function using the new keyword 
(or when an object wrapper is created for a primitive value), it adds a hidden link between 
the object instance created and the prototype property of the constructor function used to create it. 
This link is known inside the instance as __proto__ 
[though it is only exposed/supported via code in Firefox 2+, Safari, Chrome, and Android]. 
JavaScript wires this together in the background when a constructor function is invoked and 
it’s this link that allows the prototype chain

*/

Array.prototype.foo = 'foo';
var myArray = new Array();

console.log(myArray.__proto__.foo); //not a ECMA standard

console.log(myArray.constructor.prototype.foo); //alternative, more verbose.

//Careful! Anything added to Object.prototype will show up in a for in loop.


/*

Replacing the prototype Property with a New Object Removes the Default Constructor Property

It’s possible to replace the default value of a prototype property with a new value. 
Doing so, however, will eliminate the default constructor property found in 
the “pre-made” prototype object—unless you manually specify one.
*/

var Foo = function Foo(){};

Foo.prototype = {}; // replace prototype property with an empty object

var FooInstance = new Foo();

console.log(FooInstance.constructor === Foo); /* logs false, we broke the reference */
console.log(FooInstance.constructor); // logs Object(), not Foo()

//reversing the damage

Foo.prototype = {constructor:Foo};
var FooInstance = new Foo();

console.log(FooInstance.constructor === Foo); // logs true

//both are same.
Foo.prototype = {x:1};

Foo.prototype.x = 1;

// BUT BUT, look closely
// This is not same
// Replacing the prototype Property with a New Object Does Not Update Former Instances
var Foo = function Foo(){};
Foo.prototype.x = 1;
var FooInstance = new Foo();
console.log(FooInstance.x); // logs 1, as you think it would

// now let's replace/override the prototype object with a new Object() object
Foo.prototype = {x:2};

console.log(FooInstance.x); /* logs 1, WHAT? Shouldn't it log 2, we just updated prototype */
/* FooInstance still references the same state of the prototype object that
was there when it was instantiated. *

Do Not Change prototype once instances are created */

// access properties directly or Leverage prototype as a fallback - breaking the proto chain from running.

var Person = function(legs, arms) {

   // shadow prototype value
   if (legs !== undefined) {this.legs = legs;}
   if (arms !== undefined) {this.arms = arms;}
};

Person.prototype.legs = 2;
Person.prototype.arms = 2;
Person.prototype.countLimbs = function() {return this.legs + this.arms;};

var chuck = new Person(0, 0);

//Vs

var Person = function() {};

// all Person instances inherit a legs, arms, and countLimbs properties
Person.prototype.legs = 2;
Person.prototype.arms = 2;
Person.prototype.countLimbs = function() {return this.legs + this.arms;};

var chuck = new Person();

// INHERITANCE

Person.prototype.foo = 'foo';

var Chef = function(){this.goo = 'goo'};
Chef.prototype = new Person();
var cody = new Chef();

console.log(cody.foo); // logs 'foo'
console.log(cody.goo); // logs 'goo'
console.log(cody.bar); // logs 'bar'

//ARRAY

/*
The length property of an array object can be used to get or set the length of an array. 
As shown above, setting the length higher than the actual number of values contained in the 
array will add undefined values to the array. What you might not expect is that you can actually 
remove values from an array by setting the length value to a number less than the number of values 
contained in the array. 
*/

var myArray = ['blue', 'green', 'orange', 'red'];
console.log(myArray.length); // logs 4
myArray.length = 99;
console.log(myArray.length); /* logs 99, remember we set the length, 
                             not an index */
myArray.length = 1; // removed all but one value, so index [1] is gone!
console.log(myArray[1]); // logs undefined

console.log(myArray); // logs '["blue"]'

//Primitive/Literal Values Are Converted to Objects When Properties Are Accessed

/*
Note

Don’t confuse null with undefined. undefined is used by JavaScript to tell you that 
something is missing. null is provided so you can determine when a value is expected but 
just not available yet.

Note

When verifying a null value, always use === because == does not distinguish between null and 
undefined.


It is considered good practice to allow JavaScript alone to use undefined. 
You should never find yourself setting a value to undefined, as in foo = undefined. 
Instead, null should be used if you are specifying that a property or variable value is not available.


*/

console.log(undefined in this);  //true


/*
Other notes

Math Is Not a Constructor Function

The Math object is unlike the other built-in objects that are instantiated. 
Math is a one-off object created to house static properties and methods, ready to be used when 
dealing with numbers. Just remember, there is no way to create an instance of Math, 
as there is no constructor.


Many of the Math properties are constants that cannot be mutated. 
Since this is a departure from the mutable nature of JavaScript, 
these properties are in all-caps (e.g., Math.PI;). Do not confuse these property constants for constructor functions due to the capitalization of their first letter. They are simply object properties that cannot be changed.
Note

User-defined constants are not possible in JavaScript 1.5, ECMAScript 3 Edition.

*/

var Math = {
PI : function(){console.log('pi called');}
}
