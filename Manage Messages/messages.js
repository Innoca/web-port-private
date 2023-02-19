let storedData = JSON.parse(localStorage.getItem("formData")) || [];
storedData.forEach(function(data) {
  const card = document.createElement("div");
  card.classList.add("form-card");

  const name = document.createElement("p");
  name.innerHTML = `Name: ${data.name}`;
  card.appendChild(name);

  const email = document.createElement("p");
  email.innerHTML = `Email: ${data.email}`;
  card.appendChild(email);

  const subject = document.createElement("p");
  subject.innerHTML = `Subject: ${data.subject}`;
  card.appendChild(subject);

  const message = document.createElement("p");
  message.innerHTML = `Message: ${data.message}`;
  card.appendChild(message);

  document.getElementById("form-cards").appendChild(card);
});

  