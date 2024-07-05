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


    // PROBABLY NOT NECESSARY !!!! NEEDS TO BE RETESTED !!!!
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function (event) {
        const path = event.state ? event.state.path : null;
        if (!path || path === './index.html') {
            welcomeScreen.classList.remove('shrunk');
            mainContent.classList.remove('expanded');
            iframe.src = '';
        } else {
            welcomeScreen.classList.add('shrunk');
            mainContent.classList.add('expanded');
            iframe.src = path;
        }
    });

    // Initial page load check
    const initialPath = window.location.pathname.split('/').pop();
    if (initialPath && initialPath !== 'index.html' && initialPath !== '') {
        welcomeScreen.classList.add('shrunk');
        mainContent.classList.add('expanded');
        iframe.src = initialPath;
    }
});
