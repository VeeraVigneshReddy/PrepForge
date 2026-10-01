// ==========================================
// PREPFORGE DASHBOARD JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // USER NAME
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


    // Display username in welcome message

    if (userNameElement) {

        userNameElement.textContent =
            currentUser;

    }


    // Display username in profile

    if (profileNameElement) {

        profileNameElement.textContent =
            currentUser;

    }


    // Display first letter in profile image

    if (profileInitialElement) {

        profileInitialElement.textContent =
            currentUser
                .charAt(0)
                .toUpperCase();

    }



    // ==========================================
    // LOGOUT
    // ==========================================

    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                localStorage.removeItem(
                    "loggedInUser"
                );

                window.location.href =
                    "login.html";

            }
        );

    }



    // ==========================================
    // DASHBOARD SEARCH
    // ==========================================

    const searchInput =
        document.getElementById("dashboardSearch");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const companyCards =
                    document.querySelectorAll(
                        ".company-card"
                    );


                companyCards.forEach(
                    function (card) {

                        const companyName =
                            card.textContent
                                .toLowerCase();


                        if (
                            companyName.includes(
                                searchText
                            )
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }

});