function init() {
  const alreadyRegistered = ~(
    navigator.serviceWorker.controller?.scriptURL.indexOf(
      "mockServiceWorker.js"
    ) || -1
  );
  // if (!alreadyRegistered) {
  require("./RickAndMortyApi.mock");
  // }

  var messageChannel = new MessageChannel();
  if (alreadyRegistered) {
    navigator.serviceWorker.controller?.postMessage("MOCK_DEACTIVATE", [
      messageChannel.port2
    ]);
  }
}

function activate() {
  var messageChannel = new MessageChannel();
  if (
    navigator &&
    navigator.serviceWorker &&
    navigator.serviceWorker.controller
  ) {
    navigator.serviceWorker.controller.postMessage("MOCK_ACTIVATE", [
      messageChannel.port2
    ]);
  }
}

function deactivate() {
  var messageChannel = new MessageChannel();
  if (
    navigator &&
    navigator.serviceWorker &&
    navigator.serviceWorker.controller
  ) {
    navigator.serviceWorker.controller.postMessage("MOCK_DEACTIVATE", [
      messageChannel.port2
    ]);
  }
}

export { init, activate, deactivate };
