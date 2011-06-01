﻿/*!
 * Tire JS Library v0.1
 * 
 * Author: Denis Hamann
 * Based on 'Johannes Schlick's code
 * optimised for car tire detection
 * Licensed under the GPL Version 2 license
 * 
 */
 
 
 
 function getTires(sTire){
  sPuffer=sTire;
  
  sfSpace=" ";
  
  if(sPuffer.length<5){ //Everythign under 5 chars is worthless
  sPuffer="";  
  }else{

	var strReg = /(P|LT|T)?(\d{2}x)?([1-9][1234567890\.,]{1,4}\s?)[\/|\s]?([1234567890\.,]{2,5})?\s*([BDFHRVZ-]{1,2}(?=[1-9]))\s*([1-9][1234567890\.,]{1,4})\s*(LT|CP|C?)\s*(\d{1,2}\s?PR)?\s*(M\/C)?\s*(XL|EL|Reinf|rf\.|RF)?\s*((\()?(\d{2,3})?\/?(\d{2,3})\s*(A[0-8]?|[BCDEFGJKLMNPQRSTUHVWY])(\))?)?/gi;

	var patt1=new RegExp(strReg);
	sPuffer=sPuffer.match(patt1);
  
  } 

 return sPuffer
 } 
 
  function getTiresHTML(sTire){
  sPuffer=sTire;
  srPuffer=sTire;
  
  sfSpace=" ";
  
  if(sPuffer.length<5){ //Everythign under 5 chars is worthless
  sPuffer="";  
  }else{

	var strReg = /(P|LT|T)?(\d{2}x)?([1-9][1234567890\.,]{1,4}\s?)[\/|\s]?([1234567890\.,]{2,5})?\s*([BDFHRVZ-]{1,2}(?=[1-9]))\s*([1-9][1234567890\.,]{1,4})\s*(LT|CP|C?)\s*(\d{1,2}\s?PR)?\s*(M\/C)?\s*(XL|EL|Reinf|rf\.|RF)?\s*((\()?(\d{2,3})?\/?(\d{2,3})\s*(A[0-8]?|[BCDEFGJKLMNPQRSTUHVWY])(\))?)?/gi;

	var patt1=new RegExp(strReg);
	
	try{
	
	for(var i=0;i<sPuffer.match(patt1).length;i++)
	{
	//alert(i);
	srPuffer=srPuffer.replace(new RegExp(sPuffer.match(patt1)[i],"gi"),"<a href='#'>"+sPuffer.match(patt1)[i]+"</a>");
	}
	
	}catch(e){
	srPuffer=sTire;
	}

  } 

 return srPuffer
 }