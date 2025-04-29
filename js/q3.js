
// Get all aroma buttons
const aromaLinks = document.querySelectorAll('.Aroma a');

// Add click event listener to each link
aromaLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent default action initially
        event.preventDefault();

        // Remove 'active' class from all buttons
        aromaLinks.forEach(btn => btn.querySelector('span').classList.remove('active'));

        // Add 'active' class to the clicked button
        this.querySelector('span').classList.add('active');

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = this.href; // Redirect to the link's URL
        }, 300); // Delay of 300 milliseconds (0.3 seconds)
    });
});
