const signin_form = document.getElementById("signin-form");
signin_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email");
  const password = document.getElementById("signin-password");
  var data = {
    email: email.value,
    password: password.value,
  };
  sendData(data);
});
async function sendData(data) {
  console.log(data);
  fetch("http://localhost:3002/api/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(async function (res) {
      console.log(res);
      if (res.status === "fail") {
        document.getElementById("signin-error-message").innerHTML = res.error;
      } else {
        document.getElementById("signin-error-message").innerHTML = "";
        document.getElementById("after-signup").innerHTML = "";
        document.getElementById("after-signin").innerHTML =
          "You are signed in now!";
        data = res.data;
        localStorage.setItem("token", data.token);
        var loginButton = document.getElementById("loginButton");
        loginButton.style.display = "none";
        var logoutButton = document.getElementById("logoutButton");
        logoutButton.style.display = "block";
        if (data.userType === "user") {
          document.getElementsByClassName("user_profile")[0].href =
            "profile.html";
        } else if (data.userType === "admin") {
          document.getElementsByClassName("user_profile")[0].href =
            "adminProfile.html";
        }
        showAccount();
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
