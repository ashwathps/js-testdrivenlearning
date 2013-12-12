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

//objects are like a dictionary
mc.property1;
mc['property1'];
//new keys can be added using [] or dot(.)

