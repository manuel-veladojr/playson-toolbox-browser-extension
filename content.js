chrome.runtime.sendMessage({ action: "getAuthStatus" }, (response) => {
    if (response.authenticated) {
        document.body.insertAdjacentHTML(
            "afterbegin", 
            `<div style="position: fixed; top: 10px; right: 10px; padding: 10px; background: green; color: white;">
                Logged in as ${response.username}
            </div>`
        );
    }
});
