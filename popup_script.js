/**
 * App namespace.
 * @type {object}
 */
var youtubeOnRepeatApp = {};

/**
 * Click Handler.
 */
youtubeOnRepeatApp.clickHandler = function () {
    this.sendMessageToBackground(
        { action: 'toggle' }, this.callback.bind(this));
};

/**
 * Callback method.
 * @param {object} response
 */
youtubeOnRepeatApp.callback = function (response) {
    var status = document.getElementById('all_status');
    status.innerText = response.status;
};

/**
 * Sends message to the background.
 * @param {object} request
 * @param {function} callback
 */
youtubeOnRepeatApp.sendMessageToBackground = function (request, callback) {
    chrome.runtime.sendMessage(request, callback);
};

/**
 * Init method.
 */
youtubeOnRepeatApp.init = function () {
    console.log("I was Loaded");
    var button = document.getElementById('all');
    button.addEventListener('click', this.clickHandler.bind(this));
    this.sendMessageToBackground({ action: 'getStatus' }, this.callback.bind(this));
}

// Init.
youtubeOnRepeatApp.init();