const socket = io();

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new URLSearchParams(new FormData(form));

  const res = await fetch("/signup", {
    method: "POST",
    body: data
  });
  const text = await res.text();
  alert(text);
});

function sendMsg() {
  const input = document.getElementById("msg");
  const msg = input.value;
  if(msg.trim() === "") return;
  socket.emit("chat message", msg);
  input.value = "";
}

socket.on("chat message", function(msg){
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messages").appendChild(li);
});
