document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll("nav a"); // Select anchor elements

    items.forEach((item) => {
        item.addEventListener("mouseenter", shuffleAnimation);
    });
});

function getRandomCharacter() {
    const chars = "697420#@!*)^%$#";
    return chars[Math.floor(Math.random() * chars.length)];
}

function shuffleAnimation(event) {
    const target = event.currentTarget; // Correct access to the target

    if (target.dataset.animating) {
        return; // Prevent multiple animations
    }

    target.dataset.animating = true; // Mark as animating
    const originalText = target.textContent; // Store the original text
    const length = originalText.length; // Get the length of the text

    const maxShuffles = 10;
    const intervalDuration = 300 / maxShuffles;

    let shuffles = 0;
    const animationInterval = setInterval(() => {
        if (shuffles >= maxShuffles) {
            clearInterval(animationInterval);
            target.textContent = originalText; // Restore original text
            delete target.dataset.animating; // Clear animating flag
        } else {
            let shuffledText = "";
            for (let i = 0; i < length; i++) {
                shuffledText += getRandomCharacter(); // Generate random characters
            }
            target.textContent = shuffledText; // Update text to shuffled version
            shuffles++; // Increment shuffle count
        }
    }, intervalDuration);
}