// Changes the page between light and dark mode

const osThemeDark = matchMedia("(prefers-color-scheme: dark)").matches; // Returns boolean
const element = $("body");

/* Summary:
* Checks if the user has a theme preferrence or his OS theme
* After that, sets the right theme for him 
*/

if (localStorage.getItem("preferredTheme") === "dark" || osTheme.matches) {
    element.addClass("dark-theme");
    moveSwitch("1.5rem");
} else {
    localStorage.setItem("preferredTheme", "light");
};

/* Summary
* Function for the switch button
* Depending how the user interacts with the theme switch
* Saves his preferrence and remembers it across the website
* And for the next time he enters the page 
*/

function themeToggle() {
    element.addClass("transition-effect");
    element.toggleClass("dark-theme");

    if (localStorage.getItem("preferredTheme") === "dark") {
        moveSwitch("0rem");
        localStorage.setItem("preferredTheme", "light");
    } else {
        moveSwitch("1.5rem");
        localStorage.setItem("preferredTheme", "dark");
    }
};


// Function to move the switch when loading on of the themes.
function moveSwitch(position) {
    $("#ball").css('transform',`translateX(${position})`);
};
