const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  localStorage.removeItem("token");
  var profileButton = document.getElementById("user_profile");
  profileButton.style.display = "none";
  var loginButton = document.getElementById("loginButton");
  loginButton.style.display="block";
  var logoutButton = document.getElementById("logoutButton");
  logoutButton.style.display="none";
});
