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


