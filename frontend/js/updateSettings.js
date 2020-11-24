const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const updateUserBtn = document.querySelector('.form-updateUser');
const passwordChangeBtn = document.querySelector('.form-passwordChange');

//type is either password or data
const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? 'http://127.0.0.1:4000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:4000/api/v1/users/updateMe'

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if(res.data.status === 'success') {
            const popupSett = document.querySelector('.popup-sett');
            const closeBtnSett = document.querySelector('.close-btn--sett');
            const popupTextSett = document.querySelector('.popup__text--sett');
            const popupPass = document.querySelector('.popup-pass');
            const closeBtnPass = document.querySelector('.close-btn--pass');
            const popupTextPass = document.querySelector('.popup__text--pass');

            if (type === 'data') {
                popupSett.classList.add('show-popup');
                popupTextSett.innerHTML = `${type.toUpperCase()} updated successfully`;
            } else {
                popupPass.classList.add('show-popup');
                popupTextPass.innerHTML = `${type.toUpperCase()} updated successfully`;
            }
            // popupText.innerHTML = `${type.toUpperCase()} updated successfully`;
            window.setTimeout(() => {
                location.reload();
            }, 2000);

            closeBtnSett.addEventListener('click', () => {
                popupSett.classList.remove('show-popup');
                location.reload();
            });
            closeBtnPass.addEventListener('click', () => {
                popupPass.classList.remove('show-popup');
                location.reload();
            });
            // alert(`${type.toUpperCase()} updated successfully`)
        }

    } catch (err) {
        // alert(err.response.data.message);
        const popup = document.querySelector('.popup-sett');
        const closeBtn = document.querySelector('.close-btn');
        const popupText = document.querySelector('.popup__text');
        popupText.innerHTML = err.response.data.message;
        popup.classList.add('show-popup');
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show-popup');
            location.reload();
        });
    }
}

updateUserBtn.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.savePass').innerHTML = 'Updating...';
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);

    await updateSettings(form, 'data');
    document.querySelector('.savePass').innerHTML = 'Save settings';
});

passwordChangeBtn.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.savePass').innerHTML = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({passwordCurrent, password, passwordConfirm}, 'password');

    document.querySelector('.savePass').innerHTML = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});