(new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (!mutation.addedNodes) return;
    for (let node of mutation.addedNodes) {
      if (node.id == "neptune_modal" || (node.className && node.className.includes("ReactModal__Overlay--after-open"))) {
          let token = document.getElementById("neptune-api-token");
          if (!token) {
             token = document.getElementsByClassName("configure-modal__input")[0];
          }
          if (token.value == "") {
              chrome.storage.sync.get(["token"], (result) => {
                  if (result.token) {
                      token.value = result.token;
                      token.dispatchEvent(new Event("change"));
                  } else {
                      token.placeholder = "Set the token in the extension settings to see it here.";
                  }
              });
          }
      }
    }
  }
})).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});
