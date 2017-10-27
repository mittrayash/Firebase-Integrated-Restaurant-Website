$(document).ready(function(){

    $("#signup-link").click(function(){
        $("#signup-content").css('visibility','visible').hide().fadeIn().removeClass('hidden');
        $("#signup").css('visibility','visible').hide().fadeIn().removeClass('hidden');
        $("#signup-link").hide();
        $("#signin").hide();
        $("#login").hide();
    })

})