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
        console.log('Link clicked:', target);

        // Update URL without reloading the page
        history.pushState({ path: target }, '', target);

        // Call the same logic as the popstate event handler
        updateUI(target);
    }


    function updateUI(path) {
        console.log('updateUI called with path:', path);
        if (!path || path === 'index.html') {
            welcomeScreen.classList.remove('shrunk');
            mainContent.classList.remove('expanded');
            iframe.src = 'welcome.html';
        } else {
            welcomeScreen.classList.add('shrunk');
            mainContent.classList.add('expanded');
            iframe.src = path;
        }
        console.log('UI updated. welcomeScreen classes:', welcomeScreen.classList, 'mainContent classes:', mainContent.classList, 'iframe src:', iframe.src);
    }


    // Add event listeners to the navigation links
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    burger.addEventListener('click', function (event) {
        welcomeScreen.classList.remove('shrunk');
        mainContent.classList.remove('expanded');
        console.log('Burger clicked. welcomeScreen classes:', welcomeScreen.classList, 'mainContent classes:', mainContent.classList, 'iframe src:', iframe.src);
    })

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function (event) {
        const path = event.state ? event.state.path : null;
        console.log('popstate event triggered with path:', path);
        updateUI(path);
    });

    history.replaceState({id: null}, '', './')

    // Initial page load check
    const initialPath = window.location.pathname.split('/').pop();
    console.log('Initial path:', initialPath);
    updateUI(initialPath);
});