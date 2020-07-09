//Close modal Window
$(".modal_close_btn").click(function(){
    $(".modal_background").addClass("disabled");
});

//Show sign in modal
$("#sign_in_scenario").click(function(){
    $(".modal_background").removeClass("disabled");
});

//Remind user if the sign in email is valid
$("#sign_in_email").focusout(function(){
    const error = $("#email_error");
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

