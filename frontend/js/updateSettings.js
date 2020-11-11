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
            alert(`${type.toUpperCase()} updated successfully`)
        }

    } catch (err) {
        alert(err.response.data.message);
    }
}

updateUserBtn.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.savePass').innerHTML = 'Updating...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    await updateSettings({name, email}, 'data');
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