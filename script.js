const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");
const togglePassword = document.getElementById("togglePassword");


form.addEventListener("submit", function(e){

    if(username.value === "" || password.value === ""){
        e.preventDefault();
        errorMessage.textContent = "All fields must be filled!";
    }

});


togglePassword.addEventListener("click", function(){

    if(password.type === "password"){
        password.type = "text";
    } else {
        password.type = "password";
    }

});

