let text="SHELTER PART 3";
console.log(text);

let hamburgerButton = document.getElementsByClassName("header-hamburger-button")[0];
let hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
let headerLinks = document.getElementsByClassName("header-links")[0];
let headerLink = document.getElementsByClassName("header-link");
let blur = document.getElementsByClassName("blur")[0];

let cards = document.getElementsByClassName("card");
let paginationButtons = document.getElementsByClassName("pagination-button");

let hamburgerOpened = 1;
const hamburgerWidth = 320;
const hamburgerIconDegree = 45;

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
blur.addEventListener('click', function() { Hamburger() });
[...headerLink].forEach(element => {
    element.addEventListener('click', function() { Hamburger() });
});
paginationButtons[0].addEventListener('click', function() { PageTo(1) });
paginationButtons[1].addEventListener('click', function() { PageTo(currentPage - 1) });
paginationButtons[3].addEventListener('click', function() { PageTo(currentPage + 1) });
paginationButtons[4].addEventListener('click', function() { PageTo(pageAmount) }); //TODO: replace 6 with 6/8/16

window.addEventListener('resize', function() { 
    BurgerOnResize();
    ChangePageAmount();
});

document.addEventListener("DOMContentLoaded", function(){
    ChangePageAmount();

    cardArray = MakeCardArray();
    CardUpdate();
    console.log(cardArray);
});

function MakeCardArray(){
    let array = [];
    for (let k = 0; k < 6; k++){
        let subArray = [0, 1, 2, 3, 4, 5, 6, 7];
        subArray = shuffleArray(subArray);
        for (let i = 0; i < 8; i++){
            array.push(subArray[i]);
        }
    }
    return array;
}
function shuffleArray(array){ //TODO: Shuffle is wrong
    let newArray = [];
    for (let i = 0; i < 8; i++){
        const j = Math.floor(Math.random() * array.length + 1) - 1;
        newArray[i] = array[j];
        array.splice(j, 1);
    }
    return newArray;
}
function CardUpdate(){
    for (let i = 0; i < (48 / pageAmount); i++){
        (async () => {
            let pets = await fetchJSONData();
            cards[i].querySelector(".card-image").src = pets[cardArray[(currentPage - 1) * (48 / pageAmount) + i]].img;
            cards[i].querySelector(".card-text").innerHTML = pets[cardArray[(currentPage - 1) * (48 / pageAmount) + i]].name;
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
    if (window.innerWidth >= 768){
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

// let prevSlider = [];
// let currSlider = [];

// document.addEventListener("DOMContentLoaded", function(){
    // amountOfCardsShown = SetAmountOfCardsShown();
    // InitRandomCardIds();
    // console.log(currSlider);
    // let cards = document.getElementsByClassName("card");
    // for (let i = 0; i < 3; i++){
    //     cards[currSlider[i]].style.display = 'block';
    // }
// });
// function InitRandomCardIds(){
//     prevSlider = currSlider;
//     currSlider = [];
//     while (currSlider.length < 3){
//         let random = Math.floor(Math.random() * 8);
//         if (!currSlider.includes(random)){
//             currSlider.push(random);
//         }
//     }
// }
// function SetAmountOfCardsShown(){
//     if (window.innerWidth > 768){ return 3; }
//     else if (window.innerWidth > 320){ return 2; }
//     else { return 1; }
// }

function Slider(){}
function Pagination(){}
function PopUp(){}
