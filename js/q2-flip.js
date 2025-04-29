document.addEventListener('DOMContentLoaded', function() {
    const figures = document.querySelectorAll('.flippy figure');
    let currentIndex = 0; // Start with the first card
    let timeout; // Variable to hold the timeout reference

    function flipCard(index) {
        figures.forEach((figure, i) => {
            if (i === index) {
                figure.classList.add('flipped'); // Flip the current card
            } else {
                figure.classList.remove('flipped'); // Ensure other cards are not flipped
            }
        });
    }

    function resetFlip() {
        figures.forEach(figure => {
            figure.classList.remove('flipped'); // Remove flipped class from all cards
        });
    }

    // Initial flip for the first card
    flipCard(currentIndex);

    document.addEventListener('keydown', function(event) {
        // Clear any existing timeout when an arrow key is pressed
        clearTimeout(timeout);

        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % figures.length; // Move to the next card
            flipCard(currentIndex);
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + figures.length) % figures.length; // Move to the previous card
            flipCard(currentIndex);
        }

        // Set a new timeout to reset the flip after 2 seconds of inactivity
        timeout = setTimeout(resetFlip, 2000); // Adjust time as needed (2000 ms = 2 seconds)
    });

    // Set an initial timeout to reset after inactivity when the page loads
    timeout = setTimeout(resetFlip, 2000);
});