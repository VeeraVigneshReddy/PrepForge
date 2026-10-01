/* =========================================================
   PREPFORGE - MOCK TESTS
   Mock Test Selection & Company Information
   ========================================================= */


/* =========================================================
   INFOSYS DATA
   ========================================================= */

const companyData = {

    "Infosys": {

        patternType: "2026 Reported Infosys IRT-Style Pattern",

        description:
            "This pattern is based on recent 2026 placement-pattern reporting. " +
            "The exact assessment can vary by hiring drive, role and test platform.",

        totalTime: "Approximately 100 minutes",

        negativeMarking: "No negative marking reported",

        sections: [

            {
                name: "Aptitude",
                questions: "10",
                time: "35 minutes",
                difficulty: "Medium",
                topics:
                    "Percentages, Profit & Loss, Time & Work, Time-Speed-Distance, " +
                    "Probability, Permutation & Combination, Number System, " +
                    "Data Interpretation"
            },

            {
                name: "Reasoning",
                questions: "15",
                time: "25 minutes",
                difficulty: "Medium",
                topics:
                    "Puzzles, Arrangements, Syllogisms, Coding-Decoding, " +
                    "Blood Relations, Data Sufficiency, Logical Reasoning"
            },

            {
                name: "Verbal",
                questions: "20",
                time: "20 minutes",
                difficulty: "Easy-Medium",
                topics:
                    "Reading Comprehension, Sentence Correction, Grammar, " +
                    "Para Jumbles, Vocabulary, Synonyms & Antonyms"
            },

            {
                name: "Pseudocode",
                questions: "5",
                time: "10 minutes",
                difficulty: "Medium",
                topics:
                    "Loops, Conditions, Arrays, Operators, Functions, " +
                    "Output Prediction and Basic Programming Logic"
            },

            {
                name: "Puzzle",
                questions: "4",
                time: "10 minutes",
                difficulty: "Medium-Hard",
                topics:
                    "Logical Puzzles, Pattern Recognition, Mathematical Puzzles " +
                    "and Analytical Problems"
            },

            {
                name: "Coding",
                questions: "3",
                time: "180 minutes",
                difficulty: "Easy / Medium / Hard",
                topics:
                    "Arrays, Strings, Searching, Sorting, Greedy, " +
                    "Dynamic Programming and Problem Solving",
                note:
                    "HackWithInfy coding assessment route. This is separate " +
                    "from the standard IRT-style assessment."
            },

            {
                name: "SQL",
                questions: "Practice Set",
                time: "15 minutes",
                difficulty: "Medium",
                topics:
                    "SELECT, WHERE, GROUP BY, HAVING, JOIN, Subqueries, " +
                    "Aggregate Functions and Window Functions",
                note:
                    "Technical practice section in PREPFORGE; not claimed " +
                    "as a fixed section of every Infosys assessment."
            },

            {
                name: "DBMS",
                questions: "Practice Set",
                time: "15 minutes",
                difficulty: "Medium",
                topics:
                    "Keys, Normalization, Transactions, ACID, Indexing, " +
                    "Joins and Database Fundamentals",
                note:
                    "Technical practice section in PREPFORGE."
            },

            {
                name: "OOP",
                questions: "Practice Set",
                time: "15 minutes",
                difficulty: "Medium",
                topics:
                    "Classes, Objects, Inheritance, Polymorphism, " +
                    "Encapsulation, Abstraction and Constructors",
                note:
                    "Technical practice section in PREPFORGE."
            }

        ]

    }

};


/* =========================================================
   GET HTML ELEMENTS
   ========================================================= */

const companyTestBtn =
    document.getElementById("companyTestBtn");

const normalTestBtn =
    document.getElementById("normalTestBtn");

const companySelection =
    document.getElementById("companySelection");

const companySections =
    document.getElementById("companySections");

const normalSelection =
    document.getElementById("normalSelection");

const normalSections =
    document.getElementById("normalSections");

const selectedCompanyName =
    document.getElementById("selectedCompanyName");

const selectedDifficulty =
    document.getElementById("selectedDifficulty");


/* =========================================================
   COMPANY INFORMATION AREA
   ========================================================= */

