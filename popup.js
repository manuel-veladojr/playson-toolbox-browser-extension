document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("form-title");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitBtn = document.getElementById("submit-btn");
    const toggleForm = document.getElementById("toggle-form");

    let isLoginMode = true;

    toggleForm.addEventListener("click", () => {
        isLoginMode = !isLoginMode;
        title.textContent = isLoginMode ? "Login" : "Register";
        submitBtn.textContent = isLoginMode ? "Login" : "Register";
        toggleForm.innerHTML = isLoginMode 
            ? "Don't have an account? <a href='#'>Register</a>" 
            : "Already have an account? <a href='#'>Login</a>";
    });

    submitBtn.addEventListener("click", () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username && password) {
            if (isLoginMode) {
                chrome.runtime.sendMessage({ action: "login", username, password }, (response) => {
                    alert(response.message);
                });
            } else {
                chrome.runtime.sendMessage({ action: "register", username, password }, (response) => {
                    alert(response.message);
                });
            }
        } else {
            alert("Please fill in all fields.");
        }
    });
});
