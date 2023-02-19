window.addEventListener("load", () => {
  const container = document.querySelector(".container");
  const blogData = JSON.parse(localStorage.getItem("blogData"));

  if (blogData) {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = blogData.image;

      const title = document.createElement("h3");
      title.textContent = blogData.title;

      const desc = document.createElement("p");
      desc.textContent = blogData.description;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);

      container.appendChild(card);
  }
});