function showCompanyInformation(companyName) {

    const data = companyData[companyName];

    if (!data) {
        return;
    }

    /*
       We create the information box dynamically
       so we don't need to add another large HTML block.
    */

    let existingInfo =
        document.getElementById("companyInformation");

    if (existingInfo) {
        existingInfo.remove();
    }


    const informationBox =
        document.createElement("div");

    informationBox.id =
        "companyInformation";

    informationBox.className =
        "company-information";


    informationBox.innerHTML = `

        <div class="company-info-header">

            <span class="info-label">
                COMPANY PATTERN
            </span>

            <h3>
                ${companyName}
            </h3>

            <p>
                ${data.description}
            </p>

        </div>


        <div class="company-info-summary">

            <div>
                <span>Pattern</span>
                <strong>
                    ${data.patternType}
                </strong>
            </div>

            <div>
                <span>Approx. Test Time</span>
                <strong>
                    ${data.totalTime}
                </strong>
            </div>

            <div>
                <span>Negative Marking</span>
                <strong>
                    ${data.negativeMarking}
                </strong>
            </div>

        </div>


        <div class="pattern-heading">

            <h3>
                Section-wise Pattern
            </h3>

            <p>
                PREPFORGE will use these details to build
                separate practice tests for each section.
            </p>

        </div>


        <div class="pattern-table">

            <div class="pattern-row pattern-header">

                <span>Section</span>
                <span>Questions</span>
                <span>Time</span>
                <span>Difficulty</span>

            </div>


            ${data.sections.map(section => `

                <div class="pattern-row">

                    <span>
                        ${section.name}
                    </span>

                    <span>
                        ${section.questions}
                    </span>

                    <span>
                        ${section.time}
                    </span>

                    <span>
                        ${section.difficulty}
                    </span>

                </div>

            `).join("")}

        </div>


        <div class="source-note">

            <strong>Important:</strong>

            Infosys assessment patterns can change by
            hiring drive and role. This information is used
            as a preparation reference and should not be
            treated as a guaranteed current test pattern.

        </div>

    `;


    /*
       Put the information before the section cards.
    */

    companySections.insertBefore(
        informationBox,
        companySections.querySelector(".section-heading")
    );

}


/* =========================================================
   COMPANY TEST BUTTON
   ========================================================= */

companyTestBtn.addEventListener("click", function () {

    companySelection.style.display = "block";

    normalSelection.style.display = "none";
    normalSections.style.display = "none";

    companySelection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================================
   NORMAL TEST BUTTON
   ========================================================= */

normalTestBtn.addEventListener("click", function () {

    normalSelection.style.display = "block";

    companySelection.style.display = "none";
    companySections.style.display = "none";

    normalSelection.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================================
   COMPANY SELECTION
   ========================================================= */

const companyOptions =
    document.querySelectorAll(".company-option");


companyOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        const company =
            button.dataset.company;


        /*
           Currently Infosys has complete data.
           Other companies can be added one by one.
        */

        if (!companyData[company]) {

            alert(
                company +
                " is added to the company list. " +
                "Its verified pattern and question bank " +
                "will be added next."
            );

            return;
        }


        selectedCompanyName.textContent =
            company;


        companySections.style.display =
            "block";


        showCompanyInformation(company);


        companySections.scrollIntoView({
            behavior: "smooth"
        });


        /*
           Save selection so the test page can
           use it later.
        */

        localStorage.setItem(
            "prepforgeMode",
            "company"
        );

        localStorage.setItem(
            "prepforgeCompany",
            company
        );

    });

});


/* =========================================================
   NORMAL DIFFICULTY SELECTION
   ========================================================= */

const difficultyCards =
    document.querySelectorAll(".difficulty-card");


difficultyCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const difficulty =
            card.dataset.difficulty;


        selectedDifficulty.textContent =
            difficulty;


        normalSections.style.display =
            "block";


        normalSections.scrollIntoView({
            behavior: "smooth"
        });


        /*
           Save normal-test selection.
        */

        localStorage.setItem(
            "prepforgeMode",
            "normal"
        );

        localStorage.setItem(
            "prepforgeDifficulty",
            difficulty
        );

    });

});


/* =========================================================
   COMPANY SECTION SELECTION
   ========================================================= */

const companySectionButtons =
    document.querySelectorAll(".start-section-btn");


companySectionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const section =
            button.dataset.section;

        const company =
            localStorage.getItem(
                "prepforgeCompany"
            );


        if (!company) {

            alert(
                "Please select a company first."
            );

            return;
        }


        const data =
            companyData[company];


        const sectionData =
            data.sections.find(
                item => item.name === section
            );


        if (!sectionData) {

            alert(
                "Information for this section " +
                "is not available yet."
            );

            return;
        }


        /*
           Store the selected test.
        */

        localStorage.setItem(
            "prepforgeSection",
            section
        );

        localStorage.setItem(
            "prepforgeTime",
            sectionData.time
        );


        /*
           For now we display the selected
           test information.

           Later this button will open the
           actual question/test page.
        */

        alert(
            company +
            " - " +
            section +
            " test selected.\n\n" +

            "Questions: " +
            sectionData.questions +
            "\n" +

            "Time: " +
            sectionData.time +
            "\n" +

            "Difficulty: " +
            sectionData.difficulty
        );

    });

});


/* =========================================================
   NORMAL SECTION SELECTION
   ========================================================= */

const normalSectionButtons =
    document.querySelectorAll(".normal-section-btn");


normalSectionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const section =
            button.dataset.section;

        const difficulty =
            localStorage.getItem(
                "prepforgeDifficulty"
            );


        if (!difficulty) {

            alert(
                "Please select a difficulty first."
            );

            return;
        }


        localStorage.setItem(
            "prepforgeSection",
            section
        );


        alert(
            "Normal " +
            section +
            " Mock Test selected.\n\n" +

            "Difficulty: " +
            difficulty +
            "\n\n" +

            "The question set will contain " +
            "important placement questions " +
            "matching this difficulty."
        );

    });

});


/* =========================================================
   PAGE LOAD
   ========================================================= */

console.log(
    "PREPFORGE Mock Test system loaded successfully."
);