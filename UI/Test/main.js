function submitForm() {
  var subject = document.getElementById("subject").value;
  var topic = document.getElementById("topic").value;
  var content = document.getElementById("content").value;

  var blogData = { subject: subject, topic: topic, content: content };

  localStorage.setItem("blogData", JSON.stringify(blogData));
}

let id = 0;

function submitForm() {
  const subject = document.getElementById("subject").value;
  const topic = document.getElementById("topic").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];

  const item = { subject, topic, content, id: ++id };

  if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      item.image = reader.result;
      storeItem(item);
    };
  } else {
    storeItem(item);
  }
}

function storeItem(item) {
  let items = [];
  if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"));
  }
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems();
}

function displayItems() {
  const table = document.getElementById("table");
  const items = JSON.parse(localStorage.getItem("items")) || [];
  let rows = "";
  items.forEach((item) => {
    rows += `
      <tr>
        <td class="col">${item.subject}</td>
        <td class="col">${item.topic}</td>
        <td class="col">${item.content}</td>
        <td class="col">
          ${
            item.image
              ? `<img src="${item.image}" style="width: 50px; height: 50px;" />`
              : ""
          }
        </td>
        <td class="col">
          <button onclick="editItem(${item.id})">Edit</button>
          <button onclick="removeItem(${item.id})">Remove</button>
        </td>
      </tr>
    `;
  });
  table.innerHTML = `
    <tr>
      <td class="col">Subject</td>
      <td class="col">Topic</td>
      <td class="col">Content</td>
      <td class="col">Image</td>
      <td class="col">Action</td>
    </tr>
    ${rows}
  `;
}

function removeItem(id) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const filteredItems = items.filter((item) => item.id !== id);
  localStorage.setItem("items", JSON.stringify(filteredItems));
  displayItems();
}

function editItem(id) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const item = items.find((item) => item.id === id);
  document.get
}