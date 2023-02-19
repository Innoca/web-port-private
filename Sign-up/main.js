const form = document.querySelector('#create-account');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

form.addEventListener('submit', (event) => {
    
    
    validateForm();

    if(isFormValid() == true){
        form.submit();
    } else {
        event.preventDefault();
    }

})

function isFormValid() {
    const inputContainers = form.querySelectorAll('.inputs');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    })

    return result;
}

function validateForm() {
    // Email
    if (emailInput.value.trim() == ''){
        setError(emailInput, 'Provide Email address!')
    }  else if (isEmailValid(emailInput.value)) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Provide valid email address!');
    }
    // Password

    if(passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password can not be empty');
    } else if (passwordInput.value.trim().length < 8 || passwordInput.value.trim().length > 16){
        setError(passwordInput, 'Password must be between 8 and 16 characters')
    } else {
        setSuccess(passwordInput);
    }
    // Repeat Password
    
    if(confirmPasswordInput.value.trim() == '') {
        setError(confirmPasswordInput, 'Password can not be empty!');
    } else if (confirmPasswordInput.value != passwordInput.value) {
        setError(confirmPasswordInput, 'Password does not match!')
    } else {
        setSuccess(confirmPasswordInput)
    }
}

function setError(element, errorMessage) {
    const parent = element.parentElement;

    if(parent.classList.contains('success')) {
        parent.classList.remove('success')
    }

    parent.classList.add('error');
    const span = parent.querySelector('span');
    span.textContent = errorMessage
}

function setSuccess(element) {
    const parent = element.parentElement;

    if (parent.classList.contains('error')){
        parent.classList.remove('error');
    }

    parent.classList.add('success');
}

function isEmailValid(email) {
    

    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(email);
}

function retrievingData() {
    var emailInput = document.querySelector('#email').value;
    var passwordInput = document.querySelector('#password').value;
    var confirmPasswordInput = document.querySelector('#confirm-password').value;

    var arr = [emailInput, passwordInput, confirmPasswordInput];

    if (arr.includes("")){
        return false;
    } else {
        return arr;
    }
}




function readingDataFromLocalStorage(dataEntered) {
    var e = localStorage.setItem("Email Sign-In", dataEntered[0]);
    var p = localStorage.setItem("Password", dataEntered[1]);
    var c = localStorage.setItem("Confirm Password", dataEntered[2]);
}