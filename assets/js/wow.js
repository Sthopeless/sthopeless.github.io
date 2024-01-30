// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to submit the form and save state to localStorage
    function submitForm() {
        const characters = document.querySelectorAll('thead th:not(:first-child)');
        const characterData = [];

        characters.forEach((character, characterIndex) => {
            const characterName = character.textContent;
            const completedRaids = [];

            const raids = document.querySelectorAll(`tbody tr td:nth-child(${characterIndex + 2}) input`);
            raids.forEach((raid, raidIndex) => {
                if (raid.checked) {
                    completedRaids.push(raid.getAttribute('data-raid'));
                }
            });

            characterData.push({ character: characterName, completedRaids: completedRaids });
        });

        // Save the completion data to localStorage
        localStorage.setItem('characterCompletionData', JSON.stringify(characterData));

        // Log the completion data or send it to a server/database
        console.log(characterData);
        alert('Raid completion status submitted!');
    }

    // Function to load the state from localStorage
    function loadState() {
        const savedData = localStorage.getItem('characterCompletionData');

        if (savedData) {
            const characterData = JSON.parse(savedData);

            characterData.forEach((character) => {
                const characterName = character.character;

                character.completedRaids.forEach((completedRaid) => {
                    const checkbox = document.querySelector(
                        `input[data-raid="${completedRaid}"][name="${characterName}-character"]`
                    );

                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            });
        }
    }

    // Attach the submitForm function to the button click event
    const submitButton = document.querySelector('button');
    if (submitButton) {
        submitButton.addEventListener('click', submitForm);
    }

    // Load state on page load
    loadState();
});
