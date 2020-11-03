const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
};

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
}

const checkForm = input => {
    input.forEach(el => {
        if(el.value === '') {
            showError(el, el.placeholder);
        } else {
            clearError(el);
        }
    });
};

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} must contains min. ${min} characters`);
    }
};

const checkMail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(email.value)) {
        clearError(email);
    } else {
        showError(email, 'E-mail is not correct!');
    }
};

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++;
        }
    })

    // if(errorCount === 0) {
    //     popup.classList.add('show-popup');
    // }

    console.log(errorCount);
};

sendBtn.addEventListener('click', e => {
    e.preventDefault();

    checkForm([email, pass]);
    checkLength(pass, 8);
    checkMail(email);
    checkErrors();
});

clearBtn.addEventListener('click', e => {
    e.preventDefault();

    [email, pass].forEach(el => {
        el.value = '';
        clearError(el);
    });
});