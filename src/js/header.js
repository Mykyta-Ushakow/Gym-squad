import * as main from "../main";
const menuBtn = document.querySelector('[data-menu-open]');
const menuBtnCl = document.querySelector('[data-menu-close]');
const menu = document.querySelector('.nav');
const homePageLink = document.querySelector('[data-action="honepage"]');
const favoritePageLink = document.querySelector('[data-action="favoritespage"]'); 
const menuBackdrope = document.querySelector('.menuBackdrope'); 
const body = document.body;


if(document.location.pathname ==="/Gym-squad/index.html"|| document.location.pathname ==="/Gym-squad/"){
    homePageLink.classList.toggle('current');
}
if(document.location.pathname ==="/Gym-squad/favorite.html"){
    favoritePageLink.classList.toggle('current');
}

document.addEventListener("keydown", event => {
    if (event.key === 'Escape') {
        closMenu();
    }
});
menuBtnCl.addEventListener('click', closMenu);

menuBtn.addEventListener('click', () => {
    menu.classList.add('active');
    menuBtn.classList.add('is-hidden');
    menuBtnCl.classList.remove('is-hidden');
    body.classList.add('lock');
    menuBackdrope.classList.add('active');

})
function closMenu() {
    menu.classList.remove('active');
    menuBtn.classList.remove('is-hidden');
    menuBtnCl.classList.add('is-hidden');
    body.classList.remove('lock');
    menuBackdrope.classList.remove('active');
}
menuBackdrope.addEventListener("click", funk);
    
function funk(ev) {
        if (ev.target.classList[0] === 'menuBackdrope') {
        closMenu();
    }
}
