const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  var token = localStorage.getItem("token");
  var data = {
    token: token,
  };
  sendLogoutRequest(data);
});
async function sendLogoutRequest(data) {
  console.log(data);
  fetch("http://localhost:3002/api/users/logout", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(async function (res) {
      console.log(res);
      if (res.status != "fail") {
        localStorage.removeItem("token");
        var profileButton = document.getElementById("user_profile");
        profileButton.style.display = "none";
        var loginButton = document.getElementById("loginButton");
        loginButton.style.display = "block";
        var logoutButton = document.getElementById("logoutButton");
        logoutButton.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
