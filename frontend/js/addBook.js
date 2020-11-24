const title = document.querySelector('#title');
const author = document.querySelector('#author');
const genre = document.querySelector('#genre');
const language = document.querySelector('#language');
const year = document.querySelector('#year');
const read = document.querySelector('#read');
const description = document.querySelector('#description');
const photo = document.querySelector('#photo');
const sendBtn = document.querySelector('.send');
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


const checkErrors = async () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++;
        }
    })

    if(errorCount === 0) {
        const form = new FormData();
        form.append('title', document.getElementById('title').value);
        form.append('author', document.getElementById('author').value);
        form.append('genre', document.getElementById('genre').value);
        form.append('language', document.getElementById('language').value);
        form.append('year', document.getElementById('year').value);
        form.append('read', document.getElementById('read').value);
        form.append('description', document.getElementById('description').value);
        form.append('imageCover', document.getElementById('imageCover').files[0]);
        addNewBook(form);
    }
};

const addNewBook = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/books',
            data
            // data: {
            //     title,
            //     author,
            //     genre,
            //     language,
            //     year,
            //     read,
            //     imageCover,
            //     description
            // }
        });

        if(res.data.status === 'success') {
            popup.classList.add('show-popup');
            window.setTimeout(() => {
                location.assign('/');
            }, 5000);

            closeBtn.addEventListener('click', () => {
                popup.classList.remove('show-popup');
                location.assign('/');
            });
        }
        console.log(res);
    } catch (err) {
        popupText.innerHTML = err.response.data.message;
        popup.classList.add('show-popup');
        closeBtn.addEventListener('click', () => {
            // e.preventDefault();
            popup.classList.remove('show-popup');
            location.reload();
        });
    }
}

document.querySelector('.form-createBook').addEventListener('submit', async e => {
    e.preventDefault();
    checkForm([title, author, genre, year, read, description]);
    checkErrors();
    // if(err) {
    //     console.log('bez bledow');
    //     document.querySelector('.addBook').innerHTML = 'Adding...';
    //     const form = new FormData();
    //     form.append('title', document.getElementById('title').value);
    //     form.append('author', document.getElementById('author').value);
    //     form.append('genre', document.getElementById('genre').value);
    //     form.append('language', document.getElementById('language').value);
    //     form.append('year', document.getElementById('year').value);
    //     form.append('read', document.getElementById('read').value);
    //     form.append('description', document.getElementById('description').value);
    //     form.append('imageCover', document.getElementById('photo').files[0]);
    //     console.log(form);

    //     await addNewBook(form);

    //     document.querySelector('.addBook').innerHTML = 'Add book';
    //     document.getElementById('title').value = '';
    //     document.getElementById('author').value = '';
    //     document.getElementById('genre').value = '';
    //     document.getElementById('year').value = '';
    //     document.getElementById('read').value = '';
    //     document.getElementById('description').value = '';
    // } else {
    //     console.log('blad');
    // }

});


// const login = async (email, password) => {
//     try {
//         const result = await axios({
//             method: 'POST',
//             url: 'http://127.0.0.1:4000/api/v1/users/login',
//             data: {
//                 email,
//                 password
//             }
//         });

//         if(result.data.status === 'success') {
//             popup.classList.add('show-popup');
//             window.setTimeout(() => {
//                 location.assign('/');
//             }, 2000);

//             closeBtn.addEventListener('click', () => {
//                 popup.classList.remove('show-popup');
//                 location.assign('/');
//             });
//         }

//         console.log(result);
//     } catch (err) {
//         popupText.innerHTML = err.response.data.message;
//         popup.classList.add('show-popup');
//         closeBtn.addEventListener('click', () => {
//             popup.classList.remove('show-popup');
//             location.reload();
//         });
//     }
// };

// const logout = async () => {
//     try {
//         const res = await axios({
//             method: 'GET',
//             url: 'http://127.0.0.1:3000/api/v1/users/logout'
//         })
//         if (res.data.status === 'success') location.assign('/');
//     } catch (err) {
//         alert('Error logging out! Try again.');
//     }
// };


// if(logoutBtn) logoutBtn.addEventListener('click', logout);
