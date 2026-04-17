/* validation */

const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

const togglePassword = document.getElementById("togglePassword");

if (form && username && password && errorMessage) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const errors = [];

        if (username.value.trim() === "") {
            errors.push("Username is required");
            username.style.border = "1px solid red";
        } else {
            username.style.border = "1px solid #ddd";
        }

        if (password.value.trim() === "") {
            errors.push("Password is required");
            password.style.border = "1px solid red";
        } else {
            password.style.border = "1px solid #ddd";
        }

        if (errors.length > 0) {
            errorMessage.textContent = errors.join(" | ");
            errorMessage.style.color = "red";
        } else {
            errorMessage.textContent = "Login successful!";
            errorMessage.style.color = "green";
        }
    });
}

if (togglePassword && password) {
    togglePassword.addEventListener("click", function () {
        password.type = password.type === "password" ? "text" : "password";
        togglePassword.setAttribute("data-state", password.type);
    });
}



/* Scroll */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const burger = document.getElementById("burger");
const navbar = document.querySelector(".navbar");

if (burger && navbar) {
  burger.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}


/* Cookie */

const cookieBanner = document.getElementById("cookieBanner");
const acceptBtn = document.getElementById("acceptCookiesBtn");
const declineBtn = document.getElementById("declineCookiesBtn");

if (cookieBanner) {
  cookieBanner.style.display = "flex";
}

if (acceptBtn) {
  acceptBtn.addEventListener("click", () => {
    cookieBanner.style.display = "none";
  });
}
if (declineBtn) {
  declineBtn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
}

