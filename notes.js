/*
constructor function - A method that constructs an object.
Eg: Object(), Number(), String(), Function() - convention: Use Uppercase names.
Object() - returns an object
Function() - returns a instance of function which in-turn is used to create new objects using 'new'
*/

//Custom functions can be defined using
function MyCustom(){
this.property1 = "something";
}
//implicitly returns 'this'

/*
Invocation context : Who is calling MyCustom?
*/
MyCustom(); //-> 'property1' will go into global/parent scope (eg: console).
//same as above:

var x = MyCustom(); //although like alias, x is undefined.
var mc = new MyCustom(); //-> 'property1' will go into the caller scope 'mc'
//this is called instantiating a constructor function (so much not for JAVA/C++ programmers)
/* Perspective
  replace the function keyword with class and it looks familiar.
  class MyCustom(){
    this.property1 = "something";
  } 
  var cl = new MyCustom();
*/


//alias
var mycust = function MyCustom1(val){
this.property1 = val;
console.log(val);
}
//alias looking.
//c(); returns 'this' but doesn't pollute parent scope.
//made to return an object explicitly.
//its like any METHOD of JAVA or C++.
//this is NOT prototypal inheritance.

var c = function MyCustom2(val){
// or var c = function (val){
return {property2: val}
};


//without having to do 'new' native objects' values can be created via "Literals"
//custom or comples objects cant be done ?
var f = function(x, y){ return x+ y; }
//this is similar to alias, could be used as new f();, or just f();

/* f.name outputs ""
   c.name outputs "MyCustom2"
   
   ---------------Combined style------------
   var xyz = function abc(){}; //abc goes undefined in IE
   
   ------- best for all browsers -------
   function abc(){}; // function dec
   var xyz = abc
   
   Another reason for named function is for recursion & shortnamed calls
   although self reference can be done via 'arguments.callee', 
   which is still relatively long, and not supported in the strict mode.
   
   This is a function expression:
    var xyz = function(){};
    xyz here is defined from the point of assignment:
    
    http://kangax.github.io/nfe/
*/
/*

When using literal values for string, number, and boolean, an actual complex object is never 
created until the value is treated as an object. In other words, you are dealing with a 
primitive datatype until you attempt to use methods or retrieve properties associated 
with the constructor (e.g., var charactersInFoo = 'foo'.length). 

When this happens, JavaScript creates a wrapper object for the literal value behind the scenes, 
allowing the value to be treated as an object. Then, after the method is called, 
JavaScript discards the wrapper object and the value returns to a literal type. 
This is why string, number, and boolean are considered primitive (or simple) datatypes. 
I hope this clarifies the misconception that 
“everything in JavaScript is an object”               with the concept that 
“everything in JavaScript can act like an object.”

*/


//objects are like a dictionary
mc.property1;
mc['property1'];
//new keys can be added using [] or dot(.)

// Object literals - They are are like static objects (or static class?)
var Area = {
  square: function(){},
  rectangle: function(){}
}
//cannot do 'new' on Area - errors since Area is not a function
//new keyword always returns an object.
//A native like implementation of String() as MString()
/*
function MString(val){
  if(this instanceof MString){
    var v = val;
    this.tostringy = function(){ console.log("stringy" + v); }
  }else{
    return val;
  }
}
*/

// --- Primitives are stored as literals. referring to them will only make copy.
//primitives are equal by value

var string1 = "1";
var string2 = "1";
if(string1 === string2) //true

//complex objects ( those created with new() ) are equal by reference
var numObj1 = new Number(10);
var numObj2 = numObj1;

if(numObj1 === numObj2 ) //true
numObj2 = 10;

if(numObj1 === numObj2 ) //false

/*When a primitive value is used as if it were an object created by a constructor, 
JavaScript converts it to an object in order to respond to the expression at hand, 
but then discards the object qualities and changes it back to a primitive value
*/


var myNumber = new Number('23');
var myNumberL = 23;

myNumber.constructor === Number,
myNumberL.constructor === Number,

/* CATCH
instanceof operator will return false when dealing with primitive values 
that leverage object wrappers (e.g., 'foo' instanceof String // returns false).
*/

/*
unlike primitive values that would copy a value, objects (a.k.a. complex values) 
are stored by reference. As such, the reference (a.k.a. address) is copied, 
but not the actual value. This means that objects are not copied at all.

CATCH:
When the values String(), Number(), and Boolean() are created using the new keyword, 
the values continue to be stored/copied by value. So, even though primitive values 
can be treated like complex values, 
they do not take on the quality of being copied by reference.

*/

var objectFoo = {same: 'same'};
var objectBar = {same: 'same'};

console.log(objectFoo === objectBar); //false, because its by reference.

