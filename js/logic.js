var warning_msg = '<div class="alert alert-danger" style="display:none">\
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
<strong>Error!</strong> \"';
var msg_end = '\" is wrong format for this field. </div>';

function check_format(obj,exp){
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
});
