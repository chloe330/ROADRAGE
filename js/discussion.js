window.onload = function () {
  fetchComments();
};

// Function to fetch comments from the server
function fetchComments() {
  fetch("http://localhost:3001/comments") // Adjust this URL based on your server setup
    .then((response) => response.json())
    .then((data) => {
      const commentsContainer = document.getElementById("commentsContainer");
      commentsContainer.innerHTML = ""; // Clear existing comments

      // Reverse to show newest comment first
      data.reverse().forEach((comment) => {
        displayComment(comment);
      });
    })
    .catch((error) => console.error("Error fetching comments:", error));
}

// Event listener for the comment form submission
document
  .getElementById("commentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const content = document.getElementById("content").value;

    // Send AJAX request to add comment to the database
    addComment(name, content);
  });

// Function to add a comment
function addComment(name, content) {
  fetch("http://localhost:3001/comments", {
    // Adjust this URL based on your server setup
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_name: name,
      review_text: content,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayComment(data);
      document.getElementById("commentForm").reset(); // Reset the form after submission
    })
    .catch((error) => console.error("Error:", error));
}

// Function to display a comment
function displayComment(comment) {
  const commentsContainer = document.getElementById("commentsContainer");
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("testimonial-box");

  function setFlexStyle(element) {
    if (window.innerWidth <= 767) {
      element.style.flex = "0 0 100%"; // Small screens single column
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      element.style.flex = "0 0 100%"; // iPad single column
    } else {
      const commentIndex = commentsContainer.children.length;
      if (commentIndex % 5 < 2) {
        element.style.flex = "0 0 calc(50% - 2rem)"; // Two items per row
      } else {
        element.style.flex = "0 0 calc(33.33% - 3rem)"; // Three items per row
      }
    }
  }
  

  setFlexStyle(commentDiv); // Set initial style

  commentDiv.innerHTML = `
    <div class="box-top">
        <div class="name-user">
            <strong>${comment.customer_name}</strong>
        </div>
    </div>
    <div class="client-comment">
        <p>${comment.review_text}</p>
        <div class="button-container">
            <button class="like-button" onclick="likeComment(${
              comment.id
            }, this)"><i class="fas fa-heart"></i> <span id="like-count-${
    comment.id
  }">${comment.likes || 0}</span></button>
            <button class="reply-button" onclick="showReplyForm(${
              comment.id
            })"><i class="fas fa-reply"></i> Reply</button>
        </div>
        <div class="replies" id="replies-${comment.id}"></div>
        <div class="reply-form" id="reply-form-${
          comment.id
        }" style="display:none;">
            <input type="text" id="reply-name-${
              comment.id
            }" placeholder="Name" required>
            <textarea id="reply-text-${
              comment.id
            }" placeholder="Reply" required></textarea>
            <button onclick="addReply(${comment.id})">Submit</button>
        </div>
    </div>
`;

  // Insert new comment at the top
  commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);

  // Fetch and display replies for the comment
  fetchReplies(comment.id);
}

// Adjust layout on window resize
window.addEventListener("resize", function () {
  const comments = document.querySelectorAll(".testimonial-box");
  comments.forEach((comment) => {
    setFlexStyle(comment);
  });
});

// Function to like a comment
function likeComment(commentId, button) {
  fetch(`http://localhost:3001/comments/${commentId}/like`, {
    // Adjust this URL based on your server setup
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      const likeCountSpan = document.getElementById(`like-count-${commentId}`);
      likeCountSpan.innerText = data.likes; // Update displayed likes count

      // Toggle the 'liked' class on the button
      button.classList.toggle("liked");
    })
    .catch((error) => console.error("Error:", error));
}

// Function to show/hide reply form
function showReplyForm(commentId) {
  const replyForm = document.getElementById(`reply-form-${commentId}`);

  if (replyForm.style.display === "none") {
    replyForm.style.display = "block";
  } else {
    replyForm.style.display = "none";
  }
}

// Function to add a reply to a comment
function addReply(commentId) {
  const replyName = document.querySelector(
    `#reply-form-${commentId} input`
  ).value;
  const replyText = document.querySelector(
    `#reply-form-${commentId} textarea`
  ).value;

  fetch(`http://localhost:3001/comments/${commentId}/replies`, {
    // Adjust this URL based on your server setup
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_name: replyName,
      reply_text: replyText,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayReply(data, commentId);
      // Reset the reply form after submission
      document.querySelector(`#reply-form-${commentId} input`).value = "";
      document.querySelector(`#reply-form-${commentId} textarea`).value = "";
    })
    .catch((error) => console.error("Error:", error));
}

// Function to display a reply under a comment
function displayReply(reply, commentId) {
  const repliesContainer = document.getElementById(`replies-${commentId}`);

  const replyDiv = document.createElement("div");
  replyDiv.classList.add("reply");

  replyDiv.innerHTML = `
        <strong>${reply.customer_name}</strong>: ${reply.reply_text}
        <hr>
    `;

  repliesContainer.appendChild(replyDiv);
}

// Function to fetch replies for a comment
function fetchReplies(commentId) {
  fetch(`http://localhost:3001/comments/${commentId}/replies`) // Adjust this URL based on your server setup
    .then((response) => response.json())
    .then((replies) => {
      replies.forEach((reply) => {
        displayReply(reply, commentId);
      });
    })
    .catch((error) => console.error("Error fetching replies:", error));
}
