let users = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "register") {
        if (users[message.username]) {
            sendResponse({ success: false, message: "User already exists!" });
        } else {
            users[message.username] = message.password;
            chrome.storage.local.set({ users });
            sendResponse({ success: true, message: "Registration successful!" });
        }
    } else if (message.action === "login") {
        chrome.storage.local.get("users", (data) => {
            const storedUsers = data.users || {};
            if (storedUsers[message.username] && storedUsers[message.username] === message.password) {
                sendResponse({ success: true, message: "Login successful!" });
            } else {
                sendResponse({ success: false, message: "Invalid credentials!" });
            }
        });
    }
    return true;
});
