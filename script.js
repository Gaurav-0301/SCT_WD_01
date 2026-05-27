document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksArray = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Custom Alert Elements
    const reservationForm = document.getElementById('reservationForm');
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');
    const closeAlertBtn = document.getElementById('close-alert-btn');

    // 1. Dynamic Appearance Change on Scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightNav();
    });

    // 2. Mobile Drawer Navigation Toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });

    // Close slide-out screen menu when clicking any nav anchor link
    navLinksArray.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Highlight Navigation Links while Scrolling
    function highlightNav() {
        let scrollPosition = window.scrollY + 120; // Accounts for headers offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. Client Interactivity - Intercept Reservation Form Submit
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract values
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Craft the message strings nicely
            alertMessage.innerHTML = `<strong> Hi, ${name}!</strong><br>Your booking request for ${guests} guest(s) on ${date} at ${time} has been registered successfully.`;
            
            // Open the beautiful centered modal
            customAlert.classList.add('show');
            
            // Reset the form inputs cleanly
            reservationForm.reset();

            // Auto-hide the notification alert after 5 seconds automatically
            setTimeout(() => {
                customAlert.classList.remove('show');
            }, 5000);
        });
    }

    // Manual close button listener
    if (closeAlertBtn) {
        closeAlertBtn.addEventListener('click', () => {
            customAlert.classList.remove('show');
        });
    }

    // Close the modal if clicking outside the alert box container
    window.addEventListener('click', (e) => {
        if (e.target === customAlert) {
            customAlert.classList.remove('show');
        }
    });
});