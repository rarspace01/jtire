/************************************************************************************************************
Ajax dynamic content
Copyright (C) 2006  DTHMLGoodies.com, Alf Magne Kalleland

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

Dhtmlgoodies.com., hereby disclaims all copyright interest in this script
written by Alf Magne Kalleland.

Alf Magne Kalleland, 2006
Owner of DHTMLgoodies.com


************************************************************************************************************/	

var enableCache = false;
var jsCache = new Array();

var sprehsntsn="";
var shsnwasload=false;
var shsnrwasload=false;
var spuffer="";

var aListModelInfosX = new Array();
var aListAvailCHK = new Array();

var lastRHTML="";

var dynamicContent_ajaxObjects = new Array();

function ajax_showContentonElement(divId,ajaxIndex,url,mode,callbackOnComplete)
{

if(divId!=-1){
var targetObj = document.getElementById(divId);	
}


	spuffer=dynamicContent_ajaxObjects[ajaxIndex].response;

	spuffer=spuffer.replace("\n","");
	spuffer=spuffer.replace("\r","");
	spuffer=spuffer.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>","");
	
	var pPart=spuffer.search("\">");

	spuffer=spuffer.substring(pPart+2);

	//alert(spuffer);
		var $dom=$.xmlDOM(spuffer, function(error) {
    alert('A parse error occurred! ' + error);
	}); 
	
if(mode==2){
	shsnwasload=true;
	
	targetObj.innerHTML = "";
	
	var iocount=0;
	
	$dom.find('DataLine').each(function() {
		if($(this).text().length>0){
		targetObj.options.length=iocount+1;
		targetObj.options[iocount].text=$(this).find('BrandText').text();
		targetObj.options[iocount].value=$(this).find('BrandCode').text();
		iocount++;
		}
		
		}
		
		);
	
}else if(mode==3){
targetObj.innerHTML = "";
	
	var iocount=0;
	
	$dom.find('DataLine').each(function() {
		if($(this).text().length>0){
		targetObj.options.length=iocount+1;
		targetObj.options[iocount].text=$(this).find('TypeText').text();
		targetObj.options[iocount].value=$(this).find('TypeCode').text();
		iocount++;
		}
		
		}
		
		);
}else if(mode==4){
targetObj.innerHTML = "";
	
	var iocount=0;
	
	aListModelInfosX=new Array();
		
	var aListModelInfosY=new Array();
	
	
	
	$dom.find('DataLine').each(function() {
		if($(this).text().length>0){
		targetObj.options.length=iocount+1;
		targetObj.options[iocount].text=$(this).find('ModelText').text()+""+" - "+$(this).find('Power').text()+" KW ("+runde(($(this).find('Power').text()*1.359622), 0)+"PS) - "+$(this).find('Displacement').text()+"cm³ - "+$(this).find('ModelDate').text();
		aListModelInfosY=new Array($(this).find('BrandCode').text(),$(this).find('TypeCode').text(),$(this).find('ModelCode').text(),$(this).find('ModelDate').text(),$(this).find('Variant').text(),$(this).find('MotorType').text(),$(this).find('DrivingAxle').text(),$(this).find('Power').text(),$(this).find('Displacement').text());
		aListModelInfosX.push(aListModelInfosY);
		targetObj.options[iocount].value=iocount;
		iocount++;
		}
		
		}
		
		);
}else if(mode==6){ //RIM Result

	aListAvailCHK=new Array();

	alert($dom.text());
	
	targetObj.innerHTML = "";

	targetObj.innerHTML = targetObj.innerHTML +"<div id='idrims'>";

	//alert($dom.find('DataLine').text());

	//alert($dom.find('DataLine').length);
	
	$dom.find('DataLine').each(function() {

		targetObj.innerHTML = targetObj.innerHTML +"<div id='idrim'>";

		//add id to check
		aListAvailCHK.push(""+$(this).find('Article').text());		
		
		//Image
		targetObj.innerHTML = targetObj.innerHTML +"<img src='"+$(this).find('Image').text()+"'><br/>";
		targetObj.innerHTML = targetObj.innerHTML +"ArtikelNr.: "+$(this).find('Article').text()+"&nbsp;<br/>";
		targetObj.innerHTML = targetObj.innerHTML +"<a href='"+$(this).find('Certificate').text()+"'>T&Uuml;V</a><br/>";
		targetObj.innerHTML = targetObj.innerHTML +"Dimension: "+$(this).find('Dimension').text()+"<br/>";
		targetObj.innerHTML = targetObj.innerHTML +"BoltPattern: "+$(this).find('BoltPattern').text()+"<br/>";
		targetObj.innerHTML = targetObj.innerHTML +"BoltCircle: "+$(this).find('BoltCircle').text()+"<br/>";
		targetObj.innerHTML = targetObj.innerHTML +"CenterBore: "+$(this).find('CenterBore').text()+"<br/>";
		targetObj.innerHTML = targetObj.innerHTML +"Offset: "+$(this).find('Offset').text()+"<br/>";
		targetObj.innerHTML = targetObj.innerHTML +"F&uuml;r Reifen:<br/>";
		
		//Reifen print
		$dom.find('TyreLine').each(function() {
		
		targetObj.innerHTML = targetObj.innerHTML +"Auf: "+$(this).find('Tyre').text()+ "<br/>";
		
		});
		
		
		targetObj.innerHTML = targetObj.innerHTML +"<br/></div>";

	});

	targetObj.innerHTML = targetObj.innerHTML +"</div>";

	lastRHTML=targetObj.innerHTML;
	
}else if(mode==7){

//alert(spuffer);



//alert($dom.text());



//targetObj.innerHTML = "";

var signs="&#9744;&#9745;&#9746;&#9747;";

var tmpartcno=0;

var stxt="WORK";

//alert("ERROR");

$dom.find('OrderLine').each(function() {

tmpartcno=$(this).find('ManufacturersArticleID').text();

switch($(this).find('Availability').text()){
case '0': stxt="Fehler";
		break; //Fehler
case '1': stxt="Lieferbar zum "+$(this).find('DeliveryDate').text()+" - "+$(this).find('ArticleComment').text();
		break;
case '2': stxt="Lieferbar verzögert zum "+$(this).find('DeliveryDate').text();
		break;
case '3': stxt="Nicht in besagter Menge lieferbar";
		break;
default: stxt="Fehler";
		break;
}

lastRHTML = lastRHTML.replace(tmpartcno+"&nbsp;",tmpartcno+" -- "+stxt);

}); 

targetObj.innerHTML = lastRHTML;

}

}

