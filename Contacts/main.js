document.getElementById("contact-info").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = {
      name: document.getElementById("user_name").value,
      email: document.getElementById("user_email").value,
      subject: document.getElementById("subject_user").value,
      message: document.getElementById("user_message").value
    };
    let storedData = JSON.parse(localStorage.getItem("formData")) || [];
    storedData = Object.values(storedData);
    storedData.push(formData);
    localStorage.setItem("formData", JSON.stringify(storedData));
  });
  