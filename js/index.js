// Inject current year into copyright footnote on DOM Load
window.addEventListener('DOMContentLoaded', (e) => {
  const currentYear = new Date().getFullYear();
  document.querySelector('.footer__year').innerHTML = `&copy; ${currentYear}`;
});

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const accordionButtons = document.querySelectorAll('.accordion__button');

// Tracks previous scroll position - value is set by hideHeader()
let prevScrollPos = window.pageYOffset;

// Event handlers
const hideHeaderOnScrollDown = () => {
  const currentScrollPos = window.pageYOffset;
  const header = document.querySelector('header');

  if (prevScrollPos > currentScrollPos) {
    // Reveal header on scroll up
    header.style.top = 0;
  } else {
    // Prevent header scroll if side navigation is open
    if (document.body.classList.contains('nav-open')) return;

    // Hide header on scroll down
    header.style.top = header.offsetHeight * -1 + 'px';
  }

  prevScrollPos = currentScrollPos;
};

const toggleNav = () =>
  ['nav-open', 'prevent-scroll'].forEach((htmlClass) =>
    document.body.classList.toggle(htmlClass)
  );

const closeNav = () =>
  ['nav-open', 'prevent-scroll'].forEach((htmlClass) =>
    document.body.classList.remove(htmlClass)
  );

/** __ Accordion __
 * When "accordionButton" is clicked:
 * Show immediate-sibling "accordionContent" --> set maxHeight to "max-content"
 * hide non-immediate-sibling "accordionContent" --> set maxHeight to 0
 */

const toggleAccordionContent = (e) => {
  // Get accordion button that was clicked
  const toggledButton = e.target;
  const activeClassName = 'accordion__button--active';

  // Clear outline on click (remains visible on tab)
  toggledButton.blur();

  // Set styles for content related to toggledButton; via toggling HTML class
  // -- without class: hide content (default)
  // -- with class: show content
  toggledButton.classList.toggle(activeClassName);

  // Remove active class from non-toggled accordionButtons
  // -- ensures content is only shown relative to toggledButton
  [...accordionButtons]
    .filter((button) => button !== toggledButton)
    .forEach((button) => {
      button.classList.remove(activeClassName);
    });

  // Scroll to top of ACTIVE accordionButton
  // -- Reference: https://stackoverflow.com/questions/49820013/javascript-scrollintoview-smooth-scroll-and-offset
  if (window.matchMedia('(max-width: 768px)').matches) {
    // Calculate amount to offset from from scroll position
    const offsetFromHeader = 20;
    const offset =
      document.querySelector('header').scrollHeight + offsetFromHeader;

    const bodyRect = document.body.getBoundingClientRect();
    const toggledButtonRect = toggledButton.getBoundingClientRect();
    //   console.log({ left: toggledButtonRect.left, top: toggledButtonRect.top });
    const scrollPosition = toggledButtonRect.top - bodyRect.top - offset;

    window.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: 'smooth',
    });
  }

  // REVIEW - cannot offset this with position:fixed header
  // -- reference: https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
  //toggledButton.scrollIntoView();
  //toggledButton.scrollIntoView({ block: 'center' });
};

// Event Listeners
// -- Hide Header on scroll down, show on scroll up
window.addEventListener('scroll', hideHeaderOnScrollDown);

// -- Responsive side nav
navToggle.addEventListener('click', toggleNav);
navLinks.forEach((link) => link.addEventListener('click', closeNav));

// -- Toggle Accordion on tab click
accordionButtons.forEach((button) =>
  button.addEventListener('click', toggleAccordionContent)
);
