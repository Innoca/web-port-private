
// Blog Cards
window.addEventListener("load", () => {
  const container = document.querySelector(".container");
  if (container) {
    const blogs = JSON.parse(localStorage.getItem("blogs"));

    if (blogs) {
      for (let key in blogs) {
        const blogPost = blogs[key];

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

function saveData() {
  // get the form data
  let image = document.querySelector('#blog-img').value;
  let title = document.querySelector('#blog-title').value;
  let desc = document.querySelector('#blog-desc').value;

  // create a blog object
  let blog = {
    image,
    title,
    desc
  };

  // get the blogs from local storage or create an empty array
  let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  // add the blog to the array
  blogs.push(blog);

  // save the blogs to local storage
  localStorage.setItem('blogs', JSON.stringify(blogs));

  // display the blog in the table
  displayBlog(blog);
}

function displayBlog(blog) {
  // get the table
  let table = document.querySelector('#table');

  // create a row
  let row = document.createElement('tr');

  // create the cells
  let subject = document.createElement('td');
  subject.innerHTML = blog.title;

  let content = document.createElement('td');
  content.innerHTML = blog.desc;

  let img = document.createElement('td');
  let image = document.createElement('img');
  image.src = blog.image;
  img.appendChild(image);

  let action = document.createElement('td');

  // create the edit and delete buttons
  let editBtn = document.createElement('button');
  editBtn.innerHTML = 'Edit';
  editBtn.onclick = function() {
    editBlog(this);
  };

  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.onclick = function() {
    deleteBlog(this);
  };

  // add the buttons to the action cell
  action.appendChild(editBtn);
  action.appendChild(deleteBtn);

  // add the cells to the row
  row.appendChild(subject);
  row.appendChild(content);
  row.appendChild(img);
  row.appendChild(action);

  // add the row to the table
  table.appendChild(row);
}

function editBlog(btn) {
  // get the row to be edited
  let row = btn.parentNode.parentNode;

  // get the data from the row
  let image = row.cells[2].querySelector('img').src;
  let title = row.cells[0].innerHTML;
  let desc = row.cells[1].innerHTML;

  // set the form data
  document.querySelector('#blog-img').value = image;
  document.querySelector('#blog-title').value = title;
  document.querySelector('#blog-desc').value = desc;

  // remove the row from the table
  row.remove();
}

function deleteBlog(btn) {
  // get the row to be deleted
  let row = btn.parentNode.parentNode;

  // get the data from the row
  let title = row.cells[0].innerHTML;

  // remove the row from the table and local storage
  row.remove();
  let blogs = JSON.parse(localStorage.getItem('blogs'));
  blogs = blogs.filter(b => b.title !== title);
  localStorage.setItem('blogs', JSON.stringify(blogs));
}

window.addEventListener("load", () => {
  const contentlayer = document.querySelector(".contentlayer");
  if (contentlayer) {
    const blogs = JSON.parse(localStorage.getItem("blogs"));

    if (blogs) {
      for (let key in blogs) {
        const blogPost = blogs[key];

        const card = document.createElement("div");
        card.classList.add("card");
  
        const img = document.createElement("img");
        img.src = blogPost.image;
  
        const title = document.createElement("h3");
        title.textContent = blogPost.title;

        const desc = document.createElement("p");
        desc.textContent = blogPost.desc;
  
  
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
  
        contentlayer.appendChild(card);
      }
    }
  }
});

