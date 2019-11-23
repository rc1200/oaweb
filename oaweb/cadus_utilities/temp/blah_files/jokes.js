function valid_search(){
	var kw = $("#kw").val();
	if(kw==''){
		alert("Please provide search keyword");
		$("#kw").focus();
		return false;
	}
	return true;
}
///////////////////////Load more jokes///////////////////
var jokes_current_page = 2;
function loadmorejokes(){
	var total_jokes = $("#total_jokes").val();
	var jokes_perpage = $("#jokes_per_page").val();
	var offset = (jokes_current_page-1)*jokes_perpage;
	var jokes_type = $("#jokes_type").val();
	var jokes_category = $("#jokes_category").val(); 
	var kw = $("#kw").val();
	$("#loaderBtn").hide();
	$("#joke_moreloader").fadeIn();
	$.ajax({
			data : 'offset='+offset+'&joke_type='+jokes_type+'&jokes_perpage='+jokes_perpage+'&kw='+kw+'&catid='+jokes_category,
			url  : HTTP_SITE+'joke/loadmorejokes',
			type : "GET",
			success : function(response){
				$("#joke_moreloader").hide();
				data = JSON.parse(response);
				
				jokes_current_page++;
				var html = getJokesHtml(response);
				$("#jokes_container > .jokes").last().after(html);
				if(data.jokescount==5)
				$("#loaderBtn").show();//location.reload(true);	
			}
	});
}
function getJokesHtml(data){
	data = JSON.parse(data);
	var isadmin = data.isadmin;
	var today = data.today;
	var userid = data.userid;
	jokes = data.jokes;
	var html = '';
	var url      = window.location.href;
	$.each(jokes,function(index,joke){
		html += '<div class="jokes"><div class="joke-msg">';
    if(isadmin){
			html += '<a href="'+HTTP_SITE+'joke/delete/'+joke.joke_id+'" onclick="return confirm(\'Are you sure you want to delete?\');" ><div class="close"></div></a>';
		}
    var joke_text = joke.joke_text.replace(/\n/g, "<br />");
    
    html +='<div class="joke-text"><p id="joke_'+joke.joke_id+'">'+joke_text+'</p>';
    if(joke.jokedaily_datefeatured){
    	html += '<p class="joke-name" style="float:left; width:250px; text-align:left">';
    	if(today==joke.fjdate){
    		html += 'Today\'s Joke'; 
    	}
    	else{ 
    		html += 'Featured on '+joke.fdisplaydate;
    	}
    	html += '</p>'
    }        
            
    html += '</div><div class="v-social-icons"><div class="facebook">';
    html += '<a href="javascript:void(0);" onclick="post_joke_on_facebook(\''+url+'\',\'Jokes\')"><i class="fa fa-facebook"></i></a>';
   
    
    html += '</div><div class="twitter">';
   	html += '<a href="javascript:void(0); onclick="post_joke_on_twitter(\''+url+'\',\'Jokes\')"><i class="fa fa-twitter"></i></a>';
   
    
    html += '</div></div><span class="joke-publisher">'+joke.joke_submitter+'</span></div>';


    html += '<div class="likes-dislikes-sec"><div class="likes-dislikes-count">';
    html += '<a class="like" href="javascript:void(0);" id="thumbs_1_'+joke.joke_id+'" onclick="jokes_rating(1,'+joke.joke_id+')"><img src="'+HTTP_SITE+'images/project-images/joke-smile.png" /><span id="thumbs_up_number_'+joke.joke_id+'">'+joke.thumb_up_count+'</span></a>';
    html += '<a class="dislike" href="javascript:void(0);" onclick="jokes_rating(-1,'+joke.joke_id+')"><img src="'+HTTP_SITE+'images/project-images/joke-dislike.png" /><span id="thumbs_down_number_'+joke.joke_id+'">'+joke.thumb_down_count+'</span></a>';
    html += '</div>';
		if(isadmin=='1'){
			if(typeof(joke.daily_joke)!='undefined' && (joke.daily_joke!='0' || joke.daily_joke!='2')){
      	html +='<a href="'+HTTP_SITE+'joke/make_joke_of_the_day/'+joke.joke_id+'" onclick="';
      	if(typeof(joke.daily_joke) && joke.daily_joke!='0' && joke.daily_joke!='2'){
      		html += 'return confirm_again(\''+joke.daily_joke+'\')';
      	}
      	html += '">';
        html += '<div class="add-btn"></div></a>';

			}else{
				html += '<a href="javascript:void(0)" onclick="';
				if(typeof(joke.daily_joke) && joke.daily_joke!='0' && joke.daily_joke!='2'){
      		html += 'return confirm_again(\''+joke.daily_joke+'\')';
      	}
      	html += '">';
        html += '<div class="add-btn"></div></a>';
			}
    }
    html += '</div></div>';
	});
	return html;
}
/////////////////end loadmore jokes///////////////////////
function submit_joke(){
	var form_data = $("#submit_joke_form").serialize();
	var joke_text = $("#joke_text").val();
	$("#joke_error").hide();
	if(joke_text==''){
		$("#joke_text").focus();
		$("#joke_error").show();
		return false;
	}
	$("#joke_loading").show();
	$("#joke_loading").html('<img src="'+HTTP_IMAGES+'ajax_loader.gif" width="25" style="margin-top:0px;"> ');
	$.ajax({
				data : form_data,
				url  : HTTP_SITE+'joke/submit_new_joke',
				type : "POST",
				success : function(response){
					var res = eval('('+response+')');
					if(res.saved=='1'){
						$("#joke_text").val('');
						$("#submit_name").val('');
						$("#joke_category").val('');
						$("#is_anonymous").attr('checked',false);
						$("#joke_loading").html('Your joke has been submitted successfully!  If approved by our amazing team of humor experts, it will be added to our site soon!');
					}else if(res.joke_text=='1'){
						$("#joke_error").show();
						$("#joke_loading").hide();
					}
					
					//location.reload(true);	
				}
		});
		
		return false;
}


