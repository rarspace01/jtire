$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		//$(activeTab).fadeIn(); //Fade in the active ID content
		$(activeTab).show(); //Fade in the active ID content
		return false;
	});

});

function checkHTfilled(){

//alert(document.forms["HSNTSNR"]["HSN"].value);

if(shsnrwasload==false){

if(document.forms["HSNTSNR"]["HSN"].value.length>3&&document.forms["HSNTSNR"]["TSN"].value.length>5){

getHSNSRData();

} 

shsnrwasload=true;

}

}

function loadHSNS(){

if(shsnwasload==false){

//alert("onload!");

var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE KBABrand_A2 SYSTEM \"KBABrand_A2.dtd\"> <KBABrand_A2> <DocumentID>a2-test</DocumentID> <BuyerParty> <PartyID>9000300</PartyID> <AgencyCode>91</AgencyCode> </BuyerParty> </KBABrand_A2>";

ajax_loadContent('idHSNS','https://www.aez-wheels.com',"&xml_data="+xmlData, 2);
}

}

function loadMSNS(){
var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE KBAType_A2 SYSTEM \"KBAType_A2.dtd\"> <KBAType_A2> <DocumentID>a2-test</DocumentID> <BuyerParty> <PartyID>9000300</PartyID> <AgencyCode>91</AgencyCode> </BuyerParty> <BrandCode>"+document.forms["HSNTSNSF"]["idHSNS"].value+"</BrandCode> </KBAType_A2>";
ajax_loadContent('idMSNS','https://www.aez-wheels.com',"&xml_data="+xmlData, 3);
}

function loadMODS(){
var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE KBAModel_A2 SYSTEM \"KBAModel_A2.dtd\"> <KBAModel_A2> <DocumentID>a2-test</DocumentID> <BuyerParty> <PartyID>9000300</PartyID> <AgencyCode>91</AgencyCode> </BuyerParty> <BrandCode>"+document.forms["HSNTSNSF"]["idHSNS"].value+"</BrandCode> <TypeCode>"+document.forms["HSNTSNSF"]["idMSNS"].value+"</TypeCode> </KBAModel_A2>";
ajax_loadContent('idMODS','https://www.aez-wheels.com',"&xml_data="+xmlData, 4);
}

function loadDET(){

var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE KBATyres_A2 SYSTEM \"KBATyres_A2.dtd\"> <KBATyres_A2> <DocumentID>a2-test</DocumentID> <BuyerParty> <PartyID>9000300</PartyID> <AgencyCode>91</AgencyCode> </BuyerParty><BrandCode>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][0]+"</BrandCode> <TypeCode>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][1]+"</TypeCode> <ModelCode>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][2]+"</ModelCode> <ModelDate>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][3]+"</ModelDate> <Variant>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][4]+"</Variant> <MotorType>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][5]+"</MotorType> <DrivingAxle>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][6]+"</DrivingAxle> <Power>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][7]+"</Power> <Displacement>"+aListModelInfosX[document.forms["HSNTSNSF"]["idMODS"].value][8]+"</Displacement> </KBATyres_A2>";
ajax_loadContent('idFContent','https://www.aez-wheels.com',"&xml_data="+xmlData, 5);
}

function getHSNData(){

if(document.forms["HSNTSNF"]["TSN"].value.length>7){
document.forms["HSNTSNF"]["TSN"].value=document.forms["HSNTSNF"]["TSN"].value.substring(0,8);
}else{
document.forms["HSNTSNF"]["TSN"].value=document.forms["HSNTSNF"]["TSN"].value.substring(0,6);
}

retrvHSNData(document.forms["HSNTSNF"]["HSN"].value+"-"+document.forms["HSNTSNF"]["TSN"].value);
return false;
}

function getHSNSRData(){

if(document.forms["HSNTSNR"]["TSN"].value.length>7){
document.forms["HSNTSNR"]["TSN"].value=document.forms["HSNTSNF"]["TSN"].value.substring(0,8);
}else{
document.forms["HSNTSNR"]["TSN"].value=document.forms["HSNTSNF"]["TSN"].value.substring(0,6);
}

retrvHSNSRData(document.forms["HSNTSNR"]["HSN"].value+"-"+document.forms["HSNTSNR"]["TSN"].value);
return false;
}

