
    // Navigation hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    function toggleMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
    }
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', function(e) {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Modal elements
    const modalOverlay = document.getElementById('modal-overlay');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');

    // Show modal with message
    function showModal(message) {
      modalMessage.textContent = message;
      modalOverlay.setAttribute('aria-hidden', 'false');
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // disable background scroll
      modalClose.focus();
    }
    // Hide modal
    function hideModal() {
      modalOverlay.setAttribute('aria-hidden', 'true');
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; // enable scroll
    }
    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
      if(e.target === modalOverlay) hideModal();
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        hideModal();
      }
    });

    // Unified custom messages for nav and footer links - easily adjustable here
    const linkMessages = {
      "Home": null, // null means reload the page
      "About": "We are a vibrant and welcoming community dedicated to faith, hope, and love. Our mission is to inspire, support, and serve our members and local area through worship, fellowship, and outreach programs.",
      "Services": "Baptism, Wedding, Conferences.",
      "Events": "feast of trumpetsConference, Kesha, Morning glory, Morning & Afternoon service YouthRally.",
      "Contact": "Phone Numbers:\n0706080995\nEmail: ctc@gmail.com",
      // Footer links (assuming same messages)
      "Facebook": "Follow us on Facebook.",
      "Twitter": "Follow us on Twitter.",
      "Instagram": "Follow us on Instagram.",
      "LinkedIn": "Follow us on LinkedIn.",
    };

    // Handle navigation and footer link clicks
    function linkClickHandler(event) {
      event.preventDefault();
      const label = event.currentTarget.getAttribute('data-label');
      if (label === "Home") {
        location.reload();
        return;
      }
      const message = linkMessages[label] || `You clicked on ${label}`;
      showModal(message);
    }

    // Attach click listeners to nav and footer links using data-label attribute
    const links = document.querySelectorAll('nav a[data-label], footer a[data-label]');
    links.forEach(link => {
      link.addEventListener('click', linkClickHandler);
    });