
function getQueryString()
{
	var vars = [], hash;
    var q = document.URL.split('?')[1];
    if(q != undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            hash = q[i].split('=');
            vars.push(hash[1]);
            vars[hash[0]] = hash[1];
        }
    }
    return vars;
}

$( document ).ready(function() {
	var qs = getQueryString();
	var toName = (qs["to"] === undefined) ? "" : "&to=" + qs["to"];
	var fromName = (qs["from"] === undefined) ? "" : "&from=" + qs["from"];
	var	seed = qs["seed"];
	
	window.addEventListener('mousedown',function(e){
	  if(e.button==0) document.location = "?seed=" + toName + fromName;
	},false);

	window.addEventListener('touchstart',function(e){
	  document.location = "?seed=" + toName + fromName;
	},false);

	$.getJSON( "randomLetter?seed=" + seed + toName + fromName, function( data ) {
		$('.letter').append("<a id='forEndWidth' style='visibility=hidden; float: right;'></a>");
		$('#forEndWidth').html(data.ending);
		var endWidth = $('#forEndWidth').width();
		$('#forEndWidth').remove();

		var content = data.greeting + "<br>";

		$.each( data.body, function(index, value) {
	  		content +=  value  + "<br>";
		});

		content += "<div style='padding-left: " + ($('.letter').width() - 60 - endWidth) + "px'>" + data.ending; + "</div>";

		$(".letter").t(content, {caret:false, speed:20});

	});

});