function getHSNSARData(){

if(document.forms["HSNTSNR"]["TSN"].value.length>7){
document.forms["HSNTSNR"]["TSN"].value=document.forms["HSNTSNF"]["TSN"].value.substring(0,8);
}else{
document.forms["HSNTSNR"]["TSN"].value=document.forms["HSNTSNF"]["TSN"].value.substring(0,6);
}

retrvHSNSARData(document.forms["HSNTSNR"]["HSN"].value+"-"+document.forms["HSNTSNR"]["TSN"].value);
return false;
}

function retrvHSNData(sHsnTsn){
var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE KBAHsnTsn_A2 SYSTEM \"KBAHsnTsn_A2.dtd\"> <KBAHsnTsn_A2> <DocumentID>a2-test</DocumentID> <BuyerParty> <PartyID>9000300</PartyID> <AgencyCode>91</AgencyCode> </BuyerParty><HsnTsn>"+sHsnTsn+"</HsnTsn> </KBAHsnTsn_A2>";
ajax_loadContent('idContent','https://www.aez-wheels.com',"&xml_data="+xmlData, 1);
}

function retrvHSNDataF(sHsnTsn){
var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE KBAHsnTsn_A2 SYSTEM \"KBAHsnTsn_A2.dtd\"> <KBAHsnTsn_A2> <DocumentID>a2-test</DocumentID> <BuyerParty> <PartyID>9000300</PartyID> <AgencyCode>91</AgencyCode> </BuyerParty><HsnTsn>"+sHsnTsn+"</HsnTsn> </KBAHsnTsn_A2>";
ajax_loadContent('idFContent','https://www.aez-wheels.com',"&xml_data="+xmlData, 1);
}

function retrvHSNSRData(sHsnTsn){
var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE SteelPlusHsnTsn_A2 SYSTEM \"SteelPlusHsnTsn_A2.dtd\"><SteelPlusHsnTsn_A2><DocumentID>a2-test</DocumentID><BuyerParty><PartyID>9000300</PartyID><AgencyCode>91</AgencyCode></BuyerParty><HsnTsn>"+sHsnTsn+"</HsnTsn></SteelPlusHsnTsn_A2>";
ajax_loadContent('idSRContent','https://www.aez-wheels.com',"&xml_data="+xmlData, 6);
}

function retrvHSNSARData(sHsnTsn){
var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?> <\!DOCTYPE AlloyPlusHsnTsn_A2 SYSTEM \"AlloyPlusHsnTsn_A2.dtd\"><AlloyPlusHsnTsn_A2><DocumentID>a2-test</DocumentID><BuyerParty><PartyID>9000300</PartyID><AgencyCode>91</AgencyCode></BuyerParty><HsnTsn>"+sHsnTsn+"</HsnTsn></<AlloyPlusHsnTsn_A2>";
ajax_loadContent('idSARContent','https://www.aez-wheels.com',"&xml_data="+xmlData, 6);
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function chkAvail(){

var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?><\!DOCTYPE inquiry_A2 SYSTEM \"inquiry_A2.dtd\"><inquiry_A2><DocumentID>a2-test</DocumentID><BuyerParty><PartyID>QA9999999</PartyID><AgencyCode>91</AgencyCode></BuyerParty>";
var iQ=4;

for(var jj=0;jj<aListAvailCHK.length;jj++){

dAID=aListAvailCHK[jj];

xmlData=xmlData+="<OrderLine><LineID>"+(jj+1)+"0</LineID><OrderedArticle><ArticleIdentification><ManufacturersArticleID>"+dAID+"</ManufacturersArticleID></ArticleIdentification><RequestedQuantity><QuantityValue>"+iQ+"</QuantityValue></RequestedQuantity></OrderedArticle></OrderLine>";

}

xmlData=xmlData+="</inquiry_A2>";

//var xmlData="<?xml version=\"1.0\" encoding=\"UTF-8\"?><\!DOCTYPE inquiry_A2 SYSTEM \"inquiry_A2.dtd\"><inquiry_A2><DocumentID>a2-test</DocumentID><BuyerParty><PartyID>QA9999999</PartyID><AgencyCode>91</AgencyCode></BuyerParty>
//</inquiry_A2>";

//alert("START");

//alert(xmlData);

ajax_loadContent('idSRContent','https://www.aez-wheels.com',"&xml_data="+xmlData, 7);
//alert("FIN");

return false;
}