function ajax_showContent(divId,ajaxIndex,url,mode,callbackOnComplete)
{
	var targetObj = document.getElementById(divId);	
	
	
	spuffer=dynamicContent_ajaxObjects[ajaxIndex].response;

	spuffer=spuffer.replace("\n","");
	spuffer=spuffer.replace("\r","");
	spuffer=spuffer.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>","");
	
	var pPart=spuffer.search("\">");

	spuffer=spuffer.substring(pPart+2);
	
	var $dom=$.xmlDOM(spuffer, function(error) {
    alert('A parse error occurred! ' + error);
}); 
	
		var fcarsCount=getLengthWithoutDuplicates($dom.find('DataLine'));
	
		if(fcarsCount>1){
		
		var shsntsntmp="";
		
		targetObj.innerHTML = "<div id='idcars'>"+fcarsCount+" Autos gefunden, selektiere: <br/>";
		
		$dom.find('DataLine').each(function() {
		if($(this).text().length>0&&sprehsntsn!=$(this).find('HsnTsn').text()){
		sprehsntsn=$(this).find('HsnTsn').text();		
		
		hsntsntmp=sprehsntsn;
		
		//HSNTSN
		if(mode==1){
		targetObj.innerHTML = targetObj.innerHTML+"<a href=\"#\" onclick='retrvHSNData(\""+hsntsntmp+"\")'>"+hsntsntmp+"</a>&nbsp;&nbsp;&nbsp;";
		}else if(mode==5){
		targetObj.innerHTML = targetObj.innerHTML+"<a href=\"#\" onclick='retrvHSNDataF(\""+hsntsntmp+"\")'>"+hsntsntmp+"</a>&nbsp;&nbsp;&nbsp;";
		}
		//Hersteller
		targetObj.innerHTML = targetObj.innerHTML+$(this).find('BrandText').text()+"&nbsp;&nbsp;&nbsp;";
		//Modell
		targetObj.innerHTML = targetObj.innerHTML+$(this).find('ModelText').text()+"&nbsp;&nbsp;&nbsp;";
		//KW/PS
		targetObj.innerHTML = targetObj.innerHTML+$(this).find('Power').text()+" KW ("+runde(($(this).find('Power').text()*1.359622), 0)+"PS)&nbsp;&nbsp;&nbsp;";
		//VMAX
		targetObj.innerHTML = targetObj.innerHTML+$(this).find('Dimensions > TopSpeed').text()+"km/h&nbsp;&nbsp;&nbsp;";
		//Hubraum
		targetObj.innerHTML = targetObj.innerHTML+$(this).find('Displacement').text()+"cm³";
		//END
		targetObj.innerHTML = targetObj.innerHTML+"<br/>";
		
		}
		
		});
		
		
		targetObj.innerHTML = targetObj.innerHTML+"</div>";
		
		}else if(fcarsCount==1){
	
		
	
		//Dataline == Fahrzeug
		$dom.find('DataLine').each(function() {
		if($(this).text().length>0&&sprehsntsn!=$(this).find('HsnTsn').text()){
		
		sprehsntsn=$(this).find('HsnTsn').text();
		
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idcar'>";
		
		targetObj.innerHTML ="<div id='idfgztxt'>Fahrzeugdaten:</div>";
				//Form + Data Output
		
		//HSNTSN
		$(this).find('HsnTsn').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idhsntsn'>HsnTsn: "+$(this).text()+"</div>";
		}
		});
		
		//Hersteller
		$(this).find('BrandText').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idBrandText'>Hersteller: "+$(this).text()+"</div>";
		}
		});
		
		//Modell+Typ+Datum
		
		//targetObj.innerHTML = targetObj.innerHTML+"<div id='idMTD'>";
		
		$(this).find('ModelText').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idMod'>Modell: "+$(this).text()+"</div>";
		}
		});
		
 		$(this).find('TypeText').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idType'>Type: ["+$(this).text()+"]</div>";
		}
		}); 
		
		$(this).find('ModelDate').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idModDate'>Modell-Datum: "+$(this).text()+"</div>";
		}
		});
		
		//END MTD
		
		//Variante
		$(this).find('Variant').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idvar'>Variante: "+$(this).text()+"</div>";
		}
		});
		
		//MotorType
		$(this).find('MotorType').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idmtype'>Motortyp: "+$(this).text()+"</div>";
		}
		});

		//Antriebsachse - DrivingAxle
		$(this).find('DrivingAxle').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idDrivingAxle'>Antriebsachse: "+$(this).text()+"</div>";
		}
		});
		
		//Power - PS/KW
		$(this).find('Power').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idPower'>"+$(this).text()+" KW ("+runde(($(this).text()*1.359622), 0)+"PS)</div>";
		}
		});
		
		//Displacement
		$(this).find('Displacement').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idDisplacement'>Hubraum: "+$(this).text()+"cm³</div>";
		}
		});
		
		//Dimensions
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idDimensions'>B/H/T [mm]: "+$(this).find('Dimensions > Width').text()+"/"+$(this).find('Dimensions > Height').text()+"/"+$(this).find('Dimensions > Length').text()+"</div>";
		//
		
		$(this).find('Dimensions > FrontAxleLoad').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idFrontAxleLoad'>Front-Achsen Last: "+$(this).text()+"kg</div>";
		}
		});
		
		$(this).find('Dimensions > RearAxleLoad').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idRearAxleLoad'>Hinter-Achsen Last: "+$(this).text()+"kg</div>";
		}
		});
		
		$(this).find('Dimensions > TopSpeed').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idTopSpeed'>Max Geschw.: "+$(this).text()+"km/h</div>";
		}
		});
		
		//End Dimensions
		
		
		//Tyres
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idtyres'>Reifen:</div>";
		
		$(this).find('Tyre20').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idtyre20'>Vorne: "+getTiresHTML($(this).text())+"</div>";
		}
		});
	
		$(this).find('Tyre21').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idtyre21'>Mitte/Hinten: "+getTiresHTML($(this).text())+"</div>";
		}
		});
	
		$(this).find('Tyre22').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idtyre22'>Od. Vorne: "+getTiresHTML($(this).text())+"</div>";
		}
		});
	
		$(this).find('Tyre23').each(function() {
		if($(this).text().length>0){
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idtyre23'>Mitte/Hinten: "+getTiresHTML($(this).text())+"</div>";
		}
		});
	
		//COC
		$(this).find('Notes').each(function() {
		if($(this).text().length>0){
		
		var tmpsPuffer=$(this).text();
		
		tmpsPuffer=tmpsPuffer;
		tmpsPuffer=getTiresHTML(tmpsPuffer);
		
		targetObj.innerHTML = targetObj.innerHTML+"<div id='idCOC'>COC: ["+tmpsPuffer+"]</div>";
		}
		});
		
		
		//TODO:
		targetObj.innerHTML = targetObj.innerHTML+"<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>"+"</div><br/>";
		
		//END Fhgz
		}
		});
	
		}else{
		
		targetObj.innerHTML = "<div id='car'>Kein Fahrzeug gefunden.</div><br/>";
		
		}//ENDIF 1or0 found
	
	if(enableCache){
		jsCache[url] = 	dynamicContent_ajaxObjects[ajaxIndex].response;
	}
	dynamicContent_ajaxObjects[ajaxIndex] = false;
	
	ajax_parseJs(targetObj);
	
	
	//targetObj.innerHTML="<textarea style='width:400px; height:800px;'>"+targetObj.innerHTML+"</textarea>";

	
	if(callbackOnComplete) {
		executeCallback(callbackOnComplete);
	}
}

