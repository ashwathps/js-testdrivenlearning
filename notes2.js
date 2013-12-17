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

