

  
  function saveData() {
    const blogImg = document.querySelector("#blog-img");
    const blogTitle = document.querySelector("#blog-title");
    const blogDesc = document.querySelector('#blog-desc');
  
    const formData = {
      image: blogImg.value,
      title: blogTitle.value,
      description: blogDesc.value
    };
  
    const blogData = JSON.parse(localStorage.getItem("blogData")) || {};
    const id = Object.keys(blogData).length;
    blogData[id] = formData;
  
    localStorage.setItem("blogData", JSON.stringify(blogData));
  };
  