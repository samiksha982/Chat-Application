const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageImp");
const messageContainer = document.querySelector(".container");

//Audio
var audio = new Audio("iphone.mp3");

//function which will append
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

// asking for name and let the server know
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

//if a new user joins
socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

// if server sense a message, recieve it
socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

//if a user leaves, append the info to container
socket.on("left", (name) => {
  append(`${data.name} left the chat`, "right");
});

//form gets submitted, send to server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});