function executeCallback(callbackString) {
	if(callbackString.indexOf('(')==-1) {
		callbackString = callbackString + '()';
	}
	try{
		eval(callbackString);
	}catch(e){

	}
	
	
}

function ajax_loadContent(divId,url,post_data, mode,callbackOnComplete)
{

//alert("load content1");


	
	sprehsntsn="";
	spuffer="";
	
			
	
	var ajaxIndex = dynamicContent_ajaxObjects.length;
	
	try{
	document.getElementById(divId).innerHTML = 'Lade Daten - bitte warten';
	}catch(e){
	alert(e);
	divId=-1;
	}
	
	
	dynamicContent_ajaxObjects[ajaxIndex] = new sack();
	

	
	if(url.indexOf('?')>=0){
		dynamicContent_ajaxObjects[ajaxIndex].method='POST';
		var string = url.substring(url.indexOf('?'));
		url = url.replace(string,'');
		string = string.replace('?','');
		var items = string.split(/&/g);
		for(var no=0;no<items.length;no++){
			var tokens = items[no].split('=');
			if(tokens.length==2){
				dynamicContent_ajaxObjects[ajaxIndex].setVar(tokens[0],tokens[1]);
			}	
		}	
		url = url.replace(string,'');
	}

	
	//alert(url);
	dynamicContent_ajaxObjects[ajaxIndex].requestFile = url;	// Specifying which file to get
	dynamicContent_ajaxObjects[ajaxIndex].post_data=post_data;
	
	//alert(post_data);
	

	
	if(mode==1||mode==5){
	dynamicContent_ajaxObjects[ajaxIndex].onCompletion = function(){ ajax_showContent(divId,ajaxIndex,url,mode,callbackOnComplete); };	// Specify function that will be executed after file has been found
	}else{
	
	dynamicContent_ajaxObjects[ajaxIndex].onCompletion = function(){ ajax_showContentonElement(divId,ajaxIndex,url,mode,callbackOnComplete); };	// Specify function that will be executed after file has been found
	}
	
	dynamicContent_ajaxObjects[ajaxIndex].runAJAX();		// Execute AJAX function

	
	
	return spuffer;	//return stuff
	
	
}

