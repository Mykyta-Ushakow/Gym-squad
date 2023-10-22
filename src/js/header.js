import * as main from "../main";
const menuBtn = document.querySelector('[data-menu-button]');
const menuBtnCl = document.querySelector('[data-menu-close]');
const menu = document.querySelector('.nav');
const homePageLink = document.querySelector('[data-action="honepage"]');
const favoritePageLink = document.querySelector('[data-action="favoritespage"]');
const body = document.body;
if(document.location.pathname ==="/Gym-squad/index.html"|| document.location.pathname ==="/Gym-squad"){
    homePageLink.classList.toggle('current');
}
if(document.location.pathname ==="/Gym-squad/favorite.html"){
    favoritePageLink.classList.toggle('current');
}

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    menuBtnCl.classList.toggle('active');
    body.classList.toggle('lock');

    })
menuBtnCl.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    menuBtnCl.classList.toggle('active');
    body.classList.toggle('lock');

    })
