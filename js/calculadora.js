window.onload=digitar;
var ele1="";
function digitar(){
  var cero=document.getElementById("num0");
cero.addEventListener("click",function() {clicEn("0");});
  var uno=document.getElementById("num1");
  uno.addEventListener("click",function(){clicEn("1");});
  var dos=document.getElementById("num2");
dos.addEventListener("click", function(){clicEn("2");});
 var tres=document.getElementById("num3");
tres.addEventListener("click", function(){clicEn("3");});
  var cuatro=document.getElementById("num4");
cuatro.addEventListener("click", function(){clicEn("4");});
 var cinco=document.getElementById("num5");
cinco.addEventListener("click", function(){clicEn("5");});
 var seis=document.getElementById("num6");
seis.addEventListener("click", function(){clicEn("6");});
 var siete=document.getElementById("num7");
siete.addEventListener("click", function(){clicEn("7");});
  var ocho=document.getElementById("num8");
ocho.addEventListener("click", function(){clicEn("8");});
 var nueve=document.getElementById("num9");
nueve.addEventListener("click", function(){clicEn("9");});
 var divi=document.getElementById("div");
divi.addEventListener("click", function(){clicEn("/");});
 var por=document.getElementById("mul");
por.addEventListener("click", function(){clicEn("*");});
 var res=document.getElementById("res");
res.addEventListener("click", function(){clicEn("-");});
 var sum=document.getElementById("sum");
sum.addEventListener("click", function(){clicEn("+");});
  var punt=document.getElementById("pun");
  punt.addEventListener("click", function(){clicEn(".");});
    var el=document.getElementById("pare");
  el.addEventListener("click", function(){clicEn("(");});
  var par=document.getElementById("par");
  par.addEventListener("click", function(){clicEn(")");});
 var bor=document.getElementById("eli");
  bor.addEventListener("click", borrar);
  var bo=document.getElementById("eli1");
  bo.addEventListener("click", borr);
  var cal=document.getElementById("igu");
  cal.addEventListener("click", calcul);
}

function clicEn(num){
  ele1+=num;
  var resul=document.getElementById("texto");
  console.log("Hola mundo")
	resul.textContent=ele1;
  if(ele1.length>10){
    alert("Paso el limite de caracteres");
    borrar();
  }
}

function calcul(){
  var re=eval(ele1);
	var res=document.getElementById("texto");
	res.textContent=re;
}

function borrar(){
  ele1="";
  	var borr=("");
	var resl=document.getElementById("texto");
	resl.textContent=borr;
}

function borr(){
  var resl=document.getElementById("texto");
	var ter=ele1.slice(0,-1);
	ele1=ter;
	resl.textContent=ter;
}