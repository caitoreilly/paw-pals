const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-log").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in. Please try again.");
    }
  }
};

//***add code here to include sign-up button that directs the user back to the homepage!

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);