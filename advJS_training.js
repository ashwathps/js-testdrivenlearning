Datatypes, number is evaluated by approximation, no definite 
x = 1, x -=0.05
js alt, dart, coffescript, typescript, 

JS is a Functional+Object based

var x = {}                                                  |                            var f = function(){}
var x = new Object()                                        |                            var f = new Function("a", "b", "body")
x.id = 100                                                  |                           f.id = 100
x.callme = function();                                      |                              f.callme = function()
x.callme()                                                  |                              f.callme()


highscalability.com

function parseJSON(asString){
    return new Function("return " + asString)();
}	

//abstract equality comparison Algo.
1 == "1" if u want the result to be true
1 === "1" if u want it to be false, strict type checking

=== to get boolean equivalence of an expr, like !!<expr>


function add(a1, a2){

	function parseArg(n){
		
		if(n === undefined) return 0;
		if(Array.isArray(n)){
			var res = 0;
			for(var i = 0; i < n.length; ++i) {
				res += parseArg(n[i]);
			}
			return res;
		}
		//OR
		if(Array.isArray(n)){ return add.apply(this, n); } 
		//converts array to a arguments list, which is handled in the below code
		
		if( typeof n === "function")  return parseArg(n());	
		return isNaN(n) ? 0 : parseInt(n); 
		
	}
	var result = 0;
	for(var i = 0; i < arguments.length; ++i) {
		result += parseArg(arguments[i]);
	}
	//OR
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments, 1));
	/*var n1 = a1, n2 = a2;
	if(a1 === undefined) n1 = 0;
	if(a2 === undefined) n2 = 0;
	n1 = isNaN(a1) ? 0 : parseInt(a1); 
	n2 = isNaN(a2) ? 0 : parseInt(a2); 
	
	if( typeof a1 === "function") n1 = add(a1());
	if( typeof a2 === "function") n2 = add(a2());	

	if ( Array.isArray(a1) ) n1 += */ 
	return result;
	
};

//Invocation context
fn()
fn.call(thisobject) / fn.apply(thiscontextobject)

//arguments is NOT an array
//this is ducktyping, just because arguments has length and index, it cannot be an array. :)

//closure examples

function spinner(){
var i = 0;
return {
	up: function(){
		++i;
		return i;
	},
	down: function(){
		--i;
		return i;
	}
}
}
//////////////////////////////////////

function isPrime(){

	//check if divisible by number < n/2
	var arr = {};
	return function(n){
		arr[n] = true;
		if(typeof arr[n] !== undefined){
		}
		else{
			for(var i = 2; i <= n/2 ; ++i)
			{
				if( n % i === 0) arr[n] = false;
			}
		}
		return arr;
	}
	
}

//above isPrime can be used for any function, pass fn as the arg. and call fn from line 100 above.
// Decorator pattern
// var memorizeAdd = memorize(fn);
// memorizeAdd(10, 20, 30);
/////////////

function whoami(){
	console.log(" I am " + this.name);
}
var emp = {
	name: "ashwath"
};

whoami = whoami.bind(emp);

}
}

//protect id and expose setter and getters
function Employee(_id){
	//console.log("Constructor = " + this.constructor + " Callee is " + arguments.callee);
	if(this.constructor !== Employee) //arguments.callee)
		return new Employee(id);
	var id = 0;
	//cannot do protoype and hide, bcos inside the protype, "this" cannot access id.
	/*Employee.prototype.setid = function(_id){
	 if(_id > 0) id = _id;
	}
	Employee.prototype.getid = function(){
		return id;
	}*/
	this.id__ = function(){
			if(arguments.length === 0) return id;
			if(arguments[0] > 0) id = _id;
	}
	this.id__(_id);
}


//protypal inheritance
//set base at time of creation.
//prototype hopping, to resolve attributes during access (read), write will create in the immediate level. base object unalteren

var baseObj = {
	id: 100,
	display: function(){
		console.log(this.id, this.name);
	}
}

function Employee(name){
 this.name = name;
}

Employee.prototype = baseObj;
	Object {id: 100, display: function}
var e = new Employee("a");

e.id
100
e.name
"a"

//add method at prototype level instead of object level, reduce creation of same method for every object creation (function is also an object)


