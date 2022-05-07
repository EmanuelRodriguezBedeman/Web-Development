// Changes the page between light and dark mode
// TO DO: Add code to check the user's theme site preference. Fow now it just loads the default OS theme.

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

var lenTransition = 1.5

if (prefersDarkScheme.matches) {
    $("body").toggleClass("transition-effect dark-theme");
    $("#ball").css('transform',`translateX(${lenTransition}rem)`);
};

function themeToggle() {
    $("body").addClass("transition-effect");
    $("body").toggleClass("dark-theme");

    if (lenTransition === 1.5) {
        lenTransition = 0
        $("#ball").css('transform',`translateX(${lenTransition}rem)`);       
    } else if (lenTransition === 0) {
        lenTransition = 1.5
        $("#ball").css('transform',`translateX(${lenTransition}rem)`);
    }
};
