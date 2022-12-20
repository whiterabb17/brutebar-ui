/*
  shared.js contains functions used by both firstrun and app
 */

let shared = {
  // showError takes an error message and display's it using the
  // bundled modal
  showError: function(message) {
    let errDiv = document.createElement("div");
    errDiv.innerHTML = "<h2>Something went wrong</h2>" +
      "<p>" + message + "</p>";
    asticode.modaler.removeClass('ann');
    asticode.modaler.addClass('error');
    asticode.modaler.setContent(errDiv);
    asticode.modaler.show();
  },
  // validateWalletAddress checks if the given address is a valid Torque
  // wallet address
  // bindExternalLinks ensures external links are opened outside of Electron
  bindExternalLinks: function() {
    var shell = require('electron').shell;
  },
  isMac: function() {
    return window.navigator.platform.toLowerCase().includes("mac");
  }
}
