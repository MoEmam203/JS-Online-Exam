// to prevent back button 
function disableBack() {
    window.history.forward();
}
setTimeout("disableBack()", 0);

window.addEventListener("load",function(){

    // get username & userpassword
    var username = document.getElementById("username");
    var userpass = document.getElementById("userpass");

    username.focus();
    // get errors
    var usernameerror = document.getElementById("usernameerror");
    var userpasserror = document.getElementById("userpasserror");

    // get username and password from LocalStorage
    var localUserName = localStorage.getItem("username") ;
    var localPassword = localStorage.getItem("password")  ;

    // check of username correctness
    username.addEventListener("blur",function(){
        if(!usernamevalid()){
            username.focus();
            username.select();
            username.className ="error";
            usernameerror.style.display = "block";
        }else{
            usernameerror.style.display = "none";
            username.className ="success"
            userpass.focus();
        }
    }); // end of username check

    // check of password correctness
    userpass.addEventListener("blur",function(){
        if(!passwordvalidation()){
            userpass.focus();
            userpass.select();
            userpass.className = "error";
            userpasserror.style.display ="block";
        }else{
            userpasserror.style.display ="none";
            userpass.className ="success";
        }
    }); // end of userpassword check

    // register ok btn
    document.forms[0].addEventListener("submit",function(e){
        if(!(usernamevalid() && passwordvalidation())){
            e.preventDefault();
            username.focus();
        }
    }); //end of register submit btn 

    // register cancel btn
    document.forms[0].addEventListener("reset",function(e){
        if(! (confirm("Are U sure to reset ?"))){
            e.preventDefault();
        }
        else{
            username.focus();
        }
    });//end of register reset btn


    // username validation 
    function usernamevalid(){
        if(username.value ==localUserName ){
            return true;
        }else{
            return false;
        }
    }

    // password validaition 
    function passwordvalidation(){
        if(userpass.value == localPassword){
            return true;
        }
        else{
            return false;
        }
    }

}); // end of load 