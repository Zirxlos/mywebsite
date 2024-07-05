document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav-link');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const iframe = document.getElementById('content-frame');
    const burger = document.getElementById('burger');

    // Function to handle link click
    function handleLinkClick(event) {
        event.preventDefault();
        const target = event.currentTarget.getAttribute('data-target');

        welcomeScreen.classList.add('shrunk');
        mainContent.classList.add('expanded');
        iframe.src = target;

        // Update URL without reloading the page
        window.history.pushState({ path: target }, '', target);
    }

    // Add event listeners to the navigation links
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    burger.addEventListener('click', function (event) {
        welcomeScreen.classList.remove('shrunk');
        mainContent.classList.remove('expanded');
    })

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function (event) {
        welcomeScreen.classList.remove('shrunk');
        mainContent.classList.remove('expanded');
        window.location.replace('index.html');
    });

    // Initial page load check
    const initialPath = window.location.pathname.split('/').pop();
    if (initialPath && initialPath !== 'index.html' && initialPath !== '') {
        welcomeScreen.classList.add('shrunk');
        mainContent.classList.add('expanded');
        iframe.src = initialPath;
    }
});