// let groups = JSON.parse(localStorage.getItem("groups")) || [];
let groups = [];
const storedGroups = localStorage.getItem("groups");
if (storedGroups) {
  try {
    groups = JSON.parse(storedGroups);
  } catch (error) {
    console.error("Error parsing stored groups:", error);
  }
}

//
//
// Function to fetch the created group from the database
async function getCreatedGroup() {
  try {
    const token = JSON.parse(localStorage.getItem("userDetails"));

    const response = await axios.get(
      `http://localhost:3000/api/getCreatedGroup`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    console.log(response.data);
    console.log(response.data.groups);
    localStorage.setItem("groups", JSON.stringify(response.data.groups));
    displayGroups();
  } catch (error) {
    console.log(error);
  }
}
//
//
//
//
//
//
//
//
// Function to create a group
async function createGroup(event) {
  event.preventDefault();
  let group = document.getElementById("group").value;
  document.getElementById("group").value = "";

  let groupName = {
    GroupName: group,
  };

  try {
    const token = JSON.parse(localStorage.getItem("userDetails"));

    const response = await axios.post(
      `http://localhost:3000/api/createGroup`,
      groupName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    groups.push({ GroupName: group, GroupId: response.data.id });

    localStorage.setItem("groups", JSON.stringify(groups));

    console.log(response);
    // console.log(response.data.id);
    alert(response.data.message); // Alert that the group was created successfully
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
}
//
//
//
//
//
//
//
//
function displayGroups() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  groups.forEach((group) => {
    const addElement = document.createElement("div");
    addElement.id = "addGroup";

    const groupNameElement = document.createElement("span");
    groupNameElement.textContent = group.GroupName;
    addElement.appendChild(groupNameElement);

    const groupIdElement = document.createElement("span");
    groupIdElement.textContent = `              Id: ${group.GroupId}`;
    addElement.appendChild(groupIdElement);

    const openButton = document.createElement("button");
    openButton.textContent = "Open";
    openButton.addEventListener("click", () =>
      openGroup(group.GroupId, group.GroupName)
    );

    addElement.appendChild(openButton);
    container.appendChild(addElement);
  });
}
//
//
//
//
//
//
//
//
function openGroup(groupId, groupName) {
  console.log("Opened group ID:", groupId);

  let replaceGroup = document.getElementById("create");
  replaceGroup.style.display = "none";

  const chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML = "";

  const header = document.createElement("h2");
  header.textContent = groupName;

  const addUserButton = document.createElement("button");
  addUserButton.textContent = "Add User";
  addUserButton.addEventListener("click", () => showAddUserForm());

  const bodyWindow = document.createElement("div");
  bodyWindow.id = "chatBox";
  bodyWindow.innerHTML = `<h3>This is a chat box to chat</h3>`;

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.id = "groupChat";
  inputField.placeholder = "Type your message";

  const sendButton = document.createElement("button");
  sendButton.textContent = "Send";
  sendButton.addEventListener("click", () => sendMessageToGroup(groupId));

  const backButton = document.createElement("button");
  backButton.textContent = "⬅";
  backButton.addEventListener("click", () => goBack());

  // bodyWindow.appendChild(header);
  chatWindow.appendChild(addUserButton);
  chatWindow.appendChild(header);
  chatWindow.appendChild(bodyWindow);
  chatWindow.appendChild(inputField);
  chatWindow.appendChild(sendButton);
  chatWindow.appendChild(backButton);

  function showAddUserForm() {
    chatWindow.removeChild(addUserButton);

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "userInput";
    inputField.placeholder = "Enter User EmailId";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => addUserToGroup(groupId));

    chatWindow.appendChild(inputField);
    chatWindow.appendChild(submitButton);
  }

  async function addUserToGroup(groupId) {
    const emailId = document.getElementById("userInput").value;
    document.getElementById("userInput").value = "";

    const user = {
      emailId: emailId,
    };

    try {
      const token = JSON.parse(localStorage.getItem("userDetails"));

      const response = await axios.post(
        `http://localhost:3000/api/addUserToGroup/${groupId}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  }

  // Function to display messages in the chatbox
  async function displayMessages() {
    try {
      const token = JSON.parse(localStorage.getItem("userDetails"));

      const response = await axios.get(
        `http://localhost:3000/api/getMessage/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      console.log(response.data.messages);
      const messages = response.data.messages;

      const chatBox = document.getElementById("chatBox");

      messages.forEach((message) => {
        const messageElement = document.createElement("p");
        messageElement.textContent = message.content;
        chatBox.appendChild(messageElement);
      });
    } catch (error) {
      console.log(error);
    }
  }
  displayMessages();
}
//
//
//
//
//
//
//
//
function goBack() {
  const createSection = document.getElementById("create");
  createSection.style.display = "block";

  const chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML = "";
}
//
//
//
//
//
//
//
//
async function sendMessageToGroup(groupId) {
  let input = document.getElementById("groupChat").value;
  document.getElementById("groupChat").value = "";

  const message = {
    content: input,
  };

  try {
    const token = JSON.parse(localStorage.getItem("userDetails"));

    const response = await axios.post(
      `http://localhost:3000/api/createMessage/${groupId}`,
      message,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    console.log(response.data.message.content);
  } catch (error) {
    console.log(error);
    // console.log(error.response.data.error);
    alert(error.response.data.error);
  }
}
//
//
//
//
//
//
//
//
// Function to log out
function logOut(e) {
  e.preventDefault();
  localStorage.removeItem("userDetails");
  window.location.href = "./SignIn.html";
}

// Event listener for creating a group
document.getElementById("groupName").addEventListener("click", createGroup);

//Event listener for sending messages
// document.getElementById("submit").addEventListener("click", sendMessage);

// Event listener for logging out
document.getElementById("logout").addEventListener("click", logOut);

// Call the getCreatedGroup function to fetch and display the created group
getCreatedGroup();
