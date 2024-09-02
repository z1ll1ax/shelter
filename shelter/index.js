let text="SHELTER PART 3\n\tBURGER MENU 26/26\n\tSLIDER 0/36\n\tPAGINATION 36/36\n\tPOPUP 12/12\nTOTAL: 74/110";
console.log(text);

let hamburgerButton = document.getElementsByClassName("header-hamburger-button")[0];
let hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
let headerLinks = document.getElementsByClassName("header-links")[0];
let headerLink = document.getElementsByClassName("header-link");
let blur = document.getElementsByClassName("blur")[0];
let popUp = document.getElementsByClassName("popup")[0];
let popUpCloseButton = document.getElementsByClassName("popup-button")[0];
let petsSliderLeft = document.getElementsByClassName("pets-slider-left-button")[0];
let petsSliderRight = document.getElementsByClassName("pets-slider-right-button")[0];

let cards = document.getElementsByClassName("card");

let hamburgerOpened = 1;
let cardsSwiped = false; //false - 1-3, true 4-6 shown
const hamburgerWidth = 320;
const hamburgerIconDegree = 45;

let popUpOpened = false;

const cardsAmount = 3;

async function fetchJSONData() {
    const res = await fetch("./pets.json");
    const p = await res.json();
    return p;
}

hamburgerButton.addEventListener('click', function() { Hamburger() });

petsSliderLeft.addEventListener('click', function() { moveSliderLeft() });
petsSliderRight.addEventListener('click', function() { moveSliderRight() });

blur.addEventListener('click', function() { Hamburger(); ClosePopUp(); });
[...headerLink].forEach(element => {
    element.addEventListener('click', function() { Hamburger() });
});

[...cards].forEach(element => {
    element.addEventListener('click', function() { OpenPopUp(element.id) });
});
popUpCloseButton.addEventListener('click', function() { ClosePopUp() });

window.addEventListener('resize', function() { 
    BurgerOnResize();
});

document.addEventListener("DOMContentLoaded", function(){
    initSlider();
});

let prevSlider = [];
let currSlider = [];
let prevAction = 0;
function initSlider(){
    currSlider = threeRandomCards();
    CardUpdate();
}
//TODO: no animation on slider
function moveSliderLeft(){
    if (prevAction === 1){
        //to prevSlider
        let temp = currSlider;
        currSlider = prevSlider;
        prevSlider = temp;
    }
    else {
        prevSlider = currSlider;
        currSlider = threeRandomCards();
        //randomthree except previous
    }
    let cardContainer = document.querySelector('.pets-card-container');
    //cardContainer.style.transform = 'translateX(1080px)';
    //setTimeout(() => { 
    for (let i = cardsAmount * cardsSwiped; i < cardsAmount + cardsAmount * cardsSwiped; i++){
        cards[i].classList.add('hide');
        cards[i + cardsAmount - (2 * cardsAmount * cardsSwiped)].classList.remove('hide');
    }
    //}, 1000);
        //cardContainer.style.transform = 'translateX(0px)';
    
    cardsSwiped = !cardsSwiped;
    
    CardUpdate();
    prevAction = -1;
}
function moveSliderRight(){
    if (prevAction === -1){
        //to prevSlider
        let temp = currSlider;
        currSlider = prevSlider;
        prevSlider = temp;
   }
   else {
       prevSlider = currSlider;
       currSlider = threeRandomCards();
       //randomthree except previous
   }
    for (let i = cardsAmount * cardsSwiped; i < cardsAmount + cardsAmount * cardsSwiped; i++){
        cards[i].classList.add('hide');
        cards[i + cardsAmount - (2 * cardsAmount * cardsSwiped)].classList.remove('hide');
    }
    cardsSwiped = !cardsSwiped;
    CardUpdate();
    prevAction = 1;
}
function CardUpdate(){
    for (let i = cardsAmount * cardsSwiped; i < cardsAmount + cardsAmount * cardsSwiped; i++){
        (async () => {
            let pets = await fetchJSONData();
            cards[i].querySelector(".card-text").innerHTML = pets[currSlider[i - cardsAmount * cardsSwiped]].name;
            cards[i].querySelector(".card-image").src = pets[currSlider[i - cardsAmount * cardsSwiped]].img;
            cards[i].id = currSlider[i - cardsAmount * cardsSwiped];
        })();
    }
}
function threeRandomCards(){
    let randomArray = [0, 1, 2, 3, 4, 5, 6, 7];
    let newArray = [];
    while(newArray.length < cardsAmount){
        const j = Math.floor(Math.random() * randomArray.length + 1) - 1;
        let existed = false;
        for (let i = 0; i < prevSlider.length; i++){
            if (prevSlider[i] === randomArray[j]) {
                existed = true;
                break;
            }
        }
        if (!existed){
            newArray.push(randomArray[j]);
            randomArray.splice(j, 1);
        }
    }
    return newArray;
}
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

