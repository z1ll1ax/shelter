let text="SHELTER PART 3";
console.log(text);

let hamburgerButton = document.getElementsByClassName("header-hamburger-button")[0];
let headerLinks = document.getElementsByClassName("header-links")[0];
let hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
let hamburgerOpened = 1;
const hamburgerWidth = 320;
const hamburgerIconDegree = 45;
let blur = document.getElementsByClassName("blur")[0];

hamburgerButton.addEventListener('click', function() { Hamburger() });
blur.addEventListener('click', function() { Hamburger() });
let headerLink = document.getElementsByClassName("header-link");
[...headerLink].forEach(element => {
    element.addEventListener('click', function() { Hamburger() });
});

window.addEventListener('resize', function() { 
    console.log(hamburgerOpened);
    if (window.innerWidth >= 768){
        blur.style.display = 'none';
        document.documentElement.style.overflowY = "auto";
        headerLinks.style.marginRight = `0px`;
        hamburgerIcon.style.transform = `rotate(0deg)`; 
    }
    else if (hamburgerOpened === -1) {
        blur.style.display = 'block';
        hamburgerIcon.style.transform = `rotate(90deg)`; 
    }
    else {
        headerLinks.style.marginRight = `-640px`;
    }
});
    
function Hamburger(){
    if(window.innerWidth <= 768){
         if (hamburgerOpened === 1){
            blur.style.display = 'block';
            document.documentElement.style.overflowY = "hidden";
        }
        else{
            blur.style.display = 'none';
            document.documentElement.style.overflowY = "auto";
        } 
        headerLinks.style.marginRight = (hamburgerOpened * hamburgerWidth) - 320 + `px`;
        hamburgerOpened *= -1;
        hamburgerIcon.style.transform = `rotate(` + (hamburgerIconDegree - hamburgerOpened * hamburgerIconDegree) + `deg)`; 
    }
}
function Slider(){}
function Pagination(){}
function PopUp(){}
