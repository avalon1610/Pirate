var warning_msg = '<div class="alert alert-danger" style="display:none">\
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
<strong>Error!</strong> \"';
var msg_end = '\" is wrong format for this field. </div>';

function check_format(obj,exp) {
	if (obj.val().length>0 && !exp.test(obj.val())) {
		obj.parents('.panel-body').prepend(warning_msg+obj.val()+msg_end);
		obj.parents('.panel-body').children('.alert').slideDown(200);
		obj.val('');
		obj.focus();
	}
	else
	{
		obj.parents('.panel-body').children('.alert').slideUp(200);
		setTimeout(function() {
			obj.parents('.panel-body').children('.alert').remove();
		}, 500);
	}
}

function makepopover(obj) {
	obj.popover({
		content:'Can not be empty.',
		placement:'top',
		trigger:'manual'
	});
	obj.popover('show');
	$('.popover').hover(function(){
		$(this).fadeOut(100);
	});
}

function ParseObject(data) {
	if (data.obj == undefined)
		return;
	var o = {};
	var a = data.obj.find('input,select');
	if (a.length > 0) {
		o['config-type'] = config_type[data.obj[0].name];
		a.each(function(){
			if (this.tagName == 'INPUT') {
				switch (this.type) {
					case 'radio':
						if (!$(this).parent().hasClass('active'))
							return;
						o[$(this).parents('.btn-group').attr('name')] = $(this).parent().text().trim().toLowerCase();
						break;
					case 'text':
						if ($(this).parent().css('display') != 'none') {
							if ($(this).val().length > 0)
								o[this.name] = $(this).val();
							else {
								$(this).focus();
								if (!data.auto)
									makepopover($(this));
								data.ok = false;
							}
						}

						break;
					default:
						break;
				}
			} else if (this.tagName == 'SELECT') {
				o[this.name] = $(this).val();
			}
		});
	}

	if ($.isEmptyObject(o))
		return '';
	else
		return JSON.stringify(o);
}

function save_config(auto) {
	var data = {
		'obj':$('.present .sub-present'),
		'ok':true,
		'auto':auto
	};
	var r = ParseObject(data);
	var ok = data.ok;
	if (ok) {
		if (r.length > 0) {
			//alert(r);
			var err_msg = senddata(r);
			if (err_msg.length > 0)
				ok = false;
			show_alert(ok,err_msg);
		} else {
			// no data send
		}
	}
	else if (!auto) // when auto, no alert
		show_alert(ok);

	return ok;
}

function senddata(d) {
	var err_msg = '';
	var url = (domain.length > 0) ?
		'http://' + domain + '/config' : '/config';
	$.ajax({
		type: "POST",
		url: url,
		data: d,
		async: false,
		success: function(data){
			err_msg = data;
		}
	});

	return err_msg;
}
var domain = '192.168.1.102';
var auto_save_interval = 30000;
var config_type = {
	'ARP_REQUEST_STORM' : 0,
	'ARP_HOST_REPLY_STORM' : 1,
	'ARP_CACHE_SATURATION_STORM' : 2,
	'ARP_GRAMMEAR ' : 3
}
function show_alert(success,msg)
{
	if (success)
		$('#config-saved-alert-success').slideDown(200).delay(2000).slideUp(200);
	else {
		if (msg != undefined) {
			$('#config-saved-alert-error').html(msg);
		} else {
			$('#config-saved-alert-error').html('Config Save Error !');
		}
		$('#config-saved-alert-error').slideDown(200).delay(2000).slideUp(200);
	}
}

function auto_save_config() {
	if ($('#auto-save-checkbox').bootstrapSwitch('status')) {
		save_config(true);
	} 
}

function destroy_popover() {
	if ($(this).next('.popover').length > 0)
		$(this).popover('destroy');
}

$(function(){
	$('.ip-input').blur(function(){
		var exp = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/;
		check_format($(this),exp);
	});

	$('.mac-input').blur(function(){
		var exp = /^([A-Fa-f\d]{2})(:([A-Fa-f\d]{2})){5}$"/;
		check_format($(this),exp);
	});

	$('.int-input').keyup(function(){
		$(this).val($(this).val().replace(/\D|^0/g,''));
  	}).bind("paste",function(){ // Ctrl+v event
  		$(this).val($(this).val().replace(/\D|^0/g,''));
  	}).css("ime-mode","disabled"); // disable ime

  	$('.double-input').keyup(function(){
  		$(this).val($(this).val().replace(/[^0-9.]/g,''));
  	}).bind("paste",function(){ // Ctrl+v event
  		$(this).val($(this).val().replace(/[^0-9.]/g,''));
  	}).css("ime-mode","disabled"); // disable ime

  	$('#manual-save-button').on('click',function(){
  		save_config(false);
  	});

  	setInterval(auto_save_config,auto_save_interval);

});
