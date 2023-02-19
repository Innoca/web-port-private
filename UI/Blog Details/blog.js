

const content = document.getElementById("content");
const items = JSON.parse(localStorage.getItem("items")) || [];
let rows = "";
items.forEach((item) => {
  rows += `
    <p>${item.content}</p>
  `;
});
content.innerHTML = rows;

document.addEventListener("DOMContentLoaded", function() {
  var count = document.getElementById("count");
  count.innerHTML = localStorage.getItem("likes") || "0 Likes";
});

document.querySelector('.like-btn').addEventListener('click', function() {
  var count = document.getElementById("count");
  var likes = count.innerHTML.split(" ")[0];
  localStorage.setItem("likes", (parseInt(likes) + 1) + " Likes");
  count.innerHTML = localStorage.getItem("likes");
});




// Get the form element
const form = document.querySelector("#commentForm");

// Handle the form submit event
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the value of the textarea
  const commentText = document.querySelector("#commentText").value;

  // Get the existing comments from local storage
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Add the new comment
  comments.push(commentText);

  // Store the updated comments in local storage
  localStorage.setItem("comments", JSON.stringify(comments));

  // Clear the textarea
  document.querySelector("#commentText").value = "";

  // Render the comments
  renderComments();
});

// Render the comments
function renderComments() {
  // Get the comments from local storage
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  // Build the HTML for the comments
  let html = "";
  for (const comment of comments) {
    html += `<div>${comment}</div>`;
  }

  // Set the inner HTML of the comments div
  document.querySelector("#commentsDiv").innerHTML = html;
}

// Render the comments when the page loads
renderComments();
