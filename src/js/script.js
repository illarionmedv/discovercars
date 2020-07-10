//Close modal
$(".modal_close_btn").click(function(){
    $(".modal_background").addClass("disabled");
});

//Show sign in modal
$("#sign_in_scenario").click(function(){
    $("#sign_in_modal").removeClass("disabled");
});

//Show sign up modal
$("#sign_up_scenario").click(function(){
    $("#sign_up_modal").removeClass("disabled");
});

//Remind user if the sign in email is valid
$("#sign_in_email").focusout(function(){
    const error = $("#email_error");
});


var firebaseConfig = {
    apiKey: "AIzaSyDzvrB3eOcsl0m20Y10ybiiZM0F8ktlQ_o",
    authDomain: "discovercars-c9acc.firebaseapp.com",
    databaseURL: "https://discovercars-c9acc.firebaseio.com",
    projectId: "discovercars-c9acc",
    appId: "1:60029479204:web:2c8ae327d8a76db2612bb1"
};
firebase.initializeApp(firebaseConfig);

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

