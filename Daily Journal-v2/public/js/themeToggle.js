// Changes the page between light and dark mode

const osThemeDark = matchMedia("(prefers-color-scheme: dark)").matches; // Returns boolean
const element = $("body");

if (localStorage.getItem("preferredTheme") === "dark" || osTheme.matches) {
    element.addClass("dark-theme");
    moveSwitch("1.5rem");
} else {
    localStorage.setItem("preferredTheme", "light");
};

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

function moveSwitch(position) {
    $("#ball").css('transform',`translateX(${position})`);
};
