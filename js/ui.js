var controlref = {'def-env':'env-content','def-scan':'tcp-content','tcp-scan':'tcp-content',
  	                  'udp-scan':'udp-content','def-test':'arp-content','arp-test':'arp-content',
  	                  'icmp-test':'icmp-content','def-runner':'runner-content'};
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
					auto_save_config();
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
			$('.list-group-item').removeClass('sub-present');
		}
		$(this).children('.list-group-item-text').slideDown(200);
		$(this).addClass('sub-present');

		var ref = '.content-info[name='+$(this).attr('name')+']';
		if (!$(ref).is(':visible'))
			$('.content-info').slideUp(200);
		$(ref).slideDown(200);
	});

	$('#rate-limit-group label').click(function(){
		var id = $(this).children('input').attr('id');
		if (id == 'Limit-radio-Rate')
		{
			$("#dos-input").slideUp(200);
			$("#limit-input").slideDown(200);	
		}
		else if (id == 'Dos-radio-Rate')
		{
			$("#limit-input").slideUp(200);
			$("#dos-input").slideDown(200);
		}
		else
		{
			$("#dos-input").slideUp(200);
			$("#limit-input").slideUp(200);
		}
	});

	$('#duration-group label').click(function(){
		var id = $(this).children('input').attr('id');
		if (id == 'Set-radio-Duration')
			$('#duration-input').slideDown(200);
		else
			$('#duration-input').slideUp(200);
	});

	$('label').tooltip();

	$('#auto-save-checkbox').on('switch-change',function(){
		if (!$('#auto-save-checkbox').bootstrapSwitch('status'))
			$('#manual-save-button').fadeIn(100);
		else
		{
			$('#manual-save-button').fadeOut(100);		
		}
	});

	$('input').on('keyup blur',destroy_popover);

	$('.arp-content ')

});