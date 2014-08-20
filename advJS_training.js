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







