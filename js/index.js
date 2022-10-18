// ---------- Global Variables ----------
// Query selectors
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const accordionButtons = document.querySelectorAll('.accordion__button');

// Tracks previous scroll position - its value is set by hideHeaderOnScrollDown()
let prevScrollPos = window.pageYOffset;

// ---------- Get copyright date ----------
// Inject current year into copyright footnote on DOM Load
window.addEventListener('DOMContentLoaded', (e) => {
  const currentYear = new Date().getFullYear();
  document.querySelector('.footer__year').innerHTML = `&copy; ${currentYear}`;
});

// ---------- Window resize ----------
window.addEventListener('resize', (e) => {
  // --- responsive accordion height - resize active accordion on window resize ---
  const activeAccordionButton = document.querySelector(
    '.accordion__button.is-active'
  );
  if (activeAccordionButton) resizeActiveAccordion(activeAccordionButton);
});

// ---------- Hide header on scroll down ----------
window.addEventListener('scroll', hideHeaderOnScrollDown);

// Hide Header on scroll down, show on scroll up
function hideHeaderOnScrollDown() {
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
}

// ---------- Responsive side nav ----------
navToggle.addEventListener('click', toggleNav);
navLinks.forEach((link) => link.addEventListener('click', closeNav));

function toggleNav() {
  ['nav-open', 'prevent-scroll'].forEach((htmlClass) =>
    document.body.classList.toggle(htmlClass)
  );
}

function closeNav() {
  ['nav-open', 'prevent-scroll'].forEach((htmlClass) =>
    document.body.classList.remove(htmlClass)
  );
}

/**
 * ---------- Accordion ----------
 * ----- Click Behaviour -----
 * Toggles accordionButton "is-active" class
 * Reveals/hides accordionContent, by programmatically setting maxHeight & padding
    - setting this with JS allows us to animate the revealing of accordionContent
 * Closes any sibling accordion that was previously open 
 */

// Add click event listener to each accordion button
for (accordionButton of accordionButtons) {
  accordionButton.addEventListener('click', handleAccordionButtonClick);
}

// accordionButton click handler
function handleAccordionButtonClick(e) {
  const accordionButton = e.target;
  toggleAccordion(accordionButton); // toggle clicked accordion
  closeAccordionSiblings(accordionButton); // close previously opened accordion

  // Wait for accordion open/close animations to end, then scroll to top of toggled accordion
  const ACCORDION_ANIMATION_DURATION = 200;
  setTimeout(
    () => scrollToElement(accordionButton, 7),
    ACCORDION_ANIMATION_DURATION
  );
}

// Close all accordions except the one that was clicked
function closeAccordionSiblings(clickedButton) {
  [...accordionButtons]
    // Filter out siblings of clickedButton
    .filter((accordionButton) => accordionButton !== clickedButton)
    // Close siblings of clickedButton
    .forEach((siblingButton) => {
      siblingButton.classList.remove('is-active');
      const siblingContent = siblingButton.nextElementSibling;
      closeAccordionContent(siblingContent);
    });
}

// Dynamically set accordion height using the height of its scrollable contents
function setAccordionHeight(accordionContent) {
  accordionContent.style.maxHeight = accordionContent.scrollHeight + 40 + 'px'; // 2rem * 2 = 40px
}

// Programmatically animate accordionContent on accordion open close
function openAccordionContent(accordionContent) {
  setAccordionHeight(accordionContent);
  accordionContent.style.padding = '2rem 3rem';
}

// Programmatically animate accordionContent on accordion close
function closeAccordionContent(accordionContent) {
  accordionContent.style.maxHeight = null;
  accordionContent.style.padding = null;
}

// Open/close a single accordion
function toggleAccordion(accordionButton) {
  // Toggle accordionButton styles
  accordionButton.blur(); // clear focus state
  accordionButton.classList.toggle('is-active');

  const accordionContent = accordionButton.nextElementSibling;

  // Programmatically animate open/close of accordionContent
  if (accordionContent.style.maxHeight) {
    closeAccordionContent(accordionContent);
  } else {
    openAccordionContent(accordionContent);
  }
}

/**
 * ----- Responsive Resize Behaviour -----
 * Resets height of active accordion
 * Called on window resize event to calculate new height for resized accordion
 */
function resizeActiveAccordion(activeAccordionButton) {
  const activeAccordionContent = activeAccordionButton.nextElementSibling;
  setAccordionHeight(activeAccordionContent);
}

// ---------- Utils ----------
// Scroll to top of element & offset from the header (i.e. navigation bar)
// -- REF: https://stackoverflow.com/questions/49820013/javascript-scrollintoview-smooth-scroll-and-offset
function scrollToElement(element, offsetMultiplier = 2) {
  // Calculate amount to offset scroll position from header
  const headerHeight = document.querySelector('header').scrollHeight;
  const offset = 10 * offsetMultiplier; // default: 20
  const offsetFromHeader = headerHeight + offset;

  // Calculate scroll position (inclusive of offsetFromHeader)
  // getBoundingClientRect() gives us access to element size and position in the DOM
  // -- REF: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  const bodyRect = document.body.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const scrollPosition = elementRect.top - bodyRect.top - offsetFromHeader;
  // console.log({ bodyTop: bodyRect.top, elementTop: elementRect.top, offsetFromHeader });

  // Scroll to calculated position
  window.scrollTo({
    top: scrollPosition,
    left: 0,
    behavior: 'smooth',
  });
}
