"use strict"

var HeaderDropDownMenu = true //true opened false closed

document.addEventListener("DOMContentLoaded", function () {
    load_logo()
});

function change_theme_color() {
    if (localStorage.theme === 'dark') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem("theme", "light");
        document.getElementById("theme_mode").src = "images/light.png"
    } else{
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add('dark')
        document.getElementById("theme_mode").src = "images/dark.png"
    }
}
function load_theme_color() {
    if (localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark')
    }
    else {
        document.documentElement.classList.remove('dark')
    }
}load_theme_color()

function load_logo() {
    if (localStorage.theme === 'dark') {
        document.getElementById("theme_mode").src = "images/dark.png"
    }
    else {
        document.getElementById("theme_mode").src = "images/light.png"
    }
}

function DropDownMenu(dropdownMenuID, dropdownButtonID) {
    const dropdownMenu = document.getElementById(dropdownMenuID)
    const dropdownButton = document.getElementById(dropdownButtonID)
    document.addEventListener('click', function (event) {
        var target = event.target
        if(!dropdownMenu.contains(target) && !dropdownButton.contains(target)) {
            dropdownMenu.classList.remove('transition', 'ease-out','duration-200');
            dropdownMenu.classList.add('transition', 'ease-in','duration-150');
            dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
            dropdownMenu.classList.add('opacity-0', 'translate-y-1');
            // make the transition finish (if fixed transition doesn't works, absolute does work)
            sleep(150).then(() => {
                dropdownMenu.classList.remove('absolute');
                dropdownMenu.classList.add('fixed')
            });
            HeaderDropDownMenu = true
        }
      });
    if(HeaderDropDownMenu) {
        dropdownMenu.classList.add('transition', 'ease-out','duration-200');
        dropdownMenu.classList.remove('transition', 'ease-in','duration-150');
        dropdownMenu.classList.remove('opacity-0', 'translate-y-1', 'fixed');
        dropdownMenu.classList.add('opacity-100', 'translate-y-0', 'absolute');
        HeaderDropDownMenu = false
    }
    else {
        dropdownMenu.classList.remove('transition', 'ease-out','duration-200');
        dropdownMenu.classList.add('transition', 'ease-in','duration-150');
        dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
        dropdownMenu.classList.add('opacity-0', 'translate-y-1');
        // make the transition finish (if fixed transition doesn't works, absolute does work)
        sleep(150).then(() => {
            dropdownMenu.classList.remove('absolute');
            dropdownMenu.classList.add('fixed')
        });
        HeaderDropDownMenu = true
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }