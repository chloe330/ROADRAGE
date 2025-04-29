document.addEventListener('DOMContentLoaded', function() {
    const bottomFrame = document.querySelector('.bottom-frame');

    // Function to show the text elements
    function showTextElements() {
        const america = document.querySelector('.America');
        const africa = document.querySelector('.Africa');
        const asia = document.querySelector('.Asia');
        const v313_186 = document.querySelector('.v313_186');
        const v313_187 = document.querySelector('.v313_187');
        const v313_188 = document.querySelector('.v313_188');
        const v313_190 = document.querySelector('.v313_190');

        // Check if the elements exist before trying to modify them
        if (america) {
            america.classList.remove('hidden');
            america.classList.add('fadeIn');
        }
        if (africa) {
            africa.classList.remove('hidden');
            africa.classList.add('fadeIn');
        }
        if (asia) {
            asia.classList.remove('hidden');
            asia.classList.add('fadeIn');
        }
        if (v313_186) {
            v313_186.classList.remove('hidden');
            v313_186.classList.add('fadeIn');
        }
        if (v313_187) {
            v313_187.classList.remove('hidden');
            v313_187.classList.add('fadeIn');
        }
        if (v313_188) {
            v313_188.classList.remove('hidden');
            v313_188.classList.add('fadeIn');
        }
        if (v313_190) {
            v313_190.classList.remove('hidden');
            v313_190.classList.add('fadeIn');
        }
    }

    // Check if bottomFrame exists before adding the listener
    if (bottomFrame) {
        bottomFrame.addEventListener('animationend', function() {
            // Add a delay to ensure the animation is fully visible
            setTimeout(showTextElements, 500); // Adjust the delay as needed
        });
    } else {
        console.error('.bottom-frame element not found');
    }
});