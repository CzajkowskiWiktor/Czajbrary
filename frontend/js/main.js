const nav = document.querySelector('.nav-mobile');
const logoBtn = document.querySelector('.logo');
const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav__item');
const footerYear = document.querySelector('.footer__year');
// let {loggedIn} = require('./login');

const handleNav = () => {
    nav.classList.toggle('nav-mobile--active');

    allNavItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('nav-mobile--active');
        })
    });
    handleNavItemsAnim();
};

const handleNavItemsAnim = () => {
    let delayTime = 0;

    allNavItems.forEach(item => {
        item.classList.toggle('nav-items-anim');
        item.style.animationDelay = '.' + delayTime + 's';
        delayTime++;
    });
};

const currentYear = () => {
    const year = (new Date).getFullYear();
    footerYear.innerText = year;
}
currentYear();

navBtn.addEventListener('click', handleNav);
logoBtn.addEventListener('click', () => {
    nav.classList.remove('nav-mobile--active');
});

if(document.querySelector('.logoutBtn')) {
    // console.log('zalogowany');
    const logoutBtn = document.querySelector('.nav__el--logout');
    const logoutBtnDesktop = document.querySelector('.nav__el--logout-desktop');

    //logout
    const logout = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:4000/api/v1/users/logout',
            });

            if(res.data.status === 'success') {
                location.assign('/');
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    logoutBtn.addEventListener('click', logout);
    logoutBtnDesktop.addEventListener('click', logout);
};

const createReview = async (bookId, review, rating) => {
    try {
        const book = bookId;
        const url = 'http://127.0.0.1:4000/api/v1/reviews';
        const res = await axios({
            method: 'POST',
            url,
            data: {
                review,
                rating,
                book
            }
        });

        if(res.data.status === 'success') {
            const popup = document.querySelector('.popup');
            const closeBtn = document.querySelector('.close-btn');
            popup.classList.add('show-popup');
            window.setTimeout(() => {
                location.reload();
            }, 2000);
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('show-popup');
                location.reload();
            });
        }
    } catch (err) {
        const popup = document.querySelector('.popup');
        const closeBtn = document.querySelector('.close-btn');
        const popupText = document.querySelector('.popup__text');
        popupText.innerHTML = err.response.data.message;
        popup.classList.add('show-popup');
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show-popup');
            location.reload();
        });
    }
};

if(document.querySelector('.book-reviews__addReview-btn')) {
    const addReviewBtn = document.querySelector('.book-reviews__addReview-btn');
    const closeReviewBtn = document.querySelector('.close');
    const saveReviewBtn = document.querySelector('.form__group-btn');

    addReviewBtn.addEventListener('click', () => {
        document.querySelector('.book-reviews__reviewForm').style.display='flex';
    });

    closeReviewBtn.addEventListener('click', () => {
        document.querySelector('.book-reviews__reviewForm').style.display='none';
    });

    saveReviewBtn.addEventListener('click', async e => {
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        const bookId = e.target.dataset.bookId;
        await createReview(bookId, review, rating);
        // document.querySelector('.book-reviews__reviewForm').style.display='none';
    });
}




