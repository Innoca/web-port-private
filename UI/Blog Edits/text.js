// Blog Cards
window.addEventListener("load", () => {
    const container = document.querySelector(".container");
    if (container) {
      const blogData = JSON.parse(localStorage.getItem("blogData"));
  
      if (blogData) {
        for (let key in blogData) {
          const blogPost = blogData[key];
  
          const card = document.createElement("div");
          card.classList.add("card");
    
          const img = document.createElement("img");
          img.src = blogPost.image;
    
          const title = document.createElement("h3");
          title.textContent = blogPost.title;
    
    
          card.appendChild(img);
          card.appendChild(title);
    
          container.appendChild(card);
        }
      }
    }
  });