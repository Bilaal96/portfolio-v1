/* ------------------------------- Google Map ------------------------------- */
/*
function initMap() {
    // Your Location
    const loc = { lat: 42.361145, lng: -71.057083 };

    // Centered map on location
    const map = new google.maps.Map(document.querySelector('.map')
    , {
        zoom: 14,
        center: loc
    });

    // The marker, positioned at location
    const marker = new google.maps.Marker({ position: loc, map: map });
}
*/

/* ------------------ Add Opacity To #navbar When Scrolling ----------------- */
window.addEventListener('scroll', function() {
    if(this.window.scrollY > 90) {
        this.document.querySelector('#navbar').style.opacity = 0.85;
    } else {
        this.document.querySelector('#navbar').style.opacity = 1;
    }
});

/* ---------------------------- Smooth Scrolling ---------------------------- */
/* Will use JQuery - a JavaScript Library 
    - most commonly used for animation such as smooth scrolling */
$('#navigation a, #showcase a, #main-footer a').on('click', function(event) {
    if (this.hash !== '') {
        event.preventDefault();

        const hash = this.hash;

        $('html, body').animate(
            {
                scrollTop: $(hash).offset().top - 100
            },
            800
        );
    }
});