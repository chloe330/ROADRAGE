function toggleMenu() {
  const navMenu = document.getElementById("myLinks");
  const overlay = document.getElementById("overlay");

  // Toggle the 'active' class on the navMenu
  navMenu.classList.toggle("active");

  // Show or hide the overlay based on menu state
  if (navMenu.classList.contains("active")) {
      overlay.style.display = "block"; // Show overlay
  } else {
      overlay.style.display = "none"; // Hide overlay
  }
}

// Close menu when clicking outside of it
document.addEventListener("click", function(event) {
  const navMenu = document.getElementById("myLinks");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.getElementById("overlay");

  // Check if the click was outside the navMenu and hamburger
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      navMenu.classList.remove("active"); // Close the menu
      overlay.style.display = "none"; // Hide overlay
  }
});

// Close menu when clicking on the overlay itself
overlay.addEventListener("click", function() {
  const navMenu = document.getElementById("myLinks");
  navMenu.classList.remove("active"); // Close the menu
  overlay.style.display = "none"; // Hide overlay
});
