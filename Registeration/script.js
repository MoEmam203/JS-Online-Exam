// to prevent back button
function disableBack() {
    window.history.forward();
}
setTimeout("disableBack()", 0);


window.addEventListener("load", function(){

    // to prevent back button 
        // window.history.forward();

        // function noBack() {
        //     window.history.forward();
        // }


    // get username , userpassword , confirm password , email ,gender 
    var username = document.getElementById("username");
    var password =document.getElementById("userpass");
    var confirmPass = document.getElementById("passconf");
    var email = document.getElementById("usermail");

    // get errors 
    var usernameerror = document.getElementById("usernameerror");
    var userpasserror = document.getElementById("passworderror");
    var confirmerror =document.getElementById("conferror");
    var emailerror = document.getElementById("emailerror");

    username.focus();

    // check username correctness
    // username.blur(function(){
    username.addEventListener("blur",function(){ 
        if(!usernamevalid()){
            username.focus();
            username.select();
            usernameerror.style.display = "block";
            username.className = "error";
        }
        else{
            usernameerror.style.display = "none";
            password.focus();
            username.className = "success";
        }
    }); // end of check username correctness


    // check of userpassword correctness 
    password.addEventListener("blur",function(){
        if(!passwordvalidation()){
            password.focus();
            password.select();
            userpasserror.style.display = "block";
            password.className = "error";
        }else{
            userpasserror.style.display = "none";
            confirmPass.focus();
            password.className="success";
        }
    }); // end of check user password

     // check of confirmpassword correctness 
    confirmPass.addEventListener("blur",function(){
        if(!confirmvalidation()){
            confirmPass.select();
            confirmPass.focus();
            confirmerror.style.display = "block";
            confirmPass.className = "error";
        }else{
            confirmerror.style.display = "none";
            email.focus();
            confirmPass.className="success";
        }
    }); // end of check user confirm password

    // check of email correctness 
    email.addEventListener("blur",function(){
        if(!emailvalidation()){
            email.select();
            email.focus();
            emailerror.style.display = "block";
            email.className = "error";
        }else{
            emailerror.style.display = "none";
            
            email.className="success";
        }
    }); // end of check email

    // register ok btn
    document.forms[0].addEventListener("submit",function(e){
        if(!(usernamevalid() && passwordvalidation() && confirmvalidation() && emailvalidation())){
            // alert("false");
            e.preventDefault();
            username.focus();
        }
        else{
            localStorage.setItem("username",username.value);
            localStorage.setItem("password",password.value);
            localStorage.setItem("gender",document.querySelectorAll("input[type='radio']:checked")[0].value);
        }
    }); // end of registraion of Ok btn

    // register cancel btn 
    document.forms[0].addEventListener("reset",function(e){
        if(!confirm("Are u sure u want to reset ?")){
            e.preventDefault();
        }
        else{
            username.focus();
        }
    });// end of cancel btn

// validation for username
function usernamevalid(){
    var usernamePattren =  /^[a-zA-Z]{6,20}$/;
    if (username.value.match(usernamePattren)){
        return true;
    } else{
        return false;
    }
}

// validation for userpassword
function passwordvalidation(){
    var passwordPattren = /^[a-zA-Z0-9]{6,20}$/;
    if(password.value.match(passwordPattren)){
        return true;
    }
    else{
        return false;
    }
}
// validation for confirm password
function confirmvalidation(){
    var passwordPattren = /^[a-zA-Z0-9]{6,20}$/;
    if(confirmPass.value.match(passwordPattren) && confirmPass.value == password.value){
        return true;
    }
    else{
        return false;
    }
}
// validation for email 
function emailvalidation (){
    var emailPattren = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(email.value.match(emailPattren)){
        return true;
    }
    else{
        return false;
    }
}



});// end of load 

