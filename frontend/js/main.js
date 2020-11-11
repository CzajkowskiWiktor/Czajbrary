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

if(document.querySelector('.nav__el--logout')) {
    console.log('zalogowany');
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
                location.reload(true);
            }
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    logoutBtn.addEventListener('click', logout);
    logoutBtnDesktop.addEventListener('click', logout);
};




