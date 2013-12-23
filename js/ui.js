var controlref = {'def-env':'env-content','def-scan':'tcp-content','tcp-scan':'tcp-content',
  	                  'udp-scan':'udp-content','def-test':'arp-content','arp-test':'arp-content',
  	                  'icmp-test':'icmp-content'};
$(function(){
	$('.navbar a').hover(function(){
		if ($(this).parent().parent().hasClass('dropdown-menu')==false)
			$('.dropdown-menu').slideUp(100);
	},function(){});
	$('.navbar .dropdown-menu').hover(function(){},function(){
		$(this).slideUp(100);
	});

	$('.navbar .dropdown-toggle').hover(function(){
		$(this).next('.dropdown-menu').slideDown(100);
	},function(){});

	$('.navbar a').click(function(){
		if ($(this).parent().hasClass('active'))
	    	return;
		else {
			for (var i in controlref) {
				if($(this).attr('id') == i) {
					$('.present').hide('slide',{ direction: "left" });
					$('.present').removeClass('present');
					$('#'+controlref[i]).show('slide',{ direction: "left" });
					$('#'+controlref[i]).addClass('present');
					$('.navbar .active').removeClass('active');
					if ($(this).parents('.dropdown-menu').length>0) {
						$(this).parent().addClass('active');
						$(this).parents('.dropdown').addClass('active');
					} else {  
						if ($(this).next('ul').find('a').length>0)
						$(this).next('ul').find('a').parent()[0].className+='active';
						$(this).parent().addClass('active');
					}
					break;
				}
			}
		}
	});

	$('.list-group-item').click(function(){
		if (!$(this).children('.list-group-item-text').is(':visible'))
		{
			$('.list-group-item-text').slideUp(200);
		}
		$(this).children('.list-group-item-text').slideDown(200);
	});

	$('#arp-content Label').click(function(){
		var id = $(this).children('input').attr('id');
		if (id == 'Limit-radio')
			$("#limit-input").slideDown(200);
		else
			$("#limit-input").slideUp(200);
	});
});