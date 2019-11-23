//update profile
function save_profile_data() {
	var id = $(".edit-profile-form #id").val();
	var is_pass = $(".edit-profile-form #is_pass").val();
	var firstname = $(".edit-profile-form #firstname").val();
	var lastname = $(".edit-profile-form #lastname").val();
	var email = $(".edit-profile-form #email").val();
	var pwd = $(".edit-profile-form #pwd").val();
	var cpwd = $(".edit-profile-form #cpwd").val();
	var em_pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
	$(".edit-profile-form .alert").hide();
	$(".form-line > div").removeClass('alert_formfield');
	//
	var flag = true;
	if(firstname=='')
	{
		$(".edit-profile-form #fname_error").show();
		$(".edit-profile-form #fname_error_cont").addClass('alert_formfield');
		$(".edit-profile-form #firstname").focus();
		flag = false;
	}
	if(lastname=='')
	{
		$(".edit-profile-form #lname_error").show();
		$(".edit-profile-form #lname_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #lastname").focus();
		flag = false;
	}
	if(!em_pattern.test(email))
	{
		$(".edit-profile-form #email_error").html('Please Provide a valid <span>Email Address</span>');
		$(".edit-profile-form #email_error").show();
		$(".edit-profile-form #email_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #email").focus();
		flag = false;
	}
	if(is_pass=='1' && pwd!='' && $(".edit-profile-form #cur_pwd").val()=='')
	{
		$(".edit-profile-form #cur_pwd_error").html('Please type your <span>Current Password</span>');
		$(".edit-profile-form #cur_pwd_error").show();
		$(".edit-profile-form #cur_pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #cur_pwd").focus();
		flag = false;
	}
	if(is_pass=='1' && $(".edit-profile-form #cur_pwd").val()!='' && pwd=='')
	{
		$(".edit-profile-form #pwd_error").show();
		$(".edit-profile-form #pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #pwd").focus();
		flag = false;
	}
	if(is_pass=='0' && pwd=='')
	{
		$(".edit-profile-form #pwd_error").show();
		$(".edit-profile-form #pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #pwd").focus();
		flag = false;
	}
	if(is_pass=='0' && cpwd=='')
	{
		$(".edit-profile-form #cpwd_error").html('Please re-type your <span>Password</span>');
		$(".edit-profile-form #cpwd_error").show();
		$(".edit-profile-form #cpwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #cpwd").focus();
		flag = false;

	}
	if(pwd!=cpwd)
	{
		$(".edit-profile-form #cpwd_error").html('Your passwords <span>don\'t match</span>');
		$(".edit-profile-form #cpwd_error").show();
		$(".edit-profile-form #cpwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".edit-profile-form #pwd").focus();
		flag = false;
	}
	if(!flag)
	{
		return false;
	}
	$('.edit-profile-form .save-text').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25">');
	$(".edit-profile-form .save-text").fadeIn();
	$(".edit-profile-form #register_btn").hide();
	var form_data = $("#form_update_profile").serialize();
	$.getJSON(HTTP_SITE+'ajaxuserapi/updateprofile/?callback=?',form_data,function(res){

    if(res.message=='1')
	{
		if(res.new_user=='0')
		{
			updateNewsLetter();
			$('.edit-profile-form .save-text').html('Saved Succesfully!');
			$(".edit-profile-form .save-text").fadeIn();
			$.ajax({
					data : 'session=1',
					url  : HTTP_SITE+'home/updateMySession',
					type : "POST",
					success : function(){

					}
			});
		}
		else if(res.new_user=='1')
		{
			/***********************************************************************************/
			//updateNewsLetter();
			/***********************************************************************************/

			//$('.save-text').css('margin-left','202px');
			$('.edit-profile-form .save-text').html('Registration complete... please wait...');
			$(".edit-profile-form .save-text").fadeIn();
			$.ajax({
					data : 'id='+res.user_id+'&email='+res.user_email,
					url  : HTTP_SITE+'home/createLoginUserSession',
					type : "POST",
					success : function(){
						$("#form_update_content > #id").val(res.user_id);
						$("#newsletter-popup").modal();
						//location.href = HTTP_SITE+'register-step2';
					}
			});
		}
	}
	else if(res.email_error=='1')
	{
		$(".edit-profile-form .save-text").fadeOut();
		$(".edit-profile-form #email_error").html('E-mail already registered.');
		$(".edit-profile-form #email_error").show();
		$(".edit-profile-form #email_error_cont").addClass('alert_formfield');
		$(".edit-profile-form #register_btn").show();
	}
	else if(res.password_error=='1')
	{
		$(".edit-profile-form .save-text").fadeOut();
		$(".edit-profile-form #cur_pwd_error").html('Invalid <span>Current Password</span>.');
		$(".edit-profile-form #cur_pwd_error").show();
		$(".edit-profile-form #cur_pwd_error_cont").addClass('alert_formfield');
		$(".edit-profile-form #register_btn").show();
	}else if(res.error_text!=''){
		$(".edit-profile-form .save-text").fadeOut();
		$(".edit-profile-form #register_btn").show();
		alert(res.error_text);
	}else{
		$(".edit-profile-form .save-text").fadeOut();
		$(".edit-profile-form #register_btn").show();
		alert('Something wrong! Could not save your changes');
	}
});
	/*
	alert(form_data);
  */
}
function register_user() {
	var id = $(".reg-form-fields #id").val();
	var is_pass = $(".reg-form-fields #is_pass").val();
	var firstname = $(".reg-form-fields #firstname").val();
	var lastname = $(".reg-form-fields #lastname").val();
	var email = $(".reg-form-fields #email_reg").val();
	var pwd = $(".reg-form-fields #pwd").val();
	var cpwd = $(".reg-form-fields #cpwd").val();
	var em_pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
	$(".reg-form-fields .alert").hide();
	$(".form-line > div").removeClass('alert_formfield');
	//
	var flag = true;
	if(firstname=='')
	{
		$(".reg-form-fields #fname_error").show();
		$(".reg-form-fields #fname_error_cont").addClass('alert_formfield');
		$(".reg-form-fields #firstname").focus();
		flag = false;
	}
	if(lastname=='')
	{
		$(".reg-form-fields #lname_error").show();
		$(".reg-form-fields #lname_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #lastname").focus();
		flag = false;
	}
	if(!em_pattern.test(email))
	{
		$(".reg-form-fields #email_error").html('Please Provide a valid <span>Email Address</span>');
		$(".reg-form-fields #email_error").show();
		$(".reg-form-fields #email_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #email").focus();
		flag = false;
	}
	if(is_pass=='1' && pwd!='' && $(".reg-form-fields #cur_pwd").val()=='')
	{
		$(".reg-form-fields #cur_pwd_error").html('Please type your <span>Current Password</span>');
		$(".reg-form-fields #cur_pwd_error").show();
		$(".reg-form-fields #cur_pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #cur_pwd").focus();
		flag = false;
	}
	if(is_pass=='1' && $(".reg-form-fields #cur_pwd").val()!='' && pwd=='')
	{
		$(".reg-form-fields #pwd_error").show();
		$(".reg-form-fields #pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #pwd").focus();
		flag = false;
	}
	if(is_pass=='0' && pwd=='')
	{
		$(".reg-form-fields #pwd_error").show();
		$(".reg-form-fields #pwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #pwd").focus();
		flag = false;
	}
	if(is_pass=='0' && cpwd=='')
	{
		$(".reg-form-fields #cpwd_error").html('Please re-type your <span>Password</span>');
		$(".reg-form-fields #cpwd_error").show();
		$(".reg-form-fields #cpwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #cpwd").focus();
		flag = false;

	}
	if(pwd!=cpwd)
	{
		$(".reg-form-fields #cpwd_error").html('Your passwords <span>don\'t match</span>');
		$(".reg-form-fields #cpwd_error").show();
		$(".reg-form-fields #cpwd_error_cont").addClass('alert_formfield');
		if(flag)
			$(".reg-form-fields #pwd").focus();
		flag = false;
	}
	if(!flag)
	{
		return false;
	}
	$('.save-text').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25">');
	$(".save-text").fadeIn();
	$(".reg-form-fields #register_btn").hide();
	var form_data = $("#form_update_profile").serialize();
	$.getJSON(HTTP_SITE+'ajaxuserapi/updateprofile/?callback=?',form_data,function(res){

    if(res.message=='1')
	{
		if(res.new_user=='0')
		{
			//updateNewsLetter();
			$('.save-text').html('Saved Succesfully!');
			$(".save-text").fadeIn();
			$.ajax({
					data : 'session=1',
					url  : HTTP_SITE+'home/updateMySession',
					type : "POST",
					success : function(){

					}
			});
		}
		else if(res.new_user=='1')
		{
			/***********************************************************************************/
			updateNewsLetter();
			/***********************************************************************************/

			//$('.save-text').css('margin-left','202px');
			$('.save-text').html('Registration complete... please wait...');
			$(".save-text").fadeIn();
			$.ajax({
					data : 'id='+res.user_id+'&email='+res.user_email,
					url  : HTTP_SITE+'home/createLoginUserSession',
					type : "POST",
					success : function(){
						$("#form_update_content > #id").val(res.user_id);
						$("#newsletter-popup").modal();
						//location.href = HTTP_SITE+'register-step2';
					}
			});
		}
	}
	else if(res.email_error=='1')
	{
		$(".save-text").fadeOut();
		$("#email_error").html('E-mail already registered.');
		$("#email_error").show();
		$("#email_error_cont").addClass('alert_formfield');
		$("#register_btn").show();
	}
	else if(res.password_error=='1')
	{
		$(".save-text").fadeOut();
		$("#cur_pwd_error").html('Invalid <span>Current Password</span>.');
		$("#cur_pwd_error").show();
		$("#cur_pwd_error_cont").addClass('alert_formfield');
		$("#register_btn").show();
	}else if(res.error_text!=''){
		$(".save-text").fadeOut();
		$("#register_btn").show();
		alert(res.error_text);
	}else{
		$(".save-text").fadeOut();
		$("#register_btn").show();
		alert('Something wrong! Could not save your changes');
	}
});
	/*
	alert(form_data);
  */
}
function save_newsletter(){
	/*$("#newsletter_btns").hide();
	$('.save-text').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25">');
	$(".save-text").fadeIn();
	var form_data = $("#form_update_content").serialize();
	$.getJSON(HTTP_SITE+'ajaxuserapi/update_newsletter_on_register/?callback=?',form_data,function(res){
    if(res.message=='1')
	{
		if(res.new_user=='0')
		{
			$('.save-text').html('Saved... redirecting to home page.');
			$(".save-text").fadeIn();
			$.ajax({
					data : 'session=1',
					url  : HTTP_SITE+'home/updateMySession',
					type : "POST",
					success : function(){
						location.href = HTTP_SITE;
					}
			});
		}

	}
	else if(res.error=='1')
	{
		$(".save-text").fadeOut();
		$("#email_error").html('Somthing went wrong please try again.');
		$("#email_error").show();
		$("#email_error_cont").addClass('alert_formfield');
	}
	});*/
}
function update_user_content(){
	$('.save-text').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25">');
	$(".save-text").fadeIn();
	var form_data = $("#form_update_content").serialize();
	$.getJSON(HTTPS_SITE+'ajaxuserapi/update_content_on_register/?callback=?',form_data,function(res){
    if(res.message=='1')
	{
		if(res.new_user=='0')
		{
			$('.save-text').html('Saved... updating personalized video recommendations... should only take a few seconds...');
			$(".save-text").fadeIn();
			$.ajax({
					data : 'session=1',
					url  : HTTP_SITE+'home/updateMySession',
					type : "POST",
					success : function(){
						location.href = HTTP_SITE+'register-step3';
					}
			});
		}

	}
	else if(res.email_error=='1')
	{
		$(".save-text").fadeOut();
		$("#email_error").html('E-mail already registered.');
		$("#email_error").show();
		$("#email_error_cont").addClass('alert_formfield');
	}

});
}

function check_user_age()
{
	var birth_month = $("#birth_month").val();
	var birth_day = $("#birth_day").val();
	var birth_year = $("#birth_year").val();
	var current_year = $("#current_year").val();

	//console.log(birth_year+'-'+birth_month+'-'+birth_day);


	//&& (current_year-birth_year)>=18) &&
	if(birth_year!='' && birth_month!='' && birth_day!='')
	{

		var dob = new Date(birth_year+'-'+birth_month+'-'+birth_day);
		var today = new Date(current_year);
		var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
		//$('#age').html(age+' years old');
		if(age>=18){
			$("#allow_uncensored").removeAttr('disabled');
			$("#allow_tvma").removeAttr('disabled');
			$("#skip_button").hide();
			$("#save_button").show();
			$("#date_update_msg").html('You have confirmed that you are at least 18 years old.');
			$("#date_update_msg").show();
			$(".checkbox-text").css('color','#000');
		}else{
			$("#allow_uncensored").attr('checked',false);
			$("#allow_tvma").attr('checked',false);
			$("#allow_uncensored").attr('disabled','disabled');
			$("#allow_tvma").attr('disabled','disabled');
			$("#skip_button").show();
			$("#save_button").hide();
			$("#date_update_msg").html('The selected birthdate is not at least 18 years old, mature and uncensored content is not available.');
			$("#date_update_msg").show();
			$(".checkbox-text").css('color','#808081');
		}
	}
	else{
		$("#allow_uncensored").attr('checked',false);
		$("#allow_tvma").attr('checked',false);
		$("#allow_uncensored").attr('disabled','disabled');
		$("#allow_tvma").attr('disabled','disabled');
		$("#skip_button").show();
		$("#save_button").hide();
		$("#date_update_msg").hide();
		$(".checkbox-text").css('color','#808081');

	}
}

//comedian settings functions

function add_to_avoid(comedian_id)
{
	var total_avoid = parseInt($("#total_avoid").html())+1;
	var total_comedians = parseInt($("#total_comedians").html())-1;
	$("#remove_"+comedian_id).hide();
	 $.ajax({
				data : 'comedian_id='+comedian_id,
				url  : HTTP_SITE+'user/add_to_avoid_list',
				type : "POST",
				success : function(data){
					if(data!='0')
					{
						var response = $.parseJSON(data);
						var html = '';
						$.each(response.comedian,function (index, res) {
							var comedian_image = 'no-image-available.jpg';
							if(res.comedian_thumbimageurl)
								comedian_image = 'comedians/'+res.comedian_thumbimageurl;
							html = '<div class="comedians-line" id="av_comedian_'+res.comedian_id+'"><div class="comedians-image"><img src="'+HTTP_IMAGES+''+comedian_image+'" width="44" height="38" /></div><div class="comedians-name">'+res.comedian_fullname+'</div><a href="#" id="add_'+res.comedian_id+'" onclick="return remove_from_avoid('+res.comedian_id+')"><div class="comedians-dele"></div></a></div>';
						});
						$("#comedian_"+comedian_id).remove();
						$("#avoid_comedian").prepend(html);
						$("#total_avoid").html(total_avoid);
						$("#total_comedians").html(total_comedians)
					}
				}
		});
	return false;
}
function remove_from_avoid(comedian_id)
{
	var total_avoid = parseInt($("#total_avoid").html())-1;
	var total_comedians = parseInt($("#total_comedians").html())+1;
	$("#add_"+comedian_id).hide();
	 $.ajax({
				data : 'comedian_id='+comedian_id,
				url  : HTTP_SITE+'user/remove_from_avoid_list',
				type : "POST",
				success : function(data){
					if(data!='0')
					{
						var response = $.parseJSON(data);
						var html = '';
						$.each(response.comedian,function (index, res) {
							var comedian_image = 'no-image-available.jpg';
							if(res.comedian_thumbimageurl)
								comedian_image = 'comedians/'+res.comedian_thumbimageurl;
							html = '<div class="comedians-line" id="comedian_'+res.comedian_id+'"><div class="comedians-image"><img src="'+HTTP_IMAGES+''+comedian_image+'" width="44" height="38" /></div><div class="comedians-name comedians-name-all">'+res.comedian_fullname+'</div><a href="#" id="remove_'+comedian_id+'" onclick="return add_to_avoid('+comedian_id+')"><div class="comedians-add"></div></a></div>';
						});
						$("#av_comedian_"+comedian_id).remove();
						$("#like_comedian").prepend(html);
						$("#total_avoid").html(total_avoid);
						$("#total_comedians").html(total_comedians)
					}
				}
		});
	return false;
}
///Topic settings

function add_topic_to_avoid(topic_id)
{
	var total_avoid = parseInt($("#total_avoid").html())+1;
	var total_topics = parseInt($("#total_topics").html())-1;
	$("#remove_"+topic_id).hide();
	 $.ajax({
				data : 'topic_id='+topic_id,
				url  : HTTP_SITE+'user/add_topic_to_avoid_list',
				type : "POST",
				success : function(data){
					if(data!='0')
					{
						var response = $.parseJSON(data);
						var html = '';
						$.each(response.topic,function (index, res) {
							html = '<div class="comedians-line" id="av_topic_'+res.topic_id+'"><div class="comedians-name" style="margin-top:0px; width:188px">'+res.topic_name+'</div><a href="javascript:void(0)" id="add_'+res.topic_id+'" onclick="return remove_topic_from_avoid('+res.topic_id+')"><div class="comedians-dele"></div></a></div>';
						});
						$("#topic_"+topic_id).remove();
						$("#avoid_topics").prepend(html);
						$("#total_avoid").html(total_avoid);
						$("#total_topics").html(total_topics)
					}
				}
		});
	return false;
}
function remove_topic_from_avoid(topic_id)
{
	var total_avoid = parseInt($("#total_avoid").html())-1;
	var total_topics = parseInt($("#total_topics").html())+1;
	$("#add_"+topic_id).hide();
	 $.ajax({
				data : 'topic_id='+topic_id,
				url  : HTTP_SITE+'user/remove_topic_from_avoid_list',
				type : "POST",
				success : function(data){
					if(data!='0')
					{
						var response = $.parseJSON(data);
						var html = '';
						$.each(response.topic,function (index, res) {
							html = '<div class="comedians-line"  id="topic_'+res.topic_id+'"><div class="comedians-name topic_name_all" style=" width:188px">'+res.topic_name+'</div><a href="javascript:void(0)" id="remove_'+res.topic_id+'" onclick="return add_topic_to_avoid('+res.topic_id+')"><div class="comedians-add" style="margin-top:0px;"></div></a></div>';
						});
						$("#av_topic_"+topic_id).remove();
						$("#like_topics").prepend(html);
						$("#total_avoid").html(total_avoid);
						$("#total_topics").html(total_topics)
					}
				}
		});
	return false;
}

//Social connections settings

function connect_facebook()
{
	location.href = HTTP_SITE+'facebook-connect';
}
function connect_facebook_step3(){
	location.href = HTTP_SITE+'facebook-connect-step3';
}
function disconnect_facebook()
{
	var c = confirm("Are you sure you want to disconnect?");
	if(c)
	{
		location.href = HTTP_SITE+'facebook-disconnect';
	}
	else
		return false;
}
function connect_twitter()
{
	location.href = HTTP_SITE+'twitter-auth';
}
function connect_twitter_step3(){
	location.href = HTTP_SITE+'twitter';
}
function disconnect_twitter()
{
	var c = confirm("Are you sure you want to disconnect?");
	if(c)
	{
		location.href = HTTP_SITE+'twitter-disconnect';
	}
	else
		return false;
}

////////////////////////////////////////////////////Admin////////////////////////////////////////////

function show_hide_comedians(){
	var is_checked = $("#is_comedian").attr('checked');
	if(is_checked){
		$("#comedian_list").fadeIn();
	}else{
		$("#comedian_list").fadeOut();
	}
}

function updateNewsLetter(){
	var email = $("#email").val();
	var ids = "";
	if ($('#checkbox_91').is(':checked')){
		ids = "91";
	}

	if ($('#checkbox_59').is(':checked')){
		if(ids=='')
			ids += "59";
		else
			ids += ",59";
	}

	if ($('#checkbox_42').is(':checked')){
		if(ids=='')
			ids += "42";
		else
			ids += ",42";
	}

	if ($('#checkbox_43').is(':checked')){
		if(ids=='')
			ids += "43";
		else
			ids += ",43";
	}
	if(ids==''){
		//alert('Please select at least one');
		return false;
	}
	 if(email!=''){
		 $.ajax({
			data : 'email='+email+'&ids='+ids+'&action=update',
			url  : HTTP_SITE+'constant_contacts/search.php',
			type : "POST",
			success : function(data){
				var res = data;
			}
		});
	 }
}
function updateNewsLetterRegister(){

	var email = $("#email_reg").val();
	var ids = "";
	if ($('#checkbox_reg_91').is(':checked')){
		ids = "91";
	}

	if ($('#checkbox_reg_59').is(':checked')){
		if(ids=='')
			ids += "59";
		else
			ids += ",59";
	}

	if ($('#checkbox_reg_42').is(':checked')){
		if(ids=='')
			ids += "42";
		else
			ids += ",42";
	}

	if ($('#checkbox_reg_43').is(':checked')){
		if(ids=='')
			ids += "43";
		else
			ids += ",43";
	}
	if(ids==''){
		//alert('Please select at least one');
		//return false;
	}
	$("#newsletter_btns").hide();
	$('.save-text').html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25">');
	$(".save-text").fadeIn();
	 if(email!=''){
		 $.ajax({
			data : 'email='+email+'&ids='+ids+'&action=update',
			url  : HTTP_SITE+'constant_contacts/search.php',
			type : "POST",
			success : function(data){
				/*var redirect = $("#redirect_after").val();
				location.href = HTTP_SITE+''+redirect;*/
				location.href = HTTP_SITE;
			}
		});
	 }
}
function checkNewsLetter(){
	var email = $("#email_reg").val();
	email = (email=='')?$("#email").val():email;
	//$('#checkbox_91').prop('checked', false);
	//$('#checkbox_59').prop('checked', false);
	//$('#checkbox_42').prop('checked', false);
	//$('#checkbox_43').prop('checked', false);

	 if(email!=''){
		 $.ajax({
				data : 'email='+email+'&action=search',
				url  : HTTP_SITE+'constant_contacts/search.php',
				type : "POST",
				success : function(data){
					if(data!='0')
					{
						var response = $.parseJSON(data);
						$.each(response.news_id,function (index, res) {
							$("#res_"+res).html(' &laquo; Your e-mail address has already been previously subscribed to this mailing list');
							$("#res_"+res).show();
							$('#checkbox_'+res).prop('checked', true);
						});
					}
				}
		});
	 }
}
