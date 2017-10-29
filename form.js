/**
* Easy Code Framework
* 
* @author  Emin Azeroglu
* @var     @facebook https://www.facebook.com/emin.azeroglu10
* @var     @instagram https://www.instagram.com/azeroglu.emin/
* @var     @web http://codelab.az 
* 
*/
$(function(){

$("body input").attr("autocomplete","off");

$("body a").on("click",function(){
	if($(this).data("load") != false){
		$("body").append('<div id="loadingIcon"><div class="icon-div"><i class="icon-spin2 animation"></i></div></div>');
	}
});
$("body a[rel=parent]").on("click",function(){
	$(this).attr("target","_blank");
});

/* Login Form */
$("body").on("submit",".loginFormData",function(e){

	var object 		=	$(this),
		buttonText	=	object.find("button").data("text"),
		loading 	=	"<i class='icon-spin1 animation'></i>",
		post 		=	object.data("action"),
		notJson		=	object.data("alert"),
		data 		=	new FormData(object[0]),
		time 		=	3000;

	object.find("button").html(loading);
	object.find(".alert-text").hide().html('');

	if(notJson == "yes"){
		$.ajax({
			url: post,
	    	type: "POST",
	    	data: data,
	    	contentType: false,
	    	processData: false,
	    	success: function(reply){ 
	    		alert(reply);
	    	}
		});
	}
	else{
		$.ajax({
			url: post,
	    	type: "POST",
	    	data: data,
	    	dataType: "json",
	    	contentType: false,
	    	processData: false,
	    	success: function(reply){
	    		
	    		/* Error Email */
	    		if(reply.email){
	    			object.find("button").html(buttonText);
	    			var resort = object.find("#post-email .alert-text").show().html('<i class="icon icon-info-circled"></i> '+reply.email);
	    		}
	    		/* Error Name */
	    		if(reply.name){
	    			object.find("button").html(buttonText);
	    			var resort = object.find("#post-name .alert-text").show().html('<i class="icon icon-info-circled"></i> '+reply.name);
	    		}
	    		/* Error Surname */
	    		if(reply.surname){
	    			object.find("button").html(buttonText);
	    			var resort = object.find("#post-surname .alert-text").show().html('<i class="icon icon-info-circled"></i> '+reply.surname);
	    		}
	    		/* Error Password */
	    		else if(reply.password){
	    			object.find("button").html(buttonText);
	    			var resort = object.find("#post-pass .alert-text").show().html('<i class="icon icon-info-circled"></i> '+reply.password);
	    		}
	    		/* Error Repeat Password */
	    		else if(reply.rpassword){
	    			object.find("button").html(buttonText);
	    			var resort = object.find("#post-rpass .alert-text").show().html('<i class="icon icon-info-circled"></i> '+reply.rpassword);
	    		}
	    		/* Success */
	    		else{
	    			if(reply.url){
	    				window.location.href = reply.url;
	    			}
	    			if(reply.success){
	    				object.find("button").html(buttonText);
	    				object.find("button").remove();
	    				var resort = object.find("#post-success .alert-text").addClass("success-alert").show().html('<i class="icon icon-info-circled"></i> '+reply.success);
	    			}
	    			else{
	    				resort.delay(time).fadeOut(200);
	    			}
	    		}

	    		
	    	}
		});
	}
	

	e.preventDefault();

});

/* Default Form Post */
$("body").on("submit",".formData",function(e){

	var object 		=	$(this),
		buttonText	=	object.find("button").data("text"),
		loading 	=	"<i class='icon-spin1 animation'></i>",
		post 		=	object.data("action"),
		notJson		=	object.data("alert"),
		data 		=	new FormData(object[0]),
		replace		=	object.data("replace"),
		time 		=	object.data("time"),
		time 		=	time ? time : null;

	object.find("button").html(loading);
	object.find(".alert-text").hide().html('');

	if(notJson == "yes"){
		$.ajax({
			url: post,
	    	type: "POST",
	    	data: data,
	    	contentType: false,
	    	processData: false,
	    	success: function(reply){ 
	    		alert(reply);
	    	}
		});
	}
	else{
		$.ajax({
			url: post,
	    	type: "POST",
	    	data: data,
	    	dataType: "json",
	    	contentType: false,
	    	processData: false,
	    	success: function(reply){
	    		
	    		/* Error Email */
	    		if(reply.error){
	    			time 	=	time ? time : 2000;
	    			object.find("button").html(buttonText);
	    			var resort = object.find("#post-alert").show().html('<i class="icon icon-info-circled"></i> '+reply.error);
	    			resort.delay(time).fadeOut(200);
	    		}
	    		/* Success */
	    		else if(reply.ok){
	    			
    				object.find("button").html(buttonText);
    				object.find("button").remove();
    				var resort = object.find("#post-alert").addClass("success-alert").show().html('<i class="icon icon-info-circled"></i> '+reply.ok);
	    			
    				if(replace == "yes"){
    					if(reply.url){
	    					if(time != null){
	    						setTimeout(function(){ window.location.href = reply.url },time);
		    				}
		    				else{
		    					window.location.href = reply.url;
		    				}
		    			}
		    			else{
		    				if(time != null){
		    					setTimeout(function(){ window.location.replace(window.location.href) },time);
		    				}
		    				else{
		    					window.location.replace(window.location.href);
		    				}
		    			}
	    			}
	    		}
	    		else{
	    			object.find("button").html(buttonText);
	    			object.find(".alert-text").hide().html('');
	    		}

	    	}
		});
	}
	

	e.preventDefault();

})

/* Change Input Value Type */
$("body").on("keydown","span[contenteditable]",function(e){

	var object 		=	$(this),
		text 		=	object.text(),
		type 		=	object.data("type"),
		maxlength	=	object.attr("maxlength"),
		maxlength 	=	maxlength ? maxlength : 0;

	if(type == "int"){
		// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	}
	else if(type == "string"){
		var inputValue = event.which;
        // allow letters and whitespaces only.
        if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) { 
            event.preventDefault(); 
        }
	}

	if(text.length >= maxlength){
		e.preventDefault();
	}

});

$("body").on("keydown",".inputControl",function(e){
	var object 		=	$(this),
		text 		=	object.val(),
		type 		=	object.data("type"),
		maxlength	=	object.attr("maxlength"),
		maxlength 	=	maxlength ? maxlength : 0;
	if(type == "int"){
		// Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
	}
	else if(type == "string"){
		var inputValue = event.which;
        // allow letters and whitespaces only.
        if(!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) { 
            event.preventDefault(); 
        }
	}

	if(text.length >= maxlength){
		e.preventDefault();
	}
});

/* Order Change Function */
$.changeOrder 	=	function(object,id,url)
{
	var text 	=	object.text(),
		data 	=	{"id":id,"orderId":text}
	$.post(url,data);
}









})