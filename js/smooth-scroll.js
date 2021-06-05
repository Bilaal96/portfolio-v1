/* ------------------ Add Opacity To #navbar When Scrolling ----------------- */
window.addEventListener('scroll', function () {
  if (this.window.scrollY > 90) {
    this.document.querySelector('#navbar').style.opacity = 0.85;
  } else {
    this.document.querySelector('#navbar').style.opacity = 1;
  }
});

/* ---------------------------- Smooth Scrolling ---------------------------- */
/** 
 * ! Uses JQuery - a JavaScript Library 
    - most commonly used for animation such as smooth scrolling */
$('#navigation a, #showcase a, #main-footer a').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100,
      },
      800
    );
  }
});