// All OBJECTS ARE BY REFERENCE.

var myFunction = new Function("x", "y", "return x * y");
typeof(myFunction);
//"function"

var myDate = new Date()
typeof(mydate); //logs Object

//typeof operator on Primitive Vs Complex object
var primitiveString1 = "string";
var primitiveString2 = String('string');

console.log(typeof myNull); // logs object? WHAT? Be aware...
console.log(typeof myUndefined); // logs undefined
console.log(typeof primitiveString1, typeof primitiveString2); 
  // logs string string
  
var myNumber = new Number(23);
console.log(typeof myNumber); // logs object

//Objects in jS are dynamic, hence mutable. Adding new properties can be done via the prototype chain
// or via direct addition to the instance. (means, instance properties)

/* augment the built-in String constructor Function() with the augmentedProperties 
property */
String.augmentedProperties = [];

if (!String.prototype.trimIT) { // if the prototype does not have trimIT() add it
   String.prototype.trimIT = function() {
       return this.replace(/^\s+|\s+$/g, '');
   }

   // now add trimIT string to the augmentedProperties array
   String.augmentedProperties.push('trimIT');
}
var myString = '  trim me  ';
console.log(myString.trimIT()); /* invoke our custom trimIT string method, 
                                logs 'trim me' */

console.log(String.augmentedProperties.join()); // logs 'trimIT'
//////////////////////////////////////////////////////////////////////////////////////////////////
//Constructor instances have the property 'constructor' that points to their constructor function

//Verify via the instanceOf operator. not for primitive objects.
// instanceof really only works with complex objects and instances created from 
// constructor functions that return objects.

//encapsulation
var foo = [{foo: [{bar: {say: function() {return 'hi';}}}]}];
console.log(foo[0].foo[0].bar.say()); // logs 'hi'

/*All object instances have a property that is a secret link [a.k.a. __proto__] 
to the constructor function that created the instance. This secret link can be 
leveraged to grab the constructor function, specifically the prototype property 
of the instance’s constructor function.
*/

//to check if a property has come from the instance or from the prototype chain
// use hasOwnProperty() method.
//if we need to check existence of any property (whether proto chain or instance property), use 'in'

var myObject = {foo: 'value'};
console.log('toString' in myObject); // logs true


var cody = {
    age : 23,
    gender : 'male'
};

for (var key in cody) { // key is a variable used to represent each property name
   // avoid properties inherited from the prototype chain
    if(cody.hasOwnProperty(key)) {
        console.log(key);
    }
}

/*Only properties that are enumerable (i.e., available when looping over an object’s properties) 
show up with the for in loop. For example, the constructor property will not show up. 
It is possible to check which properties are enumerable with the propertyIsEnumerable() method.
*/

//The Object() constructor function takes one optional parameter.

console.log(new Object('foo'));
console.log(new Object(1));
console.log(new Object([]));
console.log(new Object(function() {}));
console.log(new Object(true));
console.log(new Object(/\bt[a-z]+\b/));

/* Creating a string, number, array, function, boolean, and regex object instance 
via the Object() constructor is really never done. I am just demonstrating that  
it can be done */

var addFunction = new Function('num1', 'num2', 'return num1 + num2');

/* Alternately, a single comma-separated string with arguments can be
  the first parameter of the constructor, with the function body following. */
var timesFunction = new Function('num1,num2', 'return num1 * num2');

//No closure is created when invoking the Function() constructor directly.

//The arguments object has a property called callee, which is a reference to the function 
//currently executing.

var foo = function foo() {
   console.log(arguments.callee); // logs foo()
   /* callee could be used to invoke recursively the foo function 
   (e.g., arguments.callee()) */
}();

/*
The arguments.length property beginning with JavaScript 1.4 is deprecated, and the 
number of arguments sent to a function can be accessed from the length property of the 
function object. So, moving forward, you can get the length value by leveraging the callee 
property to first gain reference to the function being invoked (i.e., arguments.callee.length).*/

/*

A function can be defined in three different ways: a function constructor, a function statement, or a function expression. Below, I demonstrate each variation.

//function constructor: the last parameter is the function logic, everything before it is a parameter 
var addConstructor = new Function('x', 'y', 'return x + y');

// function statement
function addStatement(x, y) {
   return x + y;
}

// function expression
var addExpression = function(x, y) {
    return x + y;
};


Fourth type of definition for functions, called the “named function expression.” 
A named function expression is simply a function expression that also 
contains a name (e.g., var add = function add(x, y) {return x+y}).
*/

//Nested function

var foo = function() {
   var bar = function() {
       var goo = function() {
          console.log(this); // logs reference to head window object
       }();
   }();
}();

//the value of this for nested 
//functions will be the head object (e.g., window object in a web browser)
