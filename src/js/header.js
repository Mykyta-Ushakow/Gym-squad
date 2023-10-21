import * as main from "../main";
const menuBtn = document.querySelector('[data-menu-button]');
const menu = document.querySelector('.nav');
const menuBtnCl = document.querySelector('.menu-close');
const menuBtnOp = document.querySelector('.menu-open');
const homePageLink = document.querySelector('[data-action="honepage"]');
const favoritePageLink = document.querySelector('[data-action="favoritespage"]');
const body = document.body;
if(document.location.pathname ==="/index.html"|| document.location.pathname ==="/"){
homePageLink.classList.toggle('current')
}
if(document.location.pathname ==="/favorite.html"){
favoritePageLink.classList.toggle('current')
}
console.dir(document);

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    body.classList.toggle('lock');

    })
