/*! dyode-test v0.0.1 | (c) 2020 Michael Roberts | MIT License | https://github.com/surfwoodroad/DYODE-test */
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
document.addEventListener("DOMContentLoaded", (function(){
	
	// fixed header code
    var scrollPosition = window.scrollY;
	var body = document.querySelector('body');
	var headerNav = document.querySelector('header.header');
	var headerSpacer = document.querySelector('.header_spacer');
	var announcement = document.querySelector('.announcement');
	var annc_height = announcement.offsetHeight;
	var header_height = headerNav.offsetHeight;

window.addEventListener('scroll', (function() {

	scrollPosition = window.scrollY;
	
	
	if (scrollPosition >= annc_height) {
		body.classList.add('page--scrolled');
		headerSpacer.style.height = header_height + 'px';
    } else if (scrollPosition < annc_height) {
        body.classList.remove('page--scrolled');
		headerSpacer.style.height = 0;
    }

}));

// END fixed header code

// hamburger nav code

var hamburgerBtn = document.querySelector('.hamburger');
var hamburgerMenu = document.querySelector('.main_nav');
hamburgerBtn.addEventListener('click', (function(e) {
    e.preventDefault();
    if (hamburgerMenu.classList.contains('menu-display')) {
        hamburgerMenu.classList.remove('menu-display');
        hamburgerBtn.classList.remove('make-x');
      } else {
        hamburgerMenu.classList.add('menu-display');
        hamburgerBtn.classList.add('make-x');
      }
}));

var regularMenuItem = document.querySelector('.main_nav');

regularMenuItem.addEventListener('click', (function() {
    var hamburgerMenuItem = document.querySelector('.main_nav.menu-display a');
    if (hamburgerMenuItem) {
        hamburgerMenu.classList.remove('menu-display');
        hamburgerBtn.classList.remove('make-x');
    }
}));

// END hamburger nav code


// footer accordion links for mobile
var footer = document.querySelector('footer');
var ulOne, ulTwo;

function getHeight(el) {
	if ( el.matches('.second') ) {
		return ulTwo;
	} else {
		return ulOne;
	}
}

function footerAccordion(e) {
	e.preventDefault();
	// get the element
	if (!event.target.matches('.footer-fancy') && !event.target.matches('.plus')) return;

	var hdr = e.target.closest('.footer-fancy');
	var hdrPlus = hdr.querySelector('.plus');
	var hdrPlusVal = hdr.querySelector('.plus').innerText;

	// get the UL
	var ul = hdr.nextElementSibling;

	// get its parent
	var parentDiv = ul.closest('.footer-links');

	// get the height needed to animate
	var height = getHeight(parentDiv);

	//check if it's collapsed or not
	ul.offsetHeight > 0 ? ul.style.height= 0 : ul.style.height = height + 'px';
	hdrPlusVal == '+' ? hdrPlus.innerText = '-' : hdrPlus.innerText = '+';
}


// set up accordion for small screens
function checkScreen() {
	if (window.screen.width <= 900) {
		// get the heights of the ULs so we can animate the height
		ulOne = footer.querySelector('.footer-links ul').offsetHeight;
		ulTwo = footer.querySelector('.footer-links.second ul').offsetHeight;
		// this will hide the second list and set up some styles
		footer.classList.add('accordion');
		// call the accordion
		footer.addEventListener('click', footerAccordion);
	} else {
		footer.classList.remove('accordion');
	}
}
checkScreen();
window.onresize = checkScreen;
// END footer accordion links for mobile



}));

