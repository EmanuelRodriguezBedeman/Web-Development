// Changes the page between light and dark mode
// TO DO: Add code to check the user's theme site preference. Fow now it just loads the default OS theme.

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
    $("div.ball").click();
} else {
    console.log("Hi!");
}

function themeToggle() {
    $("body").toggleClass("dark-theme");
}
