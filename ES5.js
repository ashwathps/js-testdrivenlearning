// ES 5 supporting browsers
//properties having method bodies like .Net

function Book(){
  var name = "";
  Object.defineProperty(this, 'propname', {
    set: function(val){
      name = val;
    },
    
    get: function(){
      return name;
    }
    });


}
