jQuery(function($) { getS3Data(); });

var res;
function getS3Data(marker, html) {

 // var abcd = document.location.href;
//	var n = abcd.length;
//var m = n-90;
//var pu = abcd.split("&");
//res = abcd.substring(90, pu[0].length);
//renderRow();

var url_string = window.location.href;
var url = new URL(url_string);
var itemkeyText = url.searchParams.get("a");
var res = url.searchParams.get("b");


//console.log(c);

//itemkeyText=window.location.search.substr(1);
//res=window.location.search.substr(2);


//alert('itemkeyText is ==> '+itemkeyText);

//alert('res is ==> '+res);

	var urlmagic='https://dnmsgsmjn6.execute-api.eu-west-1.amazonaws.com/lst-nonprod-ma/{proxy+}?name='+ itemkeyText.replace(";1", "%3B1"); // API Gateway as Lambda proxy 

//alert('urlmagic is ==> '+urlmagic);
  // set loading notice
  $('#listing')
      .html('<img src="https://s3.amazonaws.com/ellucian-mc-prod-qe/quercus-file-ftp/ellucian.jpg" /> <p><b>Note:</b> Your file is now downloading, please check your download folder. You can close this page when your download is complete.</p>');

$.ajax({
  type: 'POST',
  url: urlmagic,

  async:false,

	   headers: {
       Authorization: res
   },

  success: function(result) {
	url = result.oneTimeUploadUrl;
	window.location.href = url;

	

}

});

}