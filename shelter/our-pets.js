let text="SHELTER PART 3\n\tBURGER MENU 26/26\n\tSLIDER 36/36\n\tPAGINATION 36/36\n\tPOPUP 12/12\nTOTAL: 110/110\n@31ll1ax - discord";
console.log(text);

let hamburgerButton = document.getElementsByClassName("header-hamburger-button")[0];
let hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
let headerLinks = document.getElementsByClassName("header-links")[0];
let headerLink = document.getElementsByClassName("header-link");
let blur = document.getElementsByClassName("blur")[0];
let popUp = document.getElementsByClassName("popup")[0];
let popUpCloseButton = document.getElementsByClassName("popup-button")[0];

let cards = document.getElementsByClassName("card");
let paginationButtons = document.getElementsByClassName("pagination-button");

let hamburgerOpened = 1;
const hamburgerWidth = 320;
const hamburgerIconDegree = 45;

let popUpOpened = false;
let currentPage = 1;
let pageAmount = 6;
const cardAmount = 48;
let cardArray = [];



async function fetchJSONData() {
    const res = await fetch("./pets.json");
    const p = await res.json();
    return p;
}

hamburgerButton.addEventListener('click', function() { Hamburger() });
blur.addEventListener('click', function() { Hamburger(); ClosePopUp(); });
[...headerLink].forEach(element => {
    element.addEventListener('click', function() { Hamburger() });
});
paginationButtons[0].addEventListener('click', function() { PageTo(1) });
paginationButtons[1].addEventListener('click', function() { PageTo(currentPage - 1) });
paginationButtons[3].addEventListener('click', function() { PageTo(currentPage + 1) });
paginationButtons[4].addEventListener('click', function() { PageTo(pageAmount) });
[...cards].forEach(element => {
    element.addEventListener('click', function() { OpenPopUp(element.id) });
});
popUpCloseButton.addEventListener('click', function() { ClosePopUp() });

window.addEventListener('resize', function() { 
    BurgerOnResize();
    ChangePageAmount();
});

document.addEventListener("DOMContentLoaded", function(){
    ChangePageAmount();
    cardArray = MakeCardArray();
    CardUpdate();
});