function ajax_parseJs(obj)
{
	var scriptTags = obj.getElementsByTagName('SCRIPT');
	var string = '';
	var jsCode = '';
	for(var no=0;no<scriptTags.length;no++){	
		if(scriptTags[no].src){
	        var head = document.getElementsByTagName("head")[0];
	        var scriptObj = document.createElement("script");
	
	        scriptObj.setAttribute("type", "text/javascript");
	        scriptObj.setAttribute("src", scriptTags[no].src);  	
		}else{
			if(navigator.userAgent.toLowerCase().indexOf('opera')>=0){
				jsCode = jsCode + scriptTags[no].text + '\n';
			}
			else
				jsCode = jsCode + scriptTags[no].innerHTML;	
		}
		
	}

	if(jsCode)ajax_installScript(jsCode);
}


function ajax_installScript(script)
{		
    if (!script)
        return;		
    if (window.execScript){        	
    	window.execScript(script)
    }else if(window.jQuery && jQuery.browser.safari){ // safari detection in jQuery
        window.setTimeout(script,0);
    }else{        	
        window.setTimeout( script, 0 );
    } 
}	
	
	
function evaluateCss(obj)
{
	var cssTags = obj.getElementsByTagName('STYLE');
	var head = document.getElementsByTagName('HEAD')[0];
	for(var no=0;no<cssTags.length;no++){
		head.appendChild(cssTags[no]);
	}	
}

function runde(x, n) {
  if (n < 0 || n > 14) return false;
  var e = Math.pow(10, n);
  var k = (Math.round(x * e) / e).toString();
  if (k.indexOf('.') == -1) k += '.';
  k += e.toString().substring(1);
  if(n>1){
  return k.substring(0, k.indexOf('.') + n+1);
  }else{
  return k.substring(0, k.indexOf('.') + n);
  }
}

function getLengthWithoutDuplicates($dom){

var slpuffer="";

var ilCount=0;

$dom.each(function() {
		if($(this).text().length>0&&slpuffer!=$(this).find('HsnTsn').text()){
		
		slpuffer=$(this).find('HsnTsn').text();

		ilCount++;
		
		}
})

return ilCount;
}