"use strict"

var HeaderDropDownMenu = true //true opened false closed
var wifi_signal = 2

document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.pathname.includes("login.html")) {
        load_logo()
        load_wifi()
    }
});

function change_theme_color() {
    if (localStorage.theme === 'dark') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem("theme", "light");
        document.getElementById("theme_mode").src = "images/light.png"
        document.getElementById("theme_mode_Mobile_Menu").src = "images/light.png"
        document.getElementById("wifi").src = "images/"+wifi_signal+"_wifi_black.png"
    } else{
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add('dark')
        document.getElementById("theme_mode").src = "images/dark.png"
        document.getElementById("theme_mode_Mobile_Menu").src = "images/dark.png"
        document.getElementById("wifi").src = "images/"+wifi_signal+"_wifi_white.png"
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
        document.getElementById("theme_mode_Mobile_Menu").src = "images/dark.png"
    }
    else {
        document.getElementById("theme_mode").src = "images/light.png"
        document.getElementById("theme_mode_Mobile_Menu").src = "images/light.png"
    }
}
function load_wifi() {
    if (localStorage.theme === 'dark') {
        document.getElementById("wifi").src = "images/"+wifi_signal+"_wifi_white.png"
    }
    else {
        document.getElementById("wifi").src = "images/"+wifi_signal+"_wifi_black.png"
    }
}

function DropDownMenu(dropdownMenuID, dropdownButtonID, from, to, IsMobileMenu = false, ArrowID) {
    const dropdownMenu = document.getElementById(dropdownMenuID)
    const dropdownButton = document.getElementById(dropdownButtonID)
    const arrow = document.getElementById(ArrowID)
    if(!IsMobileMenu) {
        document.addEventListener('click', function (event) {
            var target = event.target
            if(!dropdownMenu.contains(target) && !dropdownButton.contains(target)) {
                dropdownMenu.classList.remove('transition', 'ease-out','duration-200');
                dropdownMenu.classList.add('transition', 'ease-in','duration-150');
                dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
                dropdownMenu.classList.add('opacity-0', 'translate-y-1');
                // make the transition finish (if fixed transition doesn't works, absolute does work)
                arrow.classList.remove("rotate-180")
                sleep(150).then(() => {
                    dropdownMenu.classList.remove(to);
                    dropdownMenu.classList.add(from)
                });
                arrow.classList.remove("rotate-180")
                HeaderDropDownMenu = true
            }
          });
    }
    if(HeaderDropDownMenu) {
        dropdownMenu.classList.add('transition', 'ease-out','duration-200');
        dropdownMenu.classList.remove('transition', 'ease-in','duration-150');
        dropdownMenu.classList.remove('opacity-0', 'translate-y-1', from);
        if(!IsMobileMenu) {
            dropdownMenu.classList.add('opacity-100', 'translate-y-0', to);
        }
        else dropdownMenu.classList.add('opacity-100', 'translate-y-0');
        arrow.classList.add("rotate-180")
        HeaderDropDownMenu = false
    }
    else {
        dropdownMenu.classList.remove('transition', 'ease-out','duration-200');
        dropdownMenu.classList.add('transition', 'ease-in','duration-150');
        dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
        dropdownMenu.classList.add('opacity-0', 'translate-y-1');
        arrow.classList.remove("rotate-180")
        // make the transition finish (if fixed transition doesn't works, absolute does work)
        sleep(150).then(() => {
            if(!IsMobileMenu) {
                dropdownMenu.classList.remove(to);
            }
            dropdownMenu.classList.add(from)
        });
        HeaderDropDownMenu = true
    }
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function CloseMobileMenu() {
    var mobilemenu = document.getElementById("MobileMenu")
    mobilemenu.classList.add("hidden")
    var dropdownMenu = document.getElementById("MobileMenuDropdown")
    var arrow = document.getElementById("MobileMenuArrow")
    dropdownMenu.classList.remove('transition', 'ease-out','duration-200');
    dropdownMenu.classList.add('transition', 'ease-in','duration-150');
    dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
    dropdownMenu.classList.add('opacity-0', 'translate-y-1');
    arrow.classList.remove("rotate-180")
        // make the transition finish (if fixed transition doesn't works, absolute does work)
    sleep(150).then(() => {
        dropdownMenu.classList.add('hidden')
    });
    HeaderDropDownMenu = true
  }

  function OpenMobileMenu() {
    var mobilemenu = document.getElementById("MobileMenu")
    mobilemenu.classList.remove("hidden")
  }

function checkScreenSize() {
    const isMobileView = window.matchMedia('(max-width: 1023px)').matches;

    if (isMobileView && localStorage.getItem("screen_mode") != "mobile") {
        localStorage.setItem("screen_mode", "mobile");
        location.reload()
    }
    else if (!isMobileView && localStorage.getItem("screen_mode") != "desktop") {
        localStorage.setItem("screen_mode", "desktop");
        location.reload()
    }
}

// Attach the checkScreenSize function to the resize event
window.addEventListener('resize', checkScreenSize);

// Call the function on initial page load
checkScreenSize();