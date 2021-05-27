const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const accordionButtons = document.querySelectorAll('.accordion__button');

// Event handlers
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
};

// Event Listeners
// -- Mobile responsive nav
navToggle.addEventListener('click', toggleNav);
navLinks.forEach((link) => link.addEventListener('click', closeNav));

// -- Toggle Accordion on tab click
accordionButtons.forEach((button) =>
  button.addEventListener('click', toggleAccordionContent)
);
