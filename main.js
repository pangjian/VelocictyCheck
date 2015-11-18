var initTmplbefore = function(){
  var tmpl = document.querySelector('#tmpl').innerHTML;
  $("#smsTmlBefore").val(tmpl);
  $("#smsTmlAfter").val(tmpl);
};

var smsTmlBefore = "";
var smsTmlAfter = "";

var smsTmlRefBefore = [];
var smsTmlRefAfter = [];

var beforeStr = "";
var afterStr = "";

var isString = function(a){
  return typeof a === 'string';
};

var isArray = function(a){
  return a instanceof Array;
};

var filerTmpl = function(asts, flag){
  if( isArray(asts)){
    for (var i = 0; i <asts.length; i++) {
      filerTmpl(asts[i], flag);
    };
  }else if(typeof asts == 'object'){
    if(flag === 'before'){
      smsTmlRefBefore.push({
        type : asts.type,
        id : asts.id
      });
    }
    if(flag === 'after'){
      smsTmlRefAfter.push({
        type : asts.type,
        id : asts.id
      });
    }
  }else if(isString(asts)){

  }else{
    console.log(flag + " Unknown type: "+asts);
  }
};

var compareArray = function(array1, array2){
  if(array1.length != array2.length){
    return false;
  }
  for(var i=0;i<array1.length;i++){
    if(array1[i].id && array1[i].id){
      if(array1[i].id != array2[i].id){
        return false;
      }
    }
    if(array1[i].type && array2[i].type){
      if(array1[i].type != array2[i].type){
        return false;
      }
    }
  }
  return true;
};

var checkTmpl = function(){
  smsTmlBefore = $("#smsTmlBefore").val();
  smsTmlAfter = $("#smsTmlAfter").val();
  var Velocity = require('velocity');
  var Parser = Velocity.parse;
  var Compile = Velocity.Compile;

  var smsTmlBeforeAsts = Parser(smsTmlBefore);
  try{
  var smsTmlAfterAsts = Parser(smsTmlAfter);
}catch(e){
  alert("false!!!!!模板语法错误");
}
  filerTmpl(smsTmlBeforeAsts, "before");
  filerTmpl(smsTmlAfterAsts, "after");
  if(!compareArray(smsTmlRefBefore, smsTmlRefAfter)){
    alert("false!");
    //$("#smsTmlBeforeAsts").text(smsTmlBeforeAsts);
    //$("#smsTmlAfterAsts").text(smsTmlAfterAsts);
    console.log(smsTmlBeforeAsts);
    console.log(smsTmlAfterAsts);
    $("#smsTmlAfter")
  }else{
    $("#smsTmlAfter")
  }
};

initTmplbefore();