/*
1.   Function argument pattern

    using the 'arguments' argument that is passed to all functions in JS
*/


/*

2.  Chaining
*/

/*
3.  Observable property pattern
    store incoming callbacks in an array and execute them upon appropriate action.
*/

/*
4.  Timer pattern

    setInterval & setTimeout
    dont-use (inconsistent impl on diff browsers)
    if timeout val < 4ms its pushed to 4ms (min)
    
    timers wont start until the outermost function has finished execution.
    
    timer stack can get pre-empted by the response from a long running/pending function call.

4.1.  Async execution pattern
    
    browser is typically a single threaded (hence the webworkers)
    Long running JS can cause poor response. so split up using setTimeout
    setInterval has problems: 
    after the 1st setInterval finishes, it is pushed to the timer queue. 
    If the 1st is waiting for an AJAX response, then multiple setInterval functions will be queued 
    for processing the AJAX. 

4.1.1    Recursive setTimeout Pattern
    In that sense, setTimeout is better since the code in in control of the next 
    setTimeout call (after the AJAX response)

*/

/*
5.0     Asynchrnous Module definition AMD
        if not available, bring it in
        
        How to specify code blocks that depend on other blocks?
        How to prevent scope leakage ( declaring variable without 'var')
        JS loading is one at a time & process one
        
        commonJS - attempt to standardize JS patterns & generic to all runtimes
        
        Node.js Module system
        file: app.js
        
        var Logic = require('./logic.js')
        
        file: logic.js
        
        var logic = function(){
        //blah
        }
        
        //node.js runtime will copy & run logic.js code inside a function, an implicit closure
        //hence the error when " require'd "
        //use module object exposed globally by node.js
        module.exports = logic //need new Logic()
        module.exports.logic = new logic() // no new required
        or literal
        module.exports = {
            add: function(x, y){
                return new logic().operation(x,y);
            },
            another: <function....>
        }
        
*/
