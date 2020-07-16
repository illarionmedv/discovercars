//Close modal clicking on cross
$(".modal_close_btn").click(function(){
    $(".modal_background").removeClass("animate__fadeInDownBig");
    $(".modal_background").addClass("animate__fadeOutUpBig");
    $(".background").addClass("disabled");
});

//Close modal clicking on background
$(".background").click(function(){
    $(".modal_background").removeClass("animate__fadeInDownBig");
    $(".modal_background").addClass("animate__fadeOutUpBig");
    $(this).addClass("disabled");
});

//Show sign in modal
$("#sign_in_scenario").click(function(){
    show_modal("sign_in_modal","sign_up_modal");
});

//Show sign up modal
$("#sign_up_scenario").click(function(){
    show_modal("sign_up_modal","sign_in_modal");
});

//Switching cards
$('#sign_up_switch').click(function(){
    show_modal("sign_up_modal","sign_in_modal");
});

function show_modal (first_priority, sec_priority){
    $("#"+sec_priority+"").addClass("disabled");
    $(".modal_background").removeClass("animate__fadeOutUpBig");
    $(".background").removeClass("disabled");
    $("#"+first_priority+"").removeClass("disabled");
    $("#"+first_priority+"").addClass("animate__fadeInDownBig");
}

//Live email validation
$('#sign_in_email').on('input', function() {
    var email = $(this).val();
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(email != ""){
        if(email.length > 3){
            if (!regex.test(email)) {
                $(this).addClass("input_error");
                if($(this).next().hasClass("error_text")){
                    
                }else{
                    $(this).after( "<div class='error_text'>Invalid email address</div>" );
                }
            } else {
                $(this).removeClass("input_error");
                $(this).next().remove();
            }
        }
    }else{
        $(this).removeClass("input_error");
        $(this).next().remove();
    }
});

//Live password validation
$('#sign_in_password').on('input', function() {
    var password = $(this).val();

    if(password != ""){
            if (password.length < 6) {
                $(this).addClass("input_error");
                if($(this).next().hasClass("error_text")){
                    
                }else{
                    $(this).after( "<div class='error_text'>Password is too short</div>" );
                }
            } else {
                $(this).removeClass("input_error");
                $(this).next().remove();
            }
    }else{
        $(this).removeClass("input_error");
        $(this).next().remove();
    }
});

//Handling sign in submit event
$( "#sign_in_form" ).submit(function( event ) {
    $(".error_message_box").addClass("disabled");

    let email_value = $("#sign_in_email").val();
    let pwd_value = $("#sign_in_password").val();

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        let response_code = this.status;
        let response_json = this.responseText;
        let response_obj = JSON.parse(response_json);
        let response_message = response_obj.message;

        //Handling different Scenarios
        switch(response_code){
            case 404:
                $(".error_message_box").removeClass("disabled");
                $(".error_message_box").text(response_message);
                break;
            case 401:
                $(".error_message_box").removeClass("disabled");
                $(".error_message_box").text(response_message);
                break;
            case 200:
                $(".sign_in_toast").removeClass("animate__fadeOutUp");
                $(".error_message_box").addClass("disabled");
                $(".modal_background").removeClass("animate__fadeInDownBig");
                $(".modal_background").addClass("animate__fadeOutUpBig");
                $(".background").addClass("disabled");
                $(".sign_in_toast").removeClass("disabled");
                $(".sign_in_toast").addClass("animate__fadeInDown");
                setTimeout(
                    function() 
                    {
                        $(".sign_in_toast").removeClass("animate__fadeInDown");
                        $(".sign_in_toast").addClass("animate__fadeOutUp");
                    }, 3000);
        }
    };

    xhr.open("POST", "http://localhost:5000/api/auth/sign_in");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email="+email_value+"&password="+pwd_value+"");

    event.preventDefault();
});

var app = new Vue({
    el: '#sign_up_form',
    data: {
      user_email: '',
      user_password: '',
      msg: [],
      email_validated: false,
      password_validated: false,
      submit_validation: '',
    },
    watch: {
        user_password: function() {
            //if the password is too short
            this.validatePassword();
        },
        user_email(value) {
            //if the email is valid
            this.user_email = value;
            this.validateEmail(value);
        }
    },
    methods:{
        validateEmail(value){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {
                this.msg['email'] = '';
                email_validated = true;
            } else{
                email_validated = false;
                this.msg['email'] = 'Invalid email address';
            } 
        },
        validatePassword(){
            if(this.user_password.length <= 6) {
                this.msg['password'] = 'Password is too short';
                password_validated = false;
            } else{
                this.msg['password'] = '';
                password_validated = true;
            } 
        },
        submit : function(event){
            if(password_validated == false || email_validated == false){
                this.submit_validation = 'Please fix the errors down below and try again.';
            }else{
                //sending api request
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/auth/sign_up',
                    data: {
                      email:  this.user_email,
                      password:  this.user_password
                    },
                    validateStatus: () => true
                  })
                    .then(function (response) {
                        switch(response.status){
                            case 409:
                                app.submit_validation = response.data.message;
                                break;
                            case 201:
                                $(".sign_up_toast").removeClass("animate__fadeOutUp");
                                $(".modal_background").removeClass("animate__fadeInDownBig");
                                $(".modal_background").addClass("animate__fadeOutUpBig");
                                $(".background").addClass("disabled");
                                $(".sign_up_toast").removeClass("disabled");
                                $(".sign_up_toast").addClass("animate__fadeInDown");
                                setTimeout(
                                    function() 
                                    {
                                        $(".sign_up_toast").removeClass("animate__fadeInDown");
                                        $(".sign_up_toast").addClass("animate__fadeOutUp");
                                    }, 3000);
                                break;
                        }
                    })
            }
            
        },
        closeOnCross(){
            $(".modal_background").removeClass("animate__fadeInDownBig");
            $(".modal_background").addClass("animate__fadeOutUpBig");
            $(".background").addClass("disabled");
        },
        SignSwitch(){
            $("#sign_up_modal").addClass("disabled");
            $(".modal_background").removeClass("animate__fadeOutUpBig");
            $(".background").removeClass("disabled");
            $("#sign_in_modal").removeClass("disabled");
            $("#sign_in_modal").addClass("animate__fadeInDownBig");
        }
    }
})