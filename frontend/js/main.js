const nav = document.querySelector('.nav-mobile');
const navBtn = document.querySelector('.burger-btn');
const allNavItems = document.querySelectorAll('.nav__item');
const footerYear = document.querySelector('.footer__year');

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