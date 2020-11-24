const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const popupText = document.querySelector('.popup__text');
const logoutBtn = document.querySelector('.logoutBtn');

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

    if(errorCount === 0) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    }

    //console.log(errorCount);
};

const login = async (email, password) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if(result.data.status === 'success') {
            popup.classList.add('show-popup');
            window.setTimeout(() => {
                location.assign('/');
            }, 2000);

            closeBtn.addEventListener('click', () => {
                popup.classList.remove('show-popup');
                location.assign('/');
            });
        }

        //console.log(result);
    } catch (err) {
        popupText.innerHTML = err.response.data.message;
        popup.classList.add('show-popup');
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show-popup');
            location.reload();
        });
    }
};

const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        })
        if (res.data.status === 'success') location.assign('/');
    } catch (err) {
        alert('Error logging out! Try again.');
    }
};

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    checkForm([email, pass]);
    checkLength(pass, 8);
    checkMail(email);
    checkErrors();
});

if(logoutBtn) logoutBtn.addEventListener('click', logout);

// module.exports = {loggedIn};

