// This script changes the page between light and dark mode

const osThemeDark = matchMedia("(prefers-color-scheme: dark)").matches; // Returns boolean
const element = $("body");
let preferenceTheme = localStorage.getItem("preferenceTheme");

/* Summary:
* Checks if the user has a preferrence, if not checks the OS Theme
* and assigns that theme to the page. 
* 
* 
*/

if (preferenceTheme === null && osThemeDark || preferenceTheme === "dark") {
    element.addClass("dark-theme");
    moveSwitch("1.5", "dark");
} else {
    moveSwitch("0", "light");
};

/* Summary:
* Function for the switch button
* Depending how the user interacts with the theme switch
* Saves his preferrence and remembers it across the website
* And for the next time he enters the page 
*/

function themeToggle() {

    element.toggleClass("dark-theme");

    let preferenceTheme = localStorage.getItem("preferenceTheme")

    if (element.hasClass("transition-effect") === false) {
        element.addClass("transition-effect")
    };
 
    if (preferenceTheme === "dark") {
        moveSwitch("0", "light");
    } else if (preferenceTheme === "light" || osThemeDark != true) {
        moveSwitch("1.5", "dark");
    };
};

// Function to move the switch when loading one of the themes.
function moveSwitch(position, theme) {
    $("#ball").css('transform',`translateX(${position}rem)`);
    localStorage.setItem("preferenceTheme", theme);
};
