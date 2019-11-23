// JavaScript Document

$(document).ready(function(){
	//Examples of how to assign the ColorBox event to element	
	//
	//Example of preserving a JavaScript event for inline calls.	
	$("#click").click(function(){ 
	
	$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
	
	return false;
	
	});
	
	$('#uemail').bind('keypress', function(e) {
		if(e.keyCode == 13){
			doLogin();
		}
	});
	$('#upassword').bind('keypress', function(e) {
		if(e.keyCode == 13){
			doLogin();
		}
	});
	
}); // Ready Fun()
// Video Sliders:
 $(function() {
	 	$('#suggested_channels_container > .featured > .videos-line > .video-thumbs').each(function(index, element) {
        var id = $(this).attr('channel_id');
		$("#channel_"+id).carouFredSel({
                circular: false,
                infinite: false,
                auto 	: false,
				items   : {
					visible	: 5
				},
                prev	: {	
                    button	: "#prev"+id
                },
                next	: { 
                    button	: "#next"+id
                },
				scroll		: {
					onAfter : function( data ) { 
						$(this).trigger("currentPosition", function( pos ) {
							var start_from = (pos+1);
							var total = $("> *", this).length;
							var end_at = start_from+5;
							var txt = '';
							if(end_at>total){
								txt = start_from+' - '+total+' of '+total;
							}else{
								txt = start_from+' - '+(end_at-1)+' of '+total;
							}							
							$("#channel_showing_"+id).html(txt);
						});
						/*setTimeout(function() { 
							$("#foo2").animate({ opacity: 0.5 }, 500);
							$("#foo2_play").show();
							data.items.visible.find("div").slideUp();
						}, 5000);
			
						data.items.old.find("div").hide();
						data.items.visible.find("div").slideDown();*/
					}
				}
        });
    });
	
 });
function add_to_favorite_channel(channel_id){
	$("#channel_fav_"+channel_id).hide();
	$.ajax({
			data : 'channel_id='+channel_id,
			url  : HTTP_SITE+'home/add_to_favorite_channel',
			type : "POST",
			success : function(data){
				if(data=='0'){
					$("#channel_fav_"+channel_id).attr('src',HTTP_IMAGES+'favorite.png');
					//$("#channel_fav_"+channel_id).attr('onclick','');
					$("#channel_fav_"+channel_id).attr('onmouseover','hover_images("favorite.png","favorite-hover.png","1","channel_fav_'+channel_id+'")');
					$("#channel_fav_"+channel_id).attr('onmouseout','hover_images("favorite.png","favorite-hover.png","0","channel_fav_'+channel_id+'")');
					$("#channel_fav_"+channel_id).attr('title','Add to Favorite');
					$("#channel_fav_"+channel_id).attr('alt','Add to Favorite');
					$("#channel_fav_"+channel_id).fadeIn();
					$("#my_channel_list_"+channel_id).remove();
				}else if(parseInt(data)>0){
					$("#channel_fav_"+channel_id).attr('src',HTTP_IMAGES+'un-favorite.png');
					//$("#channel_fav_"+channel_id).attr('onclick','');
					$("#channel_fav_"+channel_id).attr('onmouseover','hover_images("un-favorite.png","un-favorite-hover.png","1","channel_fav_'+channel_id+'")');
					$("#channel_fav_"+channel_id).attr('onmouseout','hover_images("un-favorite.png","un-favorite-hover.png","0","channel_fav_'+channel_id+'")');
					$("#channel_fav_"+channel_id).attr('title','Remove from Favorite');
					$("#channel_fav_"+channel_id).attr('alt','Remove from Favorite');
					$("#channel_fav_"+channel_id).fadeIn();
				}
				else{
					alert(data);
				}
				
			}
	});
}
			
