let groups = JSON.parse(localStorage.getItem("groups")) || [];

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
    // console.log(response.data.createdGroup);

    displayGroups();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// Function to create a group
async function createGroup(event) {
  event.preventDefault();
  var group = document.getElementById("group").value;
  document.getElementById("group").value = "";

  let createGroupName = {
    GroupName: group,
  };

  try {
    const token = JSON.parse(localStorage.getItem("userDetails"));

    const response = await axios.post(
      `http://localhost:3000/api/createGroup`,
      createGroupName,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    groups.push(createGroupName); // Push the created group to the array

    localStorage.setItem("groups", JSON.stringify(groups));

    console.log(response);
    displayGroups();
    alert(response.data.message); // Alert that the group was created successfully
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
}

function displayGroups() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  groups.forEach((group) => {
    const addElement = document.createElement("div");
    addElement.textContent = group.GroupName;
    container.appendChild(addElement);
  });
}

// Function to log out
function logOut(e) {
  e.preventDefault();
  localStorage.removeItem("userDetails");
  window.location.href = "./SignIn.html";
}

// Event listener for creating a group
document.getElementById("groupName").addEventListener("click", createGroup);

// Event listener for logging out
document.getElementById("logout").addEventListener("click", logOut);

// Call the getCreatedGroup function to fetch and display the created group
getCreatedGroup();
