let text="SHELTER PART 3";
console.log(text);

let hamburgerButton = document.getElementsByClassName("header-hamburger-button")[0];
let hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
let headerLinks = document.getElementsByClassName("header-links")[0];
let headerLink = document.getElementsByClassName("header-link");
let blur = document.getElementsByClassName("blur")[0];

let hamburgerOpened = 1;
const hamburgerWidth = 320;
const hamburgerIconDegree = 45;
let amountOfCardsShown = 3;
const totalCards = 8;
// let pets = fetch('../assets/js/pets.json')
//   .then(response => response.json())
//   .then(jsonData => console.log(jsonData));


function fetchJSONData() {
    fetch("./pets.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
              console.log(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
fetchJSONData();


hamburgerButton.addEventListener('click', function() { Hamburger() });
blur.addEventListener('click', function() { Hamburger() });
[...headerLink].forEach(element => {
    element.addEventListener('click', function() { Hamburger() });
});

window.addEventListener('resize', function() { 
    BurgerOnResize();
});
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
