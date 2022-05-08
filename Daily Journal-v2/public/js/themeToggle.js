// Changes the page between light and dark mode

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const element = $("body")

if (prefersDarkScheme.matches) {
    element.toggleClass("dark-theme");
    moveSwitch("1.5rem")
};

function themeToggle() {
    element.addClass("transition-effect");
    element.toggleClass("dark-theme");

    if (element.hasClass("dark-theme")) {
        moveSwitch("1.5rem")
    } else {
        moveSwitch("0rem")
    }
};

function moveSwitch(position) {
    $("#ball").css('transform',`translateX(${position})`);
}

/*
TO DO:
* Check the user's OS theme only on first conection
* After that, check how the user's chosen theme by interacting with the switch
* Save the behavior inside a variable to keep track of it and mantain the selection though the whole page. 
*/
