// ==========================================
// PREPFORGE - COMMON JAVASCRIPT
// Used by ALL pages
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // SIDEBAR
    // ==========================================

    const sidebar =
        document.getElementById("sidebar");

    const menuButton =
        document.getElementById("menuButton");


    if (sidebar && menuButton) {

        // ==========================================
        // OPEN / CLOSE SIDEBAR
        // ==========================================

        menuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                sidebar.classList.toggle(
                    "sidebar-open"
                );


                const isOpen =
                    sidebar.classList.contains(
                        "sidebar-open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        // ==========================================
        // CLOSE SIDEBAR WHEN CLICKING OUTSIDE
        // ==========================================

        document.addEventListener(
            "click",
            function (event) {

                if (
                    sidebar.classList.contains(
                        "sidebar-open"
                    ) &&
                    !sidebar.contains(event.target) &&
                    event.target !== menuButton
                ) {

                    sidebar.classList.remove(
                        "sidebar-open"
                    );


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    // ==========================================
    // LOGGED-IN USER
    // ==========================================

    const userNameElement =
        document.getElementById("userName");

    const profileNameElement =
        document.getElementById("profileName");

    const profileInitialElement =
        document.getElementById("profileInitial");


    const loggedInUser =
        localStorage.getItem("loggedInUser");


    const currentUser =
        loggedInUser || "Student";


    // Dashboard welcome name

    if (userNameElement) {

        userNameElement.textContent =
            currentUser;

    }


    // Navbar profile name

    if (profileNameElement) {

        profileNameElement.textContent =
            currentUser;

    }


    // Profile first letter

    if (profileInitialElement) {

        profileInitialElement.textContent =
            currentUser
                .charAt(0)
                .toUpperCase();

    }


    // ==========================================
    // NAVBAR SHOW / HIDE ON SCROLL
    // ==========================================

    const topNavbar =
        document.querySelector(".top-navbar");


    if (topNavbar) {

        let lastScrollPosition =
            window.scrollY;


        window.addEventListener(
            "scroll",
            function () {

                const currentScrollPosition =
                    window.scrollY;


                // ==================================
                // AT TOP
                // ==================================

                if (
                    currentScrollPosition <= 10
                ) {

                    topNavbar.classList.remove(
                        "navbar-hidden"
                    );

                }


                // ==================================
                // SCROLLING DOWN
                // ==================================

                else if (
                    currentScrollPosition >
                    lastScrollPosition
                ) {

                    topNavbar.classList.remove(
                        "navbar-hidden"
                    );

                }


                // ==================================
                // SCROLLING UP
                // ==================================

                else if (
                    currentScrollPosition <
                    lastScrollPosition
                ) {

                    topNavbar.classList.add(
                        "navbar-hidden"
                    );

                }


                lastScrollPosition =
                    currentScrollPosition;

            }
        );

    }

});