FB.init({appId: fb_app_id, status: true, cookie: true});

      function postToFeed(url,caption,joke_id) {

        // calling the API ...
		var description = $("#joke_"+joke_id).html();
        var obj = {
          method: 'feed',
          redirect_uri: url,
          link: url,
          picture: HTTP_IMAGES+'logo.png',
          name: 'Laugh Factory',
          caption: caption,
          description: description
        };

        function callback(response) {
			
          //document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
        }

        FB.ui(obj, function() {
			
        });
      }


//fb post
function post_joke_on_facebook(url,title,pagename){
	url_link = 'http://www.facebook.com/dialog/feed?app_id=530980343596175&link='+url+'&name='+pagename+'&caption=Jokes&description='+title+'&message='+title+'&redirect_uri='+url;

	//var url_link="http://www.facebook.com/share.php?s=100&p[url]="+url+"&p[title]=JOkes"+title;
	window.open(url_link, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=450");
	
}
function post_joke_on_twitter(url,title){
	var url_link="http://twitter.com/intent/tweet?status="+title+"+"+url;
	window.open(url_link, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=450");
}
function not_login(){
	alert('Please login to share on your facebook');
	return false;
}
function jokes_rating(val,joke_id){
	//$("#thumbs_main_"+joke_id).hide();
	$.ajax({
		data : 'joke_id='+joke_id+'&val='+val,
		url  : HTTP_SITE+'joke/add_joke_rating',
		type : "POST",
		success : function(response){
			
			var res = $.parseJSON(response);
			if(res.action=="added"){
				if(val=='1'){
					$("#thumbs_"+val+"_"+joke_id).removeClass('thumup-joke3').addClass('thumup-joke3_active');
				}else{
					$("#thumbs_"+val+"_"+joke_id).removeClass('thumdown-joke3').addClass('thumdown-joke3_active');
				}
			}else if(res.action=="removed"){
				if(val=='1'){
					$("#thumbs_"+val+"_"+joke_id).removeClass('thumup-joke3_active').addClass('thumup-joke3');
				}else{
					$("#thumbs_"+val+"_"+joke_id).removeClass('thumdown-joke3_active').addClass('thumdown-joke3');
				}
			}else if(res.action=="updated"){
				if(val=='1'){
					$("#thumbs_-1_"+joke_id).removeClass('thumdown-joke3_active').addClass('thumdown-joke3');
					$("#thumbs_1_"+joke_id).removeClass('thumup-joke3').addClass('thumup-joke3_active');
				}else{
					$("#thumbs_-1_"+joke_id).removeClass('thumdown-joke3').addClass('thumdown-joke3_active');
					$("#thumbs_1_"+joke_id).removeClass('thumup-joke3_active').addClass('thumup-joke3');
				}
				
			}
			$("#thumbs_up_number_"+joke_id).html(res.up);
			$("#thumbs_down_number_"+joke_id).html(res.down);
			//$("#thumbs_main_"+joke_id).show();
		}
		});
}


