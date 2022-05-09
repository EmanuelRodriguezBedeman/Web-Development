// Changes the page between light and dark mode

const osThemeDark = matchMedia("(prefers-color-scheme: dark)").matches; // Returns boolean
const element = $("body");

var currentTheme = localStorage.getItem("preferredTheme")

/* Summary:
* Checks if the user has a preferrence, if not checks the OS Theme
* and assigns that theme to the page. 
* 
* 
*/

if (currentTheme === null && osThemeDark) {
    element.addClass("dark-theme");
    moveSwitch("1.5rem");
} else if (currentTheme === "dark") {
    element.addClass("dark-theme");
    moveSwitch("1.5rem");
}

/* Summary
* Function for the switch button
* Depending how the user interacts with the theme switch
* Saves his preferrence and remembers it across the website
* And for the next time he enters the page 
*/

function themeToggle() {
    element.addClass("transition-effect");
    element.toggleClass("dark-theme");

    var currentTheme = localStorage.getItem("preferredTheme")
    
    if (currentTheme === "dark" || osThemeDark) {
        moveSwitch("0rem");
        localStorage.setItem("preferredTheme", "light");
        console.log("If executed");
    } else if (currentTheme === "light" || osThemeDark != true) {
        moveSwitch("1.5rem");
        localStorage.setItem("preferredTheme", "dark");
        console.log("else if executed");
    } 
};

// Function to move the switch when loading on of the themes.
function moveSwitch(position) {
    $("#ball").css('transform',`translateX(${position})`);
};