function OpenPopUp(id){
    popUpOpened = true;
    ShowPopUp();
    InitPopUp(id);
    CloseYScroll();
    ShowBlur();
}
function ClosePopUp(){
    popUpOpened = false;
    HidePopUp();
    OpenYScroll();
    HideBlur();
}
function InitPopUp(id){
    (async () => {
        let pets = await fetchJSONData();
        popUp.querySelector(".popup-title").innerHTML = pets[id].name;
    popUp.querySelector(".popup-img").src = pets[id].img;
    popUp.querySelector(".popup-subtitle").innerHTML = pets[id].type + ' - ' + pets[id].breed;
    popUp.querySelector(".popup-description").innerHTML = pets[id].description;
    popUp.querySelector(".popup-stat-1").innerHTML = `<b>Age:</b> ` + pets[id].age;
    popUp.querySelector(".popup-stat-2").innerHTML = `<b>Inoculations:</b> ` + pets[id].inoculations;
    popUp.querySelector(".popup-stat-3").innerHTML = `<b>Diseases:</b> ` + pets[id].diseases;
    popUp.querySelector(".popup-stat-4").innerHTML = `<b>Parasites:</b> ` + pets[id].parasites;
    })();
}
function ShowPopUp(){
    popUp.style.display = 'block';
}
function HidePopUp(){
    popUp.style.display = 'none';
}
function MakeCardArray(){
    let array = [];
    for (let k = 0; k < 6; k++){
        let subArray = [0, 1, 2, 3, 4, 5, 6, 7];
        let lastFiveElements = array.slice(-5);
        subArray = shuffleArray(subArray, lastFiveElements);
        for (let i = 0; i < 8; i++){
            array.push(subArray[i]);
        }
    }
    return array;
}
function shuffleArray(array, lastFiveElements){
    let newArray = [];
    while(newArray.length < 8){
        const j = Math.floor(Math.random() * array.length + 1) - 1;
        let isRepeating = false;
        for (let k = 0; k < lastFiveElements.length; k++){
            if (array[j] === lastFiveElements[k]){
                isRepeating = true;
                break;
            }
        }
        if (!isRepeating) {
            lastFiveElements.push(array[j]);
            lastFiveElements.splice(0, 1);
            newArray.push(array[j]);
            array.splice(j, 1);
        }
    }
    return newArray;
}
function CardUpdate(){
    for (let i = 0; i < (48 / pageAmount); i++){
        (async () => {
            let pets = await fetchJSONData();
            cards[i].querySelector(".card-image").src = pets[cardArray[(currentPage - 1) * (48 / pageAmount) + i]].img;
            cards[i].querySelector(".card-text").innerHTML = pets[cardArray[(currentPage - 1) * (48 / pageAmount) + i]].name;
            cards[i].id = cardArray[(currentPage - 1) * (48 / pageAmount) + i];
        })();
    }
}
function PageTo(number){
    if (number >= 1 && number <= pageAmount) 
    {
        paginationButtons[2].innerHTML = number;
        currentPage = number;
        CardUpdate();
        paginationButtons[0].id = 'active-button';
        paginationButtons[1].id = 'active-button';
        paginationButtons[3].id = 'active-button';
        paginationButtons[4].id = 'active-button';
    }
    if (currentPage === 1) {
        paginationButtons[0].id = 'disabled-button';
        paginationButtons[1].id = 'disabled-button';
    }
    else if (currentPage === pageAmount) {
        paginationButtons[3].id = 'disabled-button';
        paginationButtons[4].id = 'disabled-button';
    }
}
function ChangePageAmount(){
    if (window.innerWidth >= 1280 && pageAmount !== 6){
        pageAmount = 6;
        PageTo(1);
        CardUpdate();
    }
    else if (window.innerWidth >= 768 && window.innerWidth < 1280 && pageAmount !== 8){
        pageAmount = 8;
        currentPage = 1;
        PageTo(1);
        CardUpdate();
    }
    else if (window.innerWidth >= 320 && window.innerWidth < 768 && pageAmount !== 16){
        pageAmount = 16;
        currentPage = 1;
        PageTo(1);
        CardUpdate();
    }
}
function ShowBlur(){
    blur.style.display = 'block';
}
function HideBlur(){
    blur.style.display = 'none';
}
function OpenYScroll(){
    document.documentElement.style.overflowY = "auto";
}
function CloseYScroll(){
    document.documentElement.style.overflowY = "hidden";
}
function RotateBurgerMenu(degree){
    hamburgerIcon.style.transform = `rotate(${degree}deg)`; 
}
function SetHeaderLinksMarginRight(value){
    headerLinks.style.marginRight = `${value}px`;
}
function Hamburger(){
    if(window.innerWidth <= 768){
         if (hamburgerOpened === 1){
            ShowBlur();
            CloseYScroll();
        }
        else{
            HideBlur();
            OpenYScroll();
        } 
        SetHeaderLinksMarginRight((hamburgerOpened * hamburgerWidth) - 320);
        hamburgerOpened *= -1;
        RotateBurgerMenu((hamburgerIconDegree - hamburgerOpened * hamburgerIconDegree));
    }
}
function BurgerOnResize(){
    if (window.innerWidth >= 768 && popUpOpened === false){
        HideBlur();
        OpenYScroll();
        SetHeaderLinksMarginRight(0);
        RotateBurgerMenu(0);
    }
    else if (hamburgerOpened === -1) {
        ShowBlur();
        RotateBurgerMenu(90);
        document.documentElement.style.overflowY = "hidden";
    }
    else {
        SetHeaderLinksMarginRight(-640);
    }
}

