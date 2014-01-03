
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
    

*/
