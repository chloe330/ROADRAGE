function selectFlavor(flavor) {
    const flavors = ['bitter', 'sour', 'salty', 'sweet', 'nutty', 'umami'];

    // Remove active classes from all flavors and lines
    flavors.forEach(f => {
        const element = document.querySelector(`.${f}`);
        const line = document.querySelector(`.line_${f}`);
        
        if (element) {
            element.classList.remove('active');
            element.style.color = 'black'; // Reset to default color
        }
        
        if (line) {
            line.classList.remove('line-active');
            line.style.backgroundColor = 'black'; // Reset line color
        }
    });

    // Add active class to the selected flavor and line
    const selectedElement = document.querySelector(`.${flavor}`);
    const selectedLine = document.querySelector(`.line_${flavor}`);
    
    if (selectedElement) {
        selectedElement.classList.add('active');
        selectedElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--active-color').trim(); // Set active color
    }
    
    if (selectedLine) {
        selectedLine.classList.add('line-active');
        selectedLine.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--active-color').trim(); // Set active line color
    }

    // Redirect to in_2.html after a short delay to allow visual feedback
    setTimeout(() => {
        window.location.href = "in_q2_a.html"; // Change this to your desired page
    }, 300); // Delay in milliseconds (e.g., 300ms)
}