function doLogin()
{
	var email = $("#uemail").val();
	var pwd = $("#upassword").val();
	var em_pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
	$(".login_alert").hide();
	$("#form_signin > .form-field").css('border-color','#C7C7C7');
	if(!em_pattern.test(email))
	{
		$("#login_email_error").show();
		$("#uemail").css('border-color','#F83914');
		$("#uemail").focus();
		return false;
	}

	if(pwd=='')
	{
		$("#login_pwd_error").show();
		$("#upassword").css('border-color','#F83914');
		$("#upassword").focus();
		return false;
	}
	
	$('#login_msg').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;">');
	$("#login_msg").fadeIn();
	var form_data = $("#form_signin").serialize();
	$.getJSON(HTTPS_SITE+'ajaxuserapi/authenticateUser/?callback=?',form_data,function(res){
    if(res.message=='1')
	{
		//$('#login_msg').css('color','#009900');
		//$('#login_msg').html('Loged In Succesfully! Please wait...');
		//$("#login_msg").fadeIn();
		$.ajax({
				data : 'id='+res.user_id+'&email='+res.user_email,
				url  : HTTP_SITE+'home/createLoginUserSession',
				type : "POST",
				success : function(){
					location.reload(true);	
				}
		});
		
	}
	else if(res.message=='0')
	{
		$('#login_msg').css('color','#F83914');
		$('#login_msg').html('Invalid E-mail or password');
		$("#login_msg").fadeIn();
	}
	else
	{
		
	}
});


}
function validate()
{
	var email = $("#forgotemail").val();
	var em_pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
	if(!em_pattern.test(email))
	{
		alert('Please provide a valid email address');
		return false;
	}else{
	$.ajax({
				data : 'email='+email,
				url  : HTTP_SITE+'forgot-password',
				type : "POST",
				success : function(response){
					data = JSON.parse(response);
					if(data.is_sent=='SENT'){
					alert('forgot password email has been sent to your email');
					$('#forgot_msg').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;">');
					$("#forgot_msg").fadeIn();
					$("#forgot_msg").html('forgot password email has been sent to your email');
					}
					else if(data.is_sent=='BADEMAIL'){
					alert('Your email account doesnot exist');
					$('#forgot_msg').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;">');
					$("#forgot_msg").fadeIn();
					$("#forgot_msg").html('Your email account doesnot exist');
					}
					else if(data.is_sent=='LESSTHAN10'){
					alert('Please try again after 10 minutes');
					$('#forgot_msg').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;">');
					$("#forgot_msg").fadeIn();
					$("#forgot_msg").html('Please try again after 10 minutes');
					}
					else{
					alert('Email sent failed');
					$('#forgot_msg').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;">');
					$("#forgot_msg").fadeIn();
					$("#forgot_msg").html('Email sent failed');
					}
						
				}
		});
	}
	return false; 
}
function reset_password()
{
	var pwd = $(".reset-form-fields #pwd").val();
	
	var cpwd = $(".reset-form-fields #cpwd").val();
	$(".reset-form-fields .alert").hide();
	$(".field > span").removeClass('alert_formfield');
	var flag = true;
	if(pwd==''){
		$(".reset-form-fields #pwd_error").html('Please type your <span>New Password</span>');
		$(".reset-form-fields #pwd_error").show();
		$(".reset-form-fields #pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reset-form-fields #cur_pwd").focus();
		flag = false;
	}
	if(cpwd!=pwd){
		$(".reset-form-fields #cpwd_error").html('You password <span>don\'t match</span>');
		$(".reset-form-fields #cpwd_error").show();
		$(".reset-form-fields #cpwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reset-form-fields #cur_pwd").focus();
		flag = false;
	}
	if(!flag)
		return flag;
	$('.reset-form-fields .save-text').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25">');
	var form_data = $("#reset_password").serialize();
	$.getJSON(HTTPS_SITE+'ajaxuserapi/resetpassword/?callback=?',form_data,function(res){
		$('#reset_message').show();
		$('.reset-form-fields .save-text').hide();
    if(res.message=='1'){
		$("#reset_message").html('<div class="notify">Your password has been updated successfully.</div>');
	}
	else
	{
		if(res.invalid_user=='1' || res.invalid_request)
			$("#reset_message").html('<div class="notify">This password reset link has already been used and is no longer valid. If you need to reset again click <a href="'+HTTP_SITE+'forgot-password">here</a>.</div>');	
		else if(res.invalid_password)
			$("#reset_message").html('<div class="notify">Invalid password. Please check your passwords.</div>');	
		else
		$("#reset_message").html('<div class="notify">Something wrong! Could not update your password.</div>');
		//alert('');
	}
});
}
$(document).ready(function(){
	
	// This hides the menu when the page is clicked anywhere other than the menu.
		$(document).bind('click', function(e) {
			var $clicked = $(e.target);
		    if (! $clicked.parents().hasClass("menu")){
		        $(".menu dd ul").hide();
				$(".menu dt a").removeClass("selected");
			}

		});
		
		$(".menu dt a").click(function() {

			var clickedId = "#" + this.id.replace(/^link/,"ul");

		        // Hides everything else that the current menu 
			$(".menu dd ul").not(clickedId).hide();

		        //Toggles the menu.
			$(clickedId).toggle();

		        //Add the selected class.
			if($(clickedId).css("display") == "none"){
				$(this).removeClass("selected");
			}else{
				$(this).addClass("selected");
			}

		});
		
// This function shows which menu item was selected in corresponding result place
		/*$(".menu dd ul li a").click(function() {
			var text = $(this).html();
			$(this).closest('dl').find('.result').html(text);
		    $(".menu dd ul").hide();
		});*/

		
	});
function hover_images(orig_image,hov_image,in_out,id){
	if(in_out=='1'){
		$("#"+id).attr('src',HTTP_IMAGES+''+hov_image);
	}else{
		$("#"+id).attr('src',HTTP_IMAGES+''+orig_image);
	}
}
function hover_images_social(orig_image,hov_image,in_out,id){
	if(in_out=='1'){
		$("#"+id).attr('src',HTTP_IMAGES+'social/'+hov_image);
	}else{
		$("#"+id).attr('src',HTTP_IMAGES+'social/'+orig_image);
	